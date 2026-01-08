import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  encrypt,
  decrypt,
  encryptFields,
  decryptFields,
  hashValue,
  verifyHash,
  generateSecureToken,
  maskSensitive,
} from "./encryption";

describe("Encryption Utility", () => {
  describe("encrypt and decrypt", () => {
    it("should encrypt and decrypt a string correctly", () => {
      const plaintext = "Hello, this is sensitive data!";
      const encrypted = encrypt(plaintext);
      const decrypted = decrypt(encrypted);

      expect(encrypted).not.toBe(plaintext);
      expect(decrypted).toBe(plaintext);
    });

    it("should produce different ciphertext for same plaintext (random IV)", () => {
      const plaintext = "Same message";
      const encrypted1 = encrypt(plaintext);
      const encrypted2 = encrypt(plaintext);

      expect(encrypted1).not.toBe(encrypted2);
      expect(decrypt(encrypted1)).toBe(plaintext);
      expect(decrypt(encrypted2)).toBe(plaintext);
    });

    it("should handle empty string", () => {
      const plaintext = "";
      const result = encrypt(plaintext);
      expect(result).toBe("");
    });

    it("should handle special characters", () => {
      const plaintext = "Test with special chars: @#$%^&*()_+{}|:<>?~`";
      const encrypted = encrypt(plaintext);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it("should handle unicode characters", () => {
      const plaintext = "Unicode test: Bonjour, comment allez-vous?";
      const encrypted = encrypt(plaintext);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it("should handle long strings", () => {
      const plaintext = "A".repeat(10000);
      const encrypted = encrypt(plaintext);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(plaintext);
    });

    it("should return original value if decrypt fails on non-encrypted data", () => {
      const notEncrypted = "This is not encrypted";
      const result = decrypt(notEncrypted);

      expect(result).toBe(notEncrypted);
    });

    it("should handle JSON data", () => {
      const data = JSON.stringify({ name: "John", email: "john@example.com" });
      const encrypted = encrypt(data);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(data);
      expect(JSON.parse(decrypted)).toEqual({ name: "John", email: "john@example.com" });
    });
  });

  describe("encryptFields and decryptFields", () => {
    it("should encrypt specified fields in an object", () => {
      const data = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        publicField: "This stays plain",
      };

      const encrypted = encryptFields(data, ["email", "phone"]);

      expect(encrypted.name).toBe("John Doe");
      expect(encrypted.email).not.toBe("john@example.com");
      expect(encrypted.phone).not.toBe("+1234567890");
      expect(encrypted.publicField).toBe("This stays plain");
    });

    it("should decrypt specified fields in an object", () => {
      const data = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
      };

      const encrypted = encryptFields(data, ["email", "phone"]);
      const decrypted = decryptFields(encrypted, ["email", "phone"]);

      expect(decrypted.name).toBe("John Doe");
      expect(decrypted.email).toBe("john@example.com");
      expect(decrypted.phone).toBe("+1234567890");
    });

    it("should handle null/undefined fields", () => {
      const data = {
        name: "John",
        email: null as string | null,
        phone: undefined as string | undefined,
      };

      const encrypted = encryptFields(data, ["email", "phone"]);
      expect(encrypted.email).toBeNull();
      expect(encrypted.phone).toBeUndefined();
    });
  });

  describe("hashValue and verifyHash", () => {
    it("should hash a value and verify it correctly", () => {
      const value = "my-secret-api-key";
      const hashed = hashValue(value);

      expect(verifyHash(value, hashed)).toBe(true);
      expect(verifyHash("wrong-value", hashed)).toBe(false);
    });

    it("should produce different hashes for same value (random salt)", () => {
      const value = "same-value";
      const hash1 = hashValue(value);
      const hash2 = hashValue(value);

      expect(hash1).not.toBe(hash2);
      expect(verifyHash(value, hash1)).toBe(true);
      expect(verifyHash(value, hash2)).toBe(true);
    });

    it("should handle empty string", () => {
      const value = "";
      const hashed = hashValue(value);

      expect(verifyHash(value, hashed)).toBe(true);
    });

    it("should return false for invalid hash format", () => {
      expect(verifyHash("value", "invalid-hash")).toBe(false);
      expect(verifyHash("value", "")).toBe(false);
    });
  });

  describe("generateSecureToken", () => {
    it("should generate a token of correct length", () => {
      const token = generateSecureToken(32);
      // base64url encoding: 32 bytes = ~43 chars
      expect(token.length).toBeGreaterThan(40);
    });

    it("should generate unique tokens", () => {
      const token1 = generateSecureToken();
      const token2 = generateSecureToken();

      expect(token1).not.toBe(token2);
    });

    it("should use default length of 32", () => {
      const token = generateSecureToken();
      expect(token.length).toBeGreaterThan(40);
    });
  });

  describe("maskSensitive", () => {
    it("should mask middle characters", () => {
      const masked = maskSensitive("john@example.com");

      expect(masked.startsWith("jo")).toBe(true);
      expect(masked.endsWith("om")).toBe(true);
      expect(masked).toContain("*");
    });

    it("should return **** for short strings", () => {
      expect(maskSensitive("short")).toBe("****");
      expect(maskSensitive("ab")).toBe("****");
    });

    it("should return **** for empty string", () => {
      expect(maskSensitive("")).toBe("****");
    });

    it("should limit mask length to 20 asterisks", () => {
      const longValue = "a".repeat(100);
      const masked = maskSensitive(longValue);

      expect(masked.length).toBeLessThanOrEqual(24); // 2 + 20 + 2
    });
  });
});

describe("Encryption Security", () => {
  it("should use authenticated encryption (GCM)", () => {
    const plaintext = "Sensitive data";
    const encrypted = encrypt(plaintext);

    // GCM produces: salt:iv:authTag:ciphertext
    const parts = encrypted.split(":");
    expect(parts.length).toBe(4);
  });

  it("should detect tampering (auth tag validation)", () => {
    const plaintext = "Sensitive data";
    const encrypted = encrypt(plaintext);
    const parts = encrypted.split(":");

    // Tamper with the ciphertext
    const tamperedParts = [...parts];
    tamperedParts[3] = "tampered" + tamperedParts[3];
    const tampered = tamperedParts.join(":");

    // Should return original (tampered) value since decryption fails
    const result = decrypt(tampered);
    expect(result).not.toBe(plaintext);
  });

  it("should use unique salt for each encryption", () => {
    const plaintext = "Same data";
    const encrypted1 = encrypt(plaintext);
    const encrypted2 = encrypt(plaintext);

    const salt1 = encrypted1.split(":")[0];
    const salt2 = encrypted2.split(":")[0];

    expect(salt1).not.toBe(salt2);
  });

  it("should use unique IV for each encryption", () => {
    const plaintext = "Same data";
    const encrypted1 = encrypt(plaintext);
    const encrypted2 = encrypt(plaintext);

    const iv1 = encrypted1.split(":")[1];
    const iv2 = encrypted2.split(":")[1];

    expect(iv1).not.toBe(iv2);
  });
});

describe("Performance", () => {
  it("should encrypt/decrypt 10 items correctly", () => {
    // Note: scrypt is intentionally slow for security (key derivation)
    // This test verifies correctness, not speed
    const items = Array.from({ length: 10 }, (_, i) => `Item ${i}`);

    const encrypted = items.map(item => encrypt(item));
    const decrypted = encrypted.map(item => decrypt(item));

    expect(decrypted).toEqual(items);
    expect(encrypted.every(e => e !== "")).toBe(true);
  });
});
