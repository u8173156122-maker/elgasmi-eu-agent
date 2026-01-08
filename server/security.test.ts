import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import {
  globalRateLimiter,
  securityHeaders,
  corsMiddleware,
  sanitizeInput,
  sqlInjectionGuard,
  hashApiKey,
} from "./security";

// Mock Express request/response
function createMockRequest(overrides: Partial<Request> = {}): Request {
  return {
    ip: "127.0.0.1",
    socket: { remoteAddress: "127.0.0.1" },
    method: "GET",
    path: "/test",
    headers: {},
    body: {},
    query: {},
    params: {},
    ...overrides,
  } as Request;
}

function createMockResponse(): Response {
  const res = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    setHeader: vi.fn((key: string, value: string) => {
      res.headers[key] = value;
      return res;
    }),
    removeHeader: vi.fn(),
    status: vi.fn((code: number) => {
      res.statusCode = code;
      return res;
    }),
    json: vi.fn(() => res),
    end: vi.fn(() => res),
    on: vi.fn(),
  } as unknown as Response;
  return res;
}

describe("Security Middleware", () => {
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
  });

  describe("securityHeaders", () => {
    it("should set X-Frame-Options header", () => {
      const req = createMockRequest();
      const res = createMockResponse();

      securityHeaders(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith("X-Frame-Options", "DENY");
      expect(next).toHaveBeenCalled();
    });

    it("should set X-Content-Type-Options header", () => {
      const req = createMockRequest();
      const res = createMockResponse();

      securityHeaders(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith("X-Content-Type-Options", "nosniff");
    });

    it("should set X-XSS-Protection header", () => {
      const req = createMockRequest();
      const res = createMockResponse();

      securityHeaders(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith("X-XSS-Protection", "1; mode=block");
    });

    it("should set Referrer-Policy header", () => {
      const req = createMockRequest();
      const res = createMockResponse();

      securityHeaders(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith("Referrer-Policy", "strict-origin-when-cross-origin");
    });

    it("should set Content-Security-Policy header", () => {
      const req = createMockRequest();
      const res = createMockResponse();

      securityHeaders(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Content-Security-Policy",
        expect.stringContaining("default-src 'self'")
      );
    });

    it("should remove X-Powered-By header", () => {
      const req = createMockRequest();
      const res = createMockResponse();

      securityHeaders(req, res, next);

      expect(res.removeHeader).toHaveBeenCalledWith("X-Powered-By");
    });
  });

  describe("corsMiddleware", () => {
    it("should allow requests from allowed origins", () => {
      const req = createMockRequest({
        headers: { origin: "http://localhost:3000" },
      });
      const res = createMockResponse();
      const middleware = corsMiddleware({ allowedOrigins: ["http://localhost:3000"] });

      middleware(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith("Access-Control-Allow-Origin", "http://localhost:3000");
      expect(next).toHaveBeenCalled();
    });

    it("should handle OPTIONS preflight requests", () => {
      const req = createMockRequest({
        method: "OPTIONS",
        headers: { origin: "http://localhost:3000" },
      });
      const res = createMockResponse();
      const middleware = corsMiddleware({ allowedOrigins: ["http://localhost:3000"] });

      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });

    it("should set CORS headers correctly", () => {
      const req = createMockRequest({
        headers: { origin: "http://localhost:3000" },
      });
      const res = createMockResponse();
      const middleware = corsMiddleware({ allowedOrigins: ["http://localhost:3000"] });

      middleware(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      expect(res.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-API-Key, X-Requested-With"
      );
    });

    it("should set credentials header when enabled", () => {
      const req = createMockRequest({
        headers: { origin: "http://localhost:3000" },
      });
      const res = createMockResponse();
      const middleware = corsMiddleware({
        allowedOrigins: ["http://localhost:3000"],
        allowCredentials: true,
      });

      middleware(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith("Access-Control-Allow-Credentials", "true");
    });
  });

  describe("globalRateLimiter", () => {
    it("should allow requests within rate limit", () => {
      const req = createMockRequest({ ip: "192.168.1.100" });
      const res = createMockResponse();
      const middleware = globalRateLimiter({ maxRequests: 10 });

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.setHeader).toHaveBeenCalledWith("X-RateLimit-Limit", 10);
    });

    it("should set rate limit headers", () => {
      const req = createMockRequest({ ip: "192.168.1.101" });
      const res = createMockResponse();
      const middleware = globalRateLimiter({ maxRequests: 100 });

      middleware(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith("X-RateLimit-Limit", 100);
      expect(res.setHeader).toHaveBeenCalledWith("X-RateLimit-Remaining", expect.any(Number));
      expect(res.setHeader).toHaveBeenCalledWith("X-RateLimit-Reset", expect.any(Number));
    });

    it("should block requests exceeding rate limit", () => {
      const req = createMockRequest({ ip: "192.168.1.102" });
      const res = createMockResponse();
      const middleware = globalRateLimiter({ maxRequests: 1, windowMs: 60000 });

      // First request should pass
      middleware(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);

      // Reset next mock
      next = vi.fn();

      // Second request should be blocked
      middleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(429);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: "Too many requests",
          code: "RATE_LIMIT_EXCEEDED",
        })
      );
    });
  });

  describe("sanitizeInput", () => {
    it("should sanitize script tags from body", () => {
      const req = createMockRequest({
        body: { message: '<script>alert("xss")</script>Hello' },
      });
      const res = createMockResponse();

      sanitizeInput(req, res, next);

      expect(req.body.message).not.toContain("<script>");
      expect(req.body.message).toContain("Hello");
      expect(next).toHaveBeenCalled();
    });

    it("should sanitize javascript: protocol", () => {
      const req = createMockRequest({
        body: { link: "javascript:alert('xss')" },
      });
      const res = createMockResponse();

      sanitizeInput(req, res, next);

      expect(req.body.link).not.toContain("javascript:");
      expect(next).toHaveBeenCalled();
    });

    it("should sanitize event handlers", () => {
      const req = createMockRequest({
        body: { html: '<div onclick="alert(1)">Click</div>' },
      });
      const res = createMockResponse();

      sanitizeInput(req, res, next);

      expect(req.body.html).not.toContain("onclick=");
      expect(next).toHaveBeenCalled();
    });

    it("should handle nested objects", () => {
      const req = createMockRequest({
        body: {
          user: {
            name: '<script>evil</script>John',
            profile: {
              bio: 'javascript:hack()',
            },
          },
        },
      });
      const res = createMockResponse();

      sanitizeInput(req, res, next);

      expect(req.body.user.name).not.toContain("<script>");
      expect(req.body.user.profile.bio).not.toContain("javascript:");
      expect(next).toHaveBeenCalled();
    });

    it("should handle arrays", () => {
      const req = createMockRequest({
        body: { items: ['<script>bad</script>', 'normal', '<script>evil</script>'] },
      });
      const res = createMockResponse();

      sanitizeInput(req, res, next);

      expect(req.body.items[0]).not.toContain("<script>");
      expect(req.body.items[1]).toBe("normal");
      expect(req.body.items[2]).not.toContain("<script>");
      expect(next).toHaveBeenCalled();
    });

    it("should trim whitespace", () => {
      const req = createMockRequest({
        body: { name: "  John Doe  " },
      });
      const res = createMockResponse();

      sanitizeInput(req, res, next);

      expect(req.body.name).toBe("John Doe");
      expect(next).toHaveBeenCalled();
    });
  });

  describe("sqlInjectionGuard", () => {
    it("should allow normal input", () => {
      const req = createMockRequest({
        body: { name: "John Doe", email: "john@example.com" },
      });
      const res = createMockResponse();

      sqlInjectionGuard(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should block SELECT statements", () => {
      const req = createMockRequest({
        body: { query: "SELECT * FROM users" },
      });
      const res = createMockResponse();

      sqlInjectionGuard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: "INVALID_INPUT",
        })
      );
    });

    it("should block DROP statements", () => {
      const req = createMockRequest({
        body: { query: "DROP TABLE users" },
      });
      const res = createMockResponse();

      sqlInjectionGuard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should block UNION SELECT attacks", () => {
      const req = createMockRequest({
        query: { id: "1 UNION SELECT * FROM passwords" },
      });
      const res = createMockResponse();

      sqlInjectionGuard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should block OR 1=1 attacks", () => {
      const req = createMockRequest({
        body: { username: "admin' OR 1=1" },
      });
      const res = createMockResponse();

      sqlInjectionGuard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should block comment injection", () => {
      const req = createMockRequest({
        body: { input: "value -- DROP TABLE" },
      });
      const res = createMockResponse();

      sqlInjectionGuard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should check params for SQL injection", () => {
      const req = createMockRequest({
        params: { id: "1; DELETE FROM users" },
      });
      const res = createMockResponse();

      sqlInjectionGuard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("hashApiKey", () => {
    it("should return consistent hash for same input", () => {
      const key = "test_api_key_123";
      const hash1 = hashApiKey(key);
      const hash2 = hashApiKey(key);

      expect(hash1).toBe(hash2);
    });

    it("should return different hashes for different inputs", () => {
      const hash1 = hashApiKey("key1");
      const hash2 = hashApiKey("key2");

      expect(hash1).not.toBe(hash2);
    });

    it("should return a string", () => {
      const hash = hashApiKey("test_key");

      expect(typeof hash).toBe("string");
    });

    it("should handle empty string", () => {
      const hash = hashApiKey("");

      expect(typeof hash).toBe("string");
    });
  });
});

describe("Security Integration", () => {
  it("should process multiple middlewares in order", () => {
    const req = createMockRequest({
      headers: { origin: "http://localhost:3000" },
      body: { message: "Hello World" },
    });
    const res = createMockResponse();
    const next1 = vi.fn();
    const next2 = vi.fn();
    const next3 = vi.fn();

    securityHeaders(req, res, next1);
    corsMiddleware({ allowedOrigins: ["http://localhost:3000"] })(req, res, next2);
    sanitizeInput(req, res, next3);

    expect(next1).toHaveBeenCalled();
    expect(next2).toHaveBeenCalled();
    expect(next3).toHaveBeenCalled();
  });

  it("should protect against combined XSS and SQL injection", () => {
    // Test case where SQL injection is mixed with normal text (not inside script tags)
    const req = createMockRequest({
      body: {
        name: 'John SELECT * FROM users',
        comment: '<script>alert(1)</script>normal text',
      },
    });
    const res = createMockResponse();
    const next1 = vi.fn();
    const next2 = vi.fn();

    // First sanitize XSS (removes script tags)
    sanitizeInput(req, res, next1);
    expect(next1).toHaveBeenCalled();
    expect(req.body.comment).not.toContain('<script>');

    // Then check for SQL injection (SQL keywords in name field)
    sqlInjectionGuard(req, res, next2);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
