export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  encryptionKey: process.env.ENCRYPTION_KEY ?? "",
  allowedOrigins: process.env.ALLOWED_ORIGINS ?? "http://localhost:3000,http://localhost:5173",
};

/**
 * Validates required environment variables in production
 * Call this on server startup
 */
export function validateEnv(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (ENV.isProduction) {
    // Required in production
    if (!ENV.encryptionKey || ENV.encryptionKey.length < 32) {
      errors.push("ENCRYPTION_KEY must be at least 32 characters in production");
    }
    if (!ENV.cookieSecret || ENV.cookieSecret.length < 32) {
      errors.push("JWT_SECRET must be at least 32 characters in production");
    }
    if (!ENV.databaseUrl) {
      errors.push("DATABASE_URL is required in production");
    }
  }

  if (errors.length > 0) {
    console.error("[ENV] Configuration errors:");
    errors.forEach(err => console.error(`  - ${err}`));
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Generate a secure random key for ENCRYPTION_KEY
 */
export function generateSecureKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let key = '';
  for (let i = 0; i < 64; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}
