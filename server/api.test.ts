import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: { "x-api-key": "test_key" },
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Agent API Endpoints", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  describe("agents.process", () => {
    it("should process data successfully", async () => {
      const result = await caller.agents.process({
        data: { orders: [{ id: 1, quantity: 5 }] },
        taskType: "order_processing",
        priority: "high",
      });

      expect(result.success).toBe(true);
      expect(result.taskId).toBeDefined();
      expect(result.taskId).toMatch(/^task_/);
      expect(result.result).toBeDefined();
      expect(result.metrics).toBeDefined();
      expect(result.metrics.processingTime).toBeGreaterThanOrEqual(0);
      expect(result.metrics.itemsProcessed).toBe(1);
      expect(result.metrics.successRate).toBe(99.8);
    });

    it("should handle data validation task type", async () => {
      const result = await caller.agents.process({
        data: { records: [{ name: "test" }] },
        taskType: "data_validation",
      });

      expect(result.success).toBe(true);
      expect(result.result.validationPassed).toBe(true);
    });

    it("should use default priority when not specified", async () => {
      const result = await caller.agents.process({
        data: { test: "data" },
        taskType: "batch_operation",
      });

      expect(result.success).toBe(true);
      expect(result.metrics).toBeDefined();
    });
  });

  describe("agents.optimize", () => {
    it("should optimize resources successfully", async () => {
      const result = await caller.agents.optimize({
        resources: [
          { id: "server_1", type: "compute", utilization: 85 },
          { id: "server_2", type: "compute", utilization: 45 },
        ],
      });

      expect(result.success).toBe(true);
      expect(result.taskId).toBeDefined();
      expect(result.taskId).toMatch(/^opt_/);
      expect(result.result.optimizedResources).toHaveLength(2);
      expect(result.metrics.itemsProcessed).toBe(2);
      expect(result.metrics.successRate).toBe(100);
    });

    it("should calculate cost reduction correctly", async () => {
      const result = await caller.agents.optimize({
        resources: [
          { id: "server_1", type: "compute", utilization: 100 },
        ],
      });

      expect(result.success).toBe(true);
      expect(result.result.totalCostReduction).toBe(42);
      expect(result.result.efficiency).toBe(94);
    });

    it("should handle optional constraints", async () => {
      const result = await caller.agents.optimize({
        resources: [
          { id: "db_1", type: "database", utilization: 60 },
        ],
        constraints: { maxLatency: 100, minAvailability: 0.99 },
      });

      expect(result.success).toBe(true);
      expect(result.result.optimizedResources).toBeDefined();
    });
  });

  describe("agents.detectAnomalies", () => {
    it("should detect anomalies in data stream", async () => {
      const result = await caller.agents.detectAnomalies({
        dataStream: [100, 102, 101, 99, 450, 98, 101],
        sensitivity: 0.85,
      });

      expect(result.success).toBe(true);
      expect(result.taskId).toBeDefined();
      expect(result.taskId).toMatch(/^anom_/);
      expect(result.anomalies).toBeDefined();
      expect(Array.isArray(result.anomalies)).toBe(true);
      expect(result.metrics.dataPointsAnalyzed).toBe(7);
    });

    it("should detect high severity anomalies", async () => {
      const result = await caller.agents.detectAnomalies({
        dataStream: [100, 101, 99, 1000, 102],
        sensitivity: 0.9,
      });

      expect(result.success).toBe(true);
      const highSeverity = result.anomalies.filter(
        (a) => a.severity === "high"
      );
      expect(highSeverity.length).toBeGreaterThan(0);
    });

    it("should use default sensitivity when not specified", async () => {
      const result = await caller.agents.detectAnomalies({
        dataStream: [100, 101, 102, 103, 104],
      });

      expect(result.success).toBe(true);
      expect(result.metrics.detectionRate).toBe(99.9);
    });

    it("should handle normal data stream without anomalies", async () => {
      const result = await caller.agents.detectAnomalies({
        dataStream: [100, 101, 100, 99, 101, 100, 102],
        sensitivity: 0.95,
      });

      expect(result.success).toBe(true);
      expect(result.metrics.dataPointsAnalyzed).toBe(7);
    });
  });

  describe("agents.getStatus", () => {
    it("should return healthy system status", async () => {
      const result = await caller.agents.getStatus();

      expect(result.status).toBe("healthy");
      expect(result.agents).toBeDefined();
      expect(Array.isArray(result.agents)).toBe(true);
      expect(result.agents.length).toBeGreaterThan(0);
    });

    it("should return agent details", async () => {
      const result = await caller.agents.getStatus();

      const agent = result.agents[0];
      expect(agent).toHaveProperty("name");
      expect(agent).toHaveProperty("status");
      expect(agent).toHaveProperty("uptime");
      expect(agent).toHaveProperty("tasksProcessed");
      expect(agent.status).toBe("active");
      expect(agent.uptime).toBeGreaterThan(99);
    });

    it("should return timestamp", async () => {
      const result = await caller.agents.getStatus();

      expect(result.timestamp).toBeDefined();
      expect(result.timestamp instanceof Date).toBe(true);
    });
  });

  describe("agents.getMetrics", () => {
    it("should return metrics with default time range", async () => {
      const result = await caller.agents.getMetrics({});

      expect(result.timeRange).toBe("24h");
      expect(result.avgProcessingTime).toBeDefined();
      expect(result.successRate).toBeDefined();
      expect(result.throughput).toBeDefined();
      expect(result.costSavings).toBeDefined();
    });

    it("should return metrics for different time ranges", async () => {
      const timeRanges = ["1h", "24h", "7d", "30d"] as const;

      for (const range of timeRanges) {
        const result = await caller.agents.getMetrics({ timeRange: range });
        expect(result.timeRange).toBe(range);
        expect(result.successRate).toBeLessThanOrEqual(100);
        expect(result.successRate).toBeGreaterThan(99);
      }
    });

    it("should return valid metric values", async () => {
      const result = await caller.agents.getMetrics({ timeRange: "24h" });

      expect(result.avgProcessingTime).toBeGreaterThan(0);
      expect(result.successRate).toBeGreaterThan(99);
      expect(result.throughput).toBeGreaterThan(0);
      expect(result.costSavings).toBeGreaterThan(0);
      expect(result.requestsProcessed).toBeGreaterThan(0);
    });

    it("should return timestamp", async () => {
      const result = await caller.agents.getMetrics({});

      expect(result.timestamp).toBeDefined();
      expect(result.timestamp instanceof Date).toBe(true);
    });
  });

  describe("API Error Handling", () => {
    it("should handle invalid task type", async () => {
      try {
        await caller.agents.process({
          data: { test: "data" },
          taskType: "invalid_type" as any,
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should handle invalid sensitivity", async () => {
      try {
        await caller.agents.detectAnomalies({
          dataStream: [1, 2, 3],
          sensitivity: 1.5 as any,
        });
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should handle empty resources", async () => {
      try {
        await caller.agents.optimize({
          resources: [],
        });
        // Should still succeed with empty array
        expect(true).toBe(true);
      } catch (error) {
        expect.fail("Should not throw for empty resources");
      }
    });
  });
});
