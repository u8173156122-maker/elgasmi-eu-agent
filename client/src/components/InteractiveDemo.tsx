import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Zap, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function InteractiveDemo() {
  const { t } = useTranslation();
  const [activeScenario, setActiveScenario] = useState<string>("order-processing");
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const scenarios = [
    {
      id: "order-processing",
      title: t('demo.scenario1Title'),
      description: t('demo.scenario1Desc'),
      icon: <Zap className="w-6 h-6" />,
      input: t('demo.scenario1Input'),
      output: t('demo.scenario1Output'),
      metrics: [
        { label: t('demo.processingTime'), value: "0.3s" },
        { label: t('demo.successRate'), value: "99.9%" },
        { label: t('demo.costReduced'), value: "-85%" },
      ],
    },
    {
      id: "anomaly-detection",
      title: t('demo.scenario2Title'),
      description: t('demo.scenario2Desc'),
      icon: <TrendingUp className="w-6 h-6" />,
      input: t('demo.scenario2Input'),
      output: t('demo.scenario2Output'),
      metrics: [
        { label: t('demo.detection'), value: "<100ms" },
        { label: t('demo.accuracy'), value: "99.8%" },
        { label: t('demo.falsePositives'), value: "0.2%" },
      ],
    },
    {
      id: "resource-optimization",
      title: t('demo.scenario3Title'),
      description: t('demo.scenario3Desc'),
      icon: <CheckCircle2 className="w-6 h-6" />,
      input: t('demo.scenario3Input'),
      output: t('demo.scenario3Output'),
      metrics: [
        { label: t('demo.utilization'), value: "94%" },
        { label: t('demo.savings'), value: "42%" },
        { label: t('demo.latency'), value: "45ms" },
      ],
    },
    {
      id: "predictive-maintenance",
      title: t('demo.scenario4Title'),
      description: t('demo.scenario4Desc'),
      icon: <Clock className="w-6 h-6" />,
      input: t('demo.scenario4Input'),
      output: t('demo.scenario4Output'),
      metrics: [
        { label: t('demo.precision'), value: "96%" },
        { label: t('demo.downtimeAvoided'), value: "99%" },
        { label: t('demo.roi'), value: "340%" },
      ],
    },
  ];

  const current = scenarios.find(s => s.id === activeScenario);

  const handleRunDemo = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setShowOutput(true);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('demo.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('demo.description')}
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {scenarios.map(scenario => (
              <button
                key={scenario.id}
                onClick={() => {
                  setActiveScenario(scenario.id);
                  setShowOutput(false);
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  activeScenario === scenario.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">{scenario.icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground">{scenario.title}</h3>
                    <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Demo Interface */}
          {current && (
            <Card className="border-border overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {current.icon}
                      {current.title}
                    </CardTitle>
                    <CardDescription>{current.description}</CardDescription>
                  </div>
                  <Badge className="gradient-primary">{t('demo.active')}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-8 space-y-6">
                {/* Input Section */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">{t('demo.inputLabel')}</label>
                  <div className="bg-muted p-4 rounded-lg border border-border font-mono text-sm text-foreground whitespace-pre-wrap">
                    {current.input}
                  </div>
                </div>

                {/* Run Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleRunDemo}
                    disabled={isRunning}
                    className="gap-2 gradient-primary"
                    size="lg"
                  >
                    <Play className="w-4 h-4" />
                    {isRunning ? t('demo.running') : t('demo.runButton')}
                  </Button>
                </div>

                {/* Output Section */}
                {showOutput && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <label className="text-sm font-semibold text-foreground">{t('demo.outputLabel')}</label>
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 font-mono text-sm text-foreground whitespace-pre-wrap">
                      {current.output}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {current.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-accent/50 rounded-lg p-3 text-center">
                          <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                          <div className="text-lg font-bold text-primary">{metric.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Success Message */}
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-300">{t('demo.success')}</h4>
                        <p className="text-sm text-green-800 dark:text-green-400">
                          {t('demo.successDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {isRunning && (
                  <div className="space-y-3 animate-pulse">
                    <label className="text-sm font-semibold text-foreground">{t('demo.outputLabel')}</label>
                    <div className="bg-muted h-24 rounded-lg border border-border"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Key Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('demo.featureRealtime')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('demo.featureRealtimeDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('demo.featureOptimization')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('demo.featureOptimizationDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('demo.featureReliability')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('demo.featureReliabilityDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
