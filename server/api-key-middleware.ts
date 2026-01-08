import { Request, Response, NextFunction } from 'express';

// Simple in-memory API key store (in production, use a database)
const validApiKeys = new Map<string, {
  key: string;
  name: string;
  createdAt: Date;
  rateLimit: number;
  requestsToday: number;
}>();

// Initialize with a demo key
validApiKeys.set('demo_key_elgasmi_2024', {
  key: 'demo_key_elgasmi_2024',
  name: 'Demo Key',
  createdAt: new Date(),
  rateLimit: 1000,
  requestsToday: 0,
});

export function generateApiKey(name: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `key_${timestamp}_${random}`;
}

export function registerApiKey(name: string, rateLimit: number = 1000): string {
  const key = generateApiKey(name);
  validApiKeys.set(key, {
    key,
    name,
    createdAt: new Date(),
    rateLimit,
    requestsToday: 0,
  });
  return key;
}

export function validateApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Missing API key',
      code: 'MISSING_API_KEY',
      timestamp: new Date().toISOString(),
    });
  }

  const keyData = validApiKeys.get(apiKey);

  if (!keyData) {
    return res.status(401).json({
      success: false,
      error: 'Invalid API key',
      code: 'INVALID_API_KEY',
      timestamp: new Date().toISOString(),
    });
  }

  // Check rate limit
  if (keyData.requestsToday >= keyData.rateLimit) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded',
      code: 'RATE_LIMIT_EXCEEDED',
      timestamp: new Date().toISOString(),
      retryAfter: 3600,
    });
  }

  // Increment request count
  keyData.requestsToday++;

  // Reset daily count at midnight
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const timeUntilReset = tomorrow.getTime() - now.getTime();
  setTimeout(() => {
    keyData.requestsToday = 0;
  }, timeUntilReset);

  // Attach API key info to request
  (req as any).apiKey = keyData;

  next();
}

export function getApiKeyStats(apiKey: string) {
  return validApiKeys.get(apiKey);
}

export function getAllApiKeys() {
  return Array.from(validApiKeys.values());
}
