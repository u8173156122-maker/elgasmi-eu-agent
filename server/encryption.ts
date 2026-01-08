import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

/**
 * AES-256-GCM Encryption Utility
 * Provides secure encryption for sensitive database fields
 *
 * Security Features:
 * - AES-256-GCM (Authenticated Encryption)
 * - Random IV for each encryption
 * - Key derivation using scrypt
 * - Authentication tag to prevent tampering
 */

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 32;
const KEY_LENGTH = 32;

// Get encryption key from environment or generate a secure default for development
function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ENCRYPTION_KEY environment variable is required in production');
    }
    // Development fallback - DO NOT use in production
    console.warn('[SECURITY] Using default encryption key - set ENCRYPTION_KEY in production');
    return 'dev_encryption_key_32_chars_long!';
  }
  return key;
}

/**
 * Derives a 256-bit key from the passphrase using scrypt
 */
function deriveKey(passphrase: string, salt: Buffer): Buffer {
  return scryptSync(passphrase, salt, KEY_LENGTH);
}

/**
 * Encrypts sensitive data using AES-256-GCM
 *
 * @param plaintext - The data to encrypt
 * @returns Encrypted string in format: salt:iv:authTag:ciphertext (base64)
 */
export function encrypt(plaintext: string): string {
  if (!plaintext) return plaintext;

  const passphrase = getEncryptionKey();
  const salt = randomBytes(SALT_LENGTH);
  const key = deriveKey(passphrase, salt);
  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const authTag = cipher.getAuthTag();

  // Combine salt + iv + authTag + ciphertext
  return [
    salt.toString('base64'),
    iv.toString('base64'),
    authTag.toString('base64'),
    encrypted
  ].join(':');
}

/**
 * Decrypts data encrypted with encrypt()
 *
 * @param encryptedData - The encrypted string from encrypt()
 * @returns Decrypted plaintext
 */
export function decrypt(encryptedData: string): string {
  if (!encryptedData || !encryptedData.includes(':')) return encryptedData;

  try {
    const passphrase = getEncryptionKey();
    const [saltB64, ivB64, authTagB64, ciphertext] = encryptedData.split(':');

    if (!saltB64 || !ivB64 || !authTagB64 || !ciphertext) {
      // Not encrypted or invalid format, return as-is
      return encryptedData;
    }

    const salt = Buffer.from(saltB64, 'base64');
    const iv = Buffer.from(ivB64, 'base64');
    const authTag = Buffer.from(authTagB64, 'base64');
    const key = deriveKey(passphrase, salt);

    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    // If decryption fails, data might not be encrypted
    console.warn('[ENCRYPTION] Decryption failed, returning original data');
    return encryptedData;
  }
}

/**
 * Encrypts an object's specified fields
 */
export function encryptFields<T extends Record<string, unknown>>(
  data: T,
  fields: (keyof T)[]
): T {
  const encrypted = { ...data };
  for (const field of fields) {
    const value = encrypted[field];
    if (typeof value === 'string' && value) {
      (encrypted[field] as string) = encrypt(value);
    }
  }
  return encrypted;
}

/**
 * Decrypts an object's specified fields
 */
export function decryptFields<T extends Record<string, unknown>>(
  data: T,
  fields: (keyof T)[]
): T {
  const decrypted = { ...data };
  for (const field of fields) {
    const value = decrypted[field];
    if (typeof value === 'string' && value) {
      (decrypted[field] as string) = decrypt(value);
    }
  }
  return decrypted;
}

/**
 * Hash a value for comparison (one-way)
 * Used for API keys and other secrets that don't need to be decrypted
 */
export function hashValue(value: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(value, salt, 64);
  return `${salt.toString('base64')}:${hash.toString('base64')}`;
}

/**
 * Verify a value against its hash
 */
export function verifyHash(value: string, hashedValue: string): boolean {
  try {
    const [saltB64, hashB64] = hashedValue.split(':');
    if (!saltB64 || !hashB64) return false;

    const salt = Buffer.from(saltB64, 'base64');
    const expectedHash = Buffer.from(hashB64, 'base64');
    const actualHash = scryptSync(value, salt, 64);

    // Timing-safe comparison
    if (expectedHash.length !== actualHash.length) return false;
    let result = 0;
    for (let i = 0; i < expectedHash.length; i++) {
      result |= expectedHash[i] ^ actualHash[i];
    }
    return result === 0;
  } catch {
    return false;
  }
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return randomBytes(length).toString('base64url');
}

/**
 * Mask sensitive data for logging (shows first and last 2 chars)
 */
export function maskSensitive(value: string): string {
  if (!value || value.length < 8) return '****';
  return `${value.slice(0, 2)}${'*'.repeat(Math.min(value.length - 4, 20))}${value.slice(-2)}`;
}
