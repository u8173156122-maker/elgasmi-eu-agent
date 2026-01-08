import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";
import * as notification from "./_core/notification";

// Mock database functions
vi.mock("./db", () => ({
  createContactMessage: vi.fn(),
}));

// Mock notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(),
}));

function createMockContext(): TrpcContext {
  return {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("should successfully submit a contact message", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const mockCreateContactMessage = vi.mocked(db.createContactMessage);
    const mockNotifyOwner = vi.mocked(notification.notifyOwner);

    mockCreateContactMessage.mockResolvedValue(undefined as any);
    mockNotifyOwner.mockResolvedValue(true);

    const contactData = {
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "+33612345678",
      company: "Test Company",
      subject: "Demande d'information",
      message: "Je souhaite en savoir plus sur vos services d'architecture microservices.",
    };

    const result = await caller.contact.submit(contactData);

    expect(result).toEqual({ success: true });
    expect(mockCreateContactMessage).toHaveBeenCalledWith({
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      company: contactData.company,
      subject: contactData.subject,
      message: contactData.message,
      status: "new",
    });
    expect(mockNotifyOwner).toHaveBeenCalledWith({
      title: `Nouveau message de contact: ${contactData.subject}`,
      content: expect.stringContaining(contactData.name),
    });
  });

  it("should handle submission without optional fields", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const mockCreateContactMessage = vi.mocked(db.createContactMessage);
    const mockNotifyOwner = vi.mocked(notification.notifyOwner);

    mockCreateContactMessage.mockResolvedValue(undefined as any);
    mockNotifyOwner.mockResolvedValue(true);

    const contactData = {
      name: "Marie Martin",
      email: "marie.martin@example.com",
      subject: "Question technique",
      message: "Pouvez-vous me donner plus d'informations sur Kafka?",
    };

    const result = await caller.contact.submit(contactData);

    expect(result).toEqual({ success: true });
    expect(mockCreateContactMessage).toHaveBeenCalledWith({
      name: contactData.name,
      email: contactData.email,
      phone: undefined,
      company: undefined,
      subject: contactData.subject,
      message: contactData.message,
      status: "new",
    });
  });

  it("should reject invalid email", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const contactData = {
      name: "Test User",
      email: "invalid-email",
      subject: "Test",
      message: "This should fail validation",
    };

    await expect(caller.contact.submit(contactData)).rejects.toThrow();
  });

  it("should reject message that is too short", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const contactData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test",
      message: "Too short",
    };

    await expect(caller.contact.submit(contactData)).rejects.toThrow();
  });
});
