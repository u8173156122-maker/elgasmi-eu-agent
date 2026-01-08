import { Request, Response, NextFunction } from 'express';

/**
 * Security middleware collection for the application
 * Implements multiple layers of protection following OWASP guidelines
 */

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Global rate limiter for all requests
 * Prevents DDoS and brute force attacks
 */
export function globalRateLimiter(options: {
  windowMs?: number;
  maxRequests?: number;
} = {}) {
  const windowMs = options.windowMs || 60 * 1000; // 1 minute default
  const maxRequests = options.maxRequests || 100; // 100 requests per minute

  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let clientData = rateLimitStore.get(clientIp);

    if (!clientData || now > clientData.resetTime) {
      clientData = { count: 1, resetTime: now + windowMs };
      rateLimitStore.set(clientIp, clientData);
    } else {
      clientData.count++;
    }

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - clientData.count));
    res.setHeader('X-RateLimit-Reset', clientData.resetTime);

    if (clientData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests',
        code: 'RATE_LIMIT_EXCEEDED',
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
        timestamp: new Date().toISOString(),
      });
    }

    next();
  };
}

/**
 * Security headers middleware (Helmet-like functionality)
 * Sets various HTTP headers to protect against common attacks
 */
export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS filter in browsers
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Control referrer information
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy (previously Feature-Policy)
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https:; " +
    "frame-ancestors 'none';"
  );

  // Strict Transport Security (HTTPS enforcement)
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');

  next();
}

/**
 * CORS middleware with secure defaults
 */
export function corsMiddleware(options: {
  allowedOrigins?: string[];
  allowCredentials?: boolean;
} = {}) {
  const allowedOrigins = options.allowedOrigins || ['http://localhost:3000', 'http://localhost:5173'];
  const allowCredentials = options.allowCredentials ?? true;

  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    // Check if origin is allowed
    if (origin && (allowedOrigins.includes(origin) || allowedOrigins.includes('*'))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

    if (allowCredentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    next();
  };
}

/**
 * Input sanitization middleware
 * Cleans request body/query/params to prevent XSS and injection attacks
 */
export function sanitizeInput(req: Request, res: Response, next: NextFunction) {
  const sanitize = (obj: Record<string, unknown>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        // Remove potential XSS vectors
        result[key] = value
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '')
          .replace(/data:/gi, 'data-blocked:')
          .trim();
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = sanitize(value as Record<string, unknown>);
      } else if (Array.isArray(value)) {
        result[key] = value.map(item =>
          typeof item === 'string'
            ? item.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim()
            : item
        );
      } else {
        result[key] = value;
      }
    }

    return result;
  };

  if (req.body && typeof req.body === 'object') {
    req.body = sanitize(req.body as Record<string, unknown>);
  }

  if (req.query && typeof req.query === 'object') {
    req.query = sanitize(req.query as Record<string, unknown>) as typeof req.query;
  }

  next();
}

/**
 * Request logging middleware for security auditing
 */
export function securityLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    };

    // Log suspicious activity
    if (res.statusCode >= 400) {
      console.warn('[SECURITY]', JSON.stringify(logData));
    }
  });

  next();
}

/**
 * SQL Injection prevention validator
 * Checks for common SQL injection patterns
 */
export function sqlInjectionGuard(req: Request, res: Response, next: NextFunction) {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE)\b)/i,
    /(--|#|\/\*)/,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
    /(\bUNION\b\s+\bSELECT\b)/i,
  ];

  const checkValue = (value: unknown): boolean => {
    if (typeof value === 'string') {
      return sqlPatterns.some(pattern => pattern.test(value));
    }
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => checkValue(v));
    }
    return false;
  };

  const hasSqlInjection =
    checkValue(req.body) ||
    checkValue(req.query) ||
    checkValue(req.params);

  if (hasSqlInjection) {
    console.warn('[SECURITY] Potential SQL injection attempt detected:', {
      ip: req.ip,
      path: req.path,
      timestamp: new Date().toISOString(),
    });

    return res.status(400).json({
      success: false,
      error: 'Invalid input detected',
      code: 'INVALID_INPUT',
      timestamp: new Date().toISOString(),
    });
  }

  next();
}

/**
 * API key hash verification (for enhanced security)
 */
export function hashApiKey(key: string): string {
  // Simple hash function (in production, use crypto.createHash)
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Clean up expired rate limit entries periodically
 */
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());
  for (const [ip, data] of entries) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60 * 1000); // Clean up every minute
