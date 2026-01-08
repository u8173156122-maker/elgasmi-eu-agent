import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Copy, Code2, ExternalLink, Key, Zap, Shield } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/agents/process",
    title: "Process Data",
    description: "Submit data for automated processing by agentic systems",
    example: {
      request: `curl -X POST https://api.elgasmi.eu/api/v1/agents/process \\
  -H "X-API-Key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": {"orders": [{"id": 1, "quantity": 5}]},
    "taskType": "order_processing",
    "priority": "high"
  }'`,
      response: `{
  "success": true,
  "taskId": "task_1704067200000_abc123def",
  "result": {
    "processed": true,
    "itemsCount": 1,
    "validationPassed": true
  },
  "metrics": {
    "processingTime": 234,
    "itemsProcessed": 1,
    "successRate": 99.8
  }
}`,
    },
  },
  {
    method: "POST",
    path: "/api/v1/agents/optimize",
    title: "Optimize Resources",
    description: "Use intelligent agents to optimize resource allocation",
    example: {
      request: `curl -X POST https://api.elgasmi.eu/api/v1/agents/optimize \\
  -H "X-API-Key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "resources": [
      {"id": "server_1", "type": "compute", "utilization": 85},
      {"id": "server_2", "type": "compute", "utilization": 45}
    ]
  }'`,
      response: `{
  "success": true,
  "taskId": "opt_1704067200000_xyz789",
  "result": {
    "optimizedResources": [...],
    "totalCostReduction": 42,
    "efficiency": 94
  }
}`,
    },
  },
  {
    method: "POST",
    path: "/api/v1/agents/detect-anomalies",
    title: "Detect Anomalies",
    description: "Real-time anomaly detection in data streams",
    example: {
      request: `curl -X POST https://api.elgasmi.eu/api/v1/agents/detect-anomalies \\
  -H "X-API-Key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataStream": [100, 102, 101, 99, 450, 98, 101],
    "sensitivity": 0.85
  }'`,
      response: `{
  "success": true,
  "anomalies": [
    {
      "index": 4,
      "value": 450,
      "severity": "high"
    }
  ],
  "metrics": {
    "processingTime": 45,
    "anomaliesDetected": 1,
    "detectionRate": 99.9
  }
}`,
    },
  },
  {
    method: "GET",
    path: "/api/v1/agents/status",
    title: "Get Agent Status",
    description: "Retrieve the current status of all agentic systems",
    example: {
      request: `curl -X GET https://api.elgasmi.eu/api/v1/agents/status \\
  -H "X-API-Key: your_api_key"`,
      response: `{
  "status": "healthy",
  "agents": [
    {
      "name": "Decision Agent",
      "status": "active",
      "uptime": 99.99,
      "tasksProcessed": 1250000
    }
  ]
}`,
    },
  },
];

const codeExamples = [
  {
    language: "Python",
    code: `import requests

API_KEY = "your_api_key"
BASE_URL = "https://api.elgasmi.eu"

headers = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

# Process data
response = requests.post(
    f"{BASE_URL}/api/v1/agents/process",
    headers=headers,
    json={
        "data": {"orders": [{"id": 1}]},
        "taskType": "order_processing"
    }
)

result = response.json()
print(f"Task ID: {result['taskId']}")
print(f"Processing Time: {result['metrics']['processingTime']}ms")`,
  },
  {
    language: "JavaScript",
    code: `const API_KEY = "your_api_key";
const BASE_URL = "https://api.elgasmi.eu";

async function processData(data, taskType) {
  const response = await fetch(
    \`\${BASE_URL}/api/v1/agents/process\`,
    {
      method: "POST",
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data,
        taskType,
        priority: "high"
      })
    }
  );

  const result = await response.json();
  return result;
}

// Usage
const result = await processData(
  { orders: [{ id: 1 }] },
  "order_processing"
);
console.log("Task ID:", result.taskId);`,
  },
  {
    language: "PHP",
    code: `<?php
$apiKey = "your_api_key";
$baseUrl = "https://api.elgasmi.eu";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 
  "$baseUrl/api/v1/agents/process");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "X-API-Key: $apiKey",
  "Content-Type: application/json"
]);

$data = [
  "data" => ["orders" => [["id" => 1]]],
  "taskType" => "order_processing"
];

curl_setopt($ch, CURLOPT_POSTFIELDS, 
  json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$result = json_decode($response, true);

echo "Task ID: " . $result['taskId'];
?>`,
  },
];

export default function ApiDocs() {
  const { i18n } = useTranslation();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("curl");

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              API Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Integrate Elgasmi.e.U agentic systems into your applications with our comprehensive REST API.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge className="gradient-primary">OpenAPI 3.0</Badge>
              <Badge variant="outline">RESTful</Badge>
              <Badge variant="outline">Real-time</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Quick Start</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Key className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Get API Key</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Request an API key to start using our services.
                </p>
                <Button className="w-full gradient-primary" size="sm">
                  Request Key
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Read Docs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore detailed endpoint documentation.
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  View Swagger
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Start Building</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Integrate with your application.
                </p>
                <Button variant="outline" className="w-full" size="sm">
                  Code Examples
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-12">API Endpoints</h2>

          <div className="space-y-8">
            {endpoints.map((endpoint, idx) => (
              <Card key={idx} className="border-border overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={endpoint.method === "GET" ? "bg-blue-500" : "bg-green-500"}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono text-foreground">{endpoint.path}</code>
                      </div>
                      <CardTitle className="text-xl">{endpoint.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>{endpoint.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Example Request</h4>
                    <div className="relative bg-muted rounded-lg p-4">
                      <pre className="text-xs text-foreground overflow-x-auto">
                        <code>{endpoint.example.request}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(endpoint.example.request, idx)}
                        className="absolute top-2 right-2 p-2 hover:bg-background rounded transition-colors"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Example Response</h4>
                    <div className="relative bg-muted rounded-lg p-4">
                      <pre className="text-xs text-foreground overflow-x-auto">
                        <code>{endpoint.example.response}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(endpoint.example.response, idx + 100)}
                        className="absolute top-2 right-2 p-2 hover:bg-background rounded transition-colors"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-12">Code Examples</h2>

          <div className="space-y-8">
            {codeExamples.map((example, idx) => (
              <Card key={idx} className="border-border overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{example.language}</CardTitle>
                    <button
                      onClick={() => copyToClipboard(example.code, idx + 200)}
                      className="flex items-center gap-2 px-3 py-1 hover:bg-background rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <pre className="bg-muted rounded-lg p-4 overflow-x-auto">
                    <code className="text-xs text-foreground">{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Authentication</h2>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>API Key Authentication</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Header</h4>
                <div className="bg-muted rounded-lg p-4">
                  <code className="text-sm text-foreground">X-API-Key: your_api_key_here</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Rate Limiting</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Default limit: 1,000 requests per day</li>
                  <li>• Enterprise plans: Custom limits available</li>
                  <li>• Rate limit info in response headers</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Error Responses</h4>
                <div className="bg-muted rounded-lg p-4">
                  <pre className="text-xs text-foreground overflow-x-auto">
                    <code>{`{
  "success": false,
  "error": "Invalid API key",
  "code": "INVALID_API_KEY",
  "timestamp": "2024-01-01T12:00:00Z"
}`}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
