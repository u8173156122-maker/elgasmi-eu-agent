import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, TrendingUp, Shield, Clock, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AutomationSolutions() {
  const { t } = useTranslation();

  const solutions = [
    {
      title: t('automation.solution1Title'),
      description: t('automation.solution1Desc'),
      icon: Zap,
      benefits: [
        t('automation.solution1Benefit1'),
        t('automation.solution1Benefit2'),
        t('automation.solution1Benefit3'),
      ],
      metrics: { efficiency: "85%", time: "70%", cost: "60%" },
    },
    {
      title: t('automation.solution2Title'),
      description: t('automation.solution2Desc'),
      icon: TrendingUp,
      benefits: [
        t('automation.solution2Benefit1'),
        t('automation.solution2Benefit2'),
        t('automation.solution2Benefit3'),
      ],
      metrics: { accuracy: "98%", speed: "3x", savings: "$M+" },
    },
    {
      title: t('automation.solution3Title'),
      description: t('automation.solution3Desc'),
      icon: Shield,
      benefits: [
        t('automation.solution3Benefit1'),
        t('automation.solution3Benefit2'),
        t('automation.solution3Benefit3'),
      ],
      metrics: { detection: "99.9%", response: "<1s", prevention: "95%" },
    },
    {
      title: t('automation.solution4Title'),
      description: t('automation.solution4Desc'),
      icon: Cpu,
      benefits: [
        t('automation.solution4Benefit1'),
        t('automation.solution4Benefit2'),
        t('automation.solution4Benefit3'),
      ],
      metrics: { uptime: "99.99%", repair: "Auto", maintenance: "Predictive" },
    },
    {
      title: t('automation.solution5Title'),
      description: t('automation.solution5Desc'),
      icon: Clock,
      benefits: [
        t('automation.solution5Benefit1'),
        t('automation.solution5Benefit2'),
        t('automation.solution5Benefit3'),
      ],
      metrics: { latency: "<100ms", context: "360°", audit: "100%" },
    },
    {
      title: t('automation.solution6Title'),
      description: t('automation.solution6Desc'),
      icon: TrendingUp,
      benefits: [
        t('automation.solution6Benefit1'),
        t('automation.solution6Benefit2'),
        t('automation.solution6Benefit3'),
      ],
      metrics: { accuracy: "94%", allocation: "Optimal", risk: "-40%" },
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('automation.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('automation.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card
                key={index}
                className="border-border hover:shadow-elegant-lg transition-all duration-300 overflow-hidden group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className="gradient-primary">{t('demo.active')}</Badge>
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Benefits */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-foreground">{t('automation.benefits')}</h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <h4 className="font-semibold text-sm text-foreground">{t('automation.metrics')}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(solution.metrics).map(([key, value]) => (
                        <div key={key} className="bg-accent/50 rounded-lg p-2 text-center">
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          <div className="text-sm font-semibold text-primary">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Principles */}
        <div className="mt-20 bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            {t('automation.principles')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-3">∞</div>
              <h4 className="font-semibold text-foreground mb-2">{t('automation.infiniteScalability')}</h4>
              <p className="text-muted-foreground text-sm">
                {t('automation.infiniteScalabilityDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-3">⚡</div>
              <h4 className="font-semibold text-foreground mb-2">{t('automation.realtime')}</h4>
              <p className="text-muted-foreground text-sm">
                {t('automation.realtimeDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-3">🧠</div>
              <h4 className="font-semibold text-foreground mb-2">{t('automation.adaptiveIntelligence')}</h4>
              <p className="text-muted-foreground text-sm">
                {t('automation.adaptiveIntelligenceDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
