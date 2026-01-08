import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatedGrid, AnimatedMetric, SlideUp } from "@/components/AnimatedTable";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Globe,
  Headphones,
  Lock,
  Mail,
  MessageSquare,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function Vente() {
  const { t } = useTranslation();
  const whatsappNumber = "4368120460618";

  const securityFeatures = [
    { icon: Lock, label: "AES-256" },
    { icon: Shield, label: "GDPR" },
    { icon: CheckCircle2, label: "SOC 2 Type II" },
    { icon: Globe, label: "ISO 27001" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{t('vente.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              {t('vente.title')}
              <br />
              <span className="text-primary">{t('vente.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed max-w-3xl mx-auto">
              {t('vente.intro')}
            </p>
            <p className="text-2xl font-semibold text-primary mb-8">
              {t('vente.introHighlight')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gradient-primary text-lg px-8" asChild>
                <a href="#offers">
                  {t('vente.discoverOffers')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  {t('vente.freeAudit')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t('vente.philosophy1Title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('vente.philosophy1Desc')}
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t('vente.philosophy2Title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('vente.philosophy2Desc')}
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t('vente.philosophy3Title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('vente.philosophy3Desc')}
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t('vente.philosophy4Title')}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('vente.philosophy4Desc')}
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-primary">
                "{t('vente.philosophyQuote')}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('vente.offersTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('vente.offersSubtitle')}
            </p>
          </div>

          <AnimatedGrid className="space-y-16">
            {/* Offer 1 - Multi-Agents */}
            <SlideUp><Card className="border-border overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">{t('vente.offer1Title')}</CardTitle>
                      <CardDescription className="text-lg">{t('vente.offer1Subtitle')}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary">10 000 EUR</div>
                    <div className="text-muted-foreground">{t('vente.definitiveSale')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-lg text-muted-foreground">{t('vente.offer1Desc')}</p>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">{t('pitch.agentSales')}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{t('pitch.agentSalesDesc')}</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">{t('pitch.agentMarketing')}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{t('pitch.agentMarketingDesc')}</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Server className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">{t('pitch.agentOperations')}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{t('pitch.agentOperationsDesc')}</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Headphones className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">{t('pitch.agentSupport')}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{t('pitch.agentSupportDesc')}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatedMetric delay={0} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">+340%</div>
                    <div className="text-sm text-muted-foreground">{t('pitch.conversionRate')}</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.1} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">-70%</div>
                    <div className="text-sm text-muted-foreground">{t('pitch.acquisitionCost')}</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.2} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">-73%</div>
                    <div className="text-sm text-muted-foreground">{t('pitch.manualTasks')}</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.3} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">{t('pitch.availability')}</div>
                  </AnimatedMetric>
                </div>

                <div className="flex justify-center">
                  <Button size="lg" className="gradient-primary" asChild>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                      {t('vente.orderOffer')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card></SlideUp>

            {/* Offer 2 - RAG Platform */}
            <SlideUp delay={0.2}><Card className="border-border overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">{t('vente.offer2Title')}</CardTitle>
                      <CardDescription className="text-lg">{t('vente.offer2Subtitle')}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary">10 000 EUR</div>
                    <div className="text-muted-foreground">{t('vente.definitiveSale')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-lg text-muted-foreground">{t('vente.offer2Desc')}</p>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <h4 className="font-semibold text-foreground mb-3">Communication</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Gmail", "Slack", "WhatsApp", "Email"].map((item) => (
                        <span key={item} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <h4 className="font-semibold text-foreground mb-3">Productivity</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Meetings", "Planning", "Projects", "Invoices"].map((item) => (
                        <span key={item} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <h4 className="font-semibold text-foreground mb-3">AI & Analytics</h4>
                    <div className="flex flex-wrap gap-2">
                      {["OCR", "Image Analysis", "RAG", "Claude AI"].map((item) => (
                        <span key={item} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <h4 className="font-semibold text-foreground mb-3">Integration</h4>
                    <div className="flex flex-wrap gap-2">
                      {["CRM", "Transactions", "Knowledge Base", "Web Search"].map((item) => (
                        <span key={item} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatedMetric delay={0} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">-70%</div>
                    <div className="text-sm text-muted-foreground">Admin Time</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.1} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">+50%</div>
                    <div className="text-sm text-muted-foreground">Productivity</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.2} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">28+</div>
                    <div className="text-sm text-muted-foreground">Tools</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.3} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Automation</div>
                  </AnimatedMetric>
                </div>

                <div className="flex justify-center">
                  <Button size="lg" className="gradient-primary" asChild>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                      {t('vente.orderOffer')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card></SlideUp>

            {/* Offer 3 - Enterprise AI */}
            <SlideUp delay={0.4}><Card className="border-border overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500" />
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">{t('vente.offer3Title')}</CardTitle>
                      <CardDescription className="text-lg">{t('vente.offer3Subtitle')}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary">10 000 EUR</div>
                    <div className="text-muted-foreground">{t('vente.definitiveSale')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-lg text-muted-foreground">{t('vente.offer3Desc')}</p>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">Code Generation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">18+ frameworks: Next.js, React, Angular, Vue, Node.js, Python</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">Auto-Correction</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">50+ advanced algorithms for real-time expert-level code correction</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">Continuous Learning</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Machine learning for continuous improvement with each use</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-foreground">Secure Multi-Agents</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Distributed architecture with Raft consensus, 10,000+ requests/second</p>
                  </div>
                </div>

                {/* Tech Specs */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {["AES-256 + JWT", "Voice Interface FR/EN/DE/AR", "Raft Distributed", "ANSSI Compliance"].map((spec) => (
                    <span key={spec} className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-full font-medium">{spec}</span>
                  ))}
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatedMetric delay={0} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">-70%</div>
                    <div className="text-sm text-muted-foreground">Dev Time</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.1} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">0</div>
                    <div className="text-sm text-muted-foreground">Prod Bugs</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.2} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">3x</div>
                    <div className="text-sm text-muted-foreground">Faster</div>
                  </AnimatedMetric>
                  <AnimatedMetric delay={0.3} className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">18+</div>
                    <div className="text-sm text-muted-foreground">Frameworks</div>
                  </AnimatedMetric>
                </div>

                <div className="flex justify-center">
                  <Button size="lg" className="gradient-primary" asChild>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                      {t('vente.orderOffer')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card></SlideUp>
          </AnimatedGrid>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">{t('vente.securityTitle')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {securityFeatures.map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <FeatureIcon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('vente.ctaTitle')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('vente.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gradient-primary text-lg px-8" asChild>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 w-5 h-5" />
                  {t('vente.requestAudit')}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="mailto:asmaewarter5@gmail.com">
                  <Mail className="mr-2 w-5 h-5" />
                  {t('vente.sendEmail')}
                </a>
              </Button>
            </div>
            <p className="text-3xl font-bold text-primary mt-12">
              "{t('pitch.slogan')}"
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              {t('pitch.aiWorksSleep')}
            </p>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t('vente.investorsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Stack", value: "Next.js, React, PostgreSQL, Claude AI" },
                { label: "Multi-tenant", value: "Users, roles, subscriptions" },
                { label: "Secure", value: "AES-256, Secure Auth" },
                { label: "Scalable", value: "Cloud-ready architecture" },
                { label: "Market", value: "B2B, SaaS, Government, Finance, Health" },
                { label: "ROI", value: "60-day return on investment" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div>
                    <span className="font-semibold text-foreground">{item.label}:</span>
                    <span className="text-muted-foreground ml-2">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
