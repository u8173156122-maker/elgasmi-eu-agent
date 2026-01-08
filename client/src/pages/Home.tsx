import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedArchitecture from "@/components/AnimatedArchitecture";
import AutomationSolutions from "@/components/AutomationSolutions";
import ChatBox from "@/components/ChatBox";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InteractiveDemo from "@/components/InteractiveDemo";
import { AnimatedGrid, AnimatedCard, AnimatedMetric, SlideUp } from "@/components/AnimatedTable";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Code2,
  Headphones,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Network,
  Phone,
  Puzzle,
  Server,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const { t } = useTranslation();

  const services = [
    {
      icon: Bot,
      title: t('services.agenticSystems'),
      description: t('services.agenticSystemsDesc'),
    },
    {
      icon: Puzzle,
      title: t('services.intelligentAutomation'),
      description: t('services.intelligentAutomationDesc'),
    },
    {
      icon: Network,
      title: t('services.distributedArchitecture'),
      description: t('services.distributedArchitectureDesc'),
    },
    {
      icon: Layers,
      title: t('services.solidPrinciples'),
      description: t('services.solidPrinciplesDesc'),
    },
    {
      icon: Shield,
      title: t('services.securityCompliance'),
      description: t('services.securityComplianceDesc'),
    },
    {
      icon: Zap,
      title: t('services.performanceScalability'),
      description: t('services.performanceScalabilityDesc'),
    },
  ];

  const portfolio = [
    {
      title: t('portfolio.ecommerce'),
      description: t('portfolio.ecommerceDesc'),
      technologies: ["Event Streaming", "Docker", "Kubernetes", "API Gateway"],
    },
    {
      title: t('portfolio.recommendation'),
      description: t('portfolio.recommendationDesc'),
      technologies: ["Machine Learning", "Event Sourcing", "Redis", "Python"],
    },
    {
      title: t('portfolio.banking'),
      description: t('portfolio.bankingDesc'),
      technologies: ["CQRS", "Event Sourcing", "PostgreSQL", "RabbitMQ"],
    },
  ];

  const whatsappNumber = "4368120460618";
  const whatsappBusinessNumber = "4368120460618";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              {t('hero.title')}
              <br />
              <span className="text-primary">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gradient-primary text-lg px-8" asChild>
                <a href="#contact">
                  {t('hero.cta1')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/vente">{t('hero.cta2')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pitch Block - Multi-Agents Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/10 border-y border-border">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Problem Statement */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('pitch.problem')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('pitch.problemDesc')}
                <span className="text-primary font-semibold"> {t('pitch.leadsLost')}</span>
                {" "}{t('pitch.toolsNoTalk')}
              </p>
            </div>

            {/* Solution */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('pitch.solution')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {t('pitch.solutionDesc')} <span className="text-primary font-semibold">{t('pitch.solutionHighlight')}</span> {t('pitch.solutionFor')}
              </p>

              {/* Agents Grid */}
              <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <AnimatedCard>
                  <Card className="border-border hover:shadow-elegant-lg transition-all duration-300 hover:border-primary h-full">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Target className="w-6 h-6 text-blue-500" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{t('pitch.agentSales')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('pitch.agentSalesDesc')}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedCard>

                <AnimatedCard>
                  <Card className="border-border hover:shadow-elegant-lg transition-all duration-300 hover:border-primary h-full">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-6 h-6 text-purple-500" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{t('pitch.agentMarketing')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('pitch.agentMarketingDesc')}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedCard>

                <AnimatedCard>
                  <Card className="border-border hover:shadow-elegant-lg transition-all duration-300 hover:border-primary h-full">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Server className="w-6 h-6 text-orange-500" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{t('pitch.agentOperations')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('pitch.agentOperationsDesc')}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedCard>

                <AnimatedCard>
                  <Card className="border-border hover:shadow-elegant-lg transition-all duration-300 hover:border-primary h-full">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Headphones className="w-6 h-6 text-green-500" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{t('pitch.agentSupport')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('pitch.agentSupportDesc')}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </AnimatedGrid>
            </div>

            {/* Results */}
            <SlideUp className="bg-card rounded-2xl p-8 border border-border mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{t('pitch.results')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <AnimatedMetric delay={0} className="text-center">
                  <div className="text-4xl font-bold text-primary">+340%</div>
                  <div className="text-sm text-muted-foreground">{t('pitch.conversionRate')}</div>
                </AnimatedMetric>
                <AnimatedMetric delay={0.1} className="text-center">
                  <div className="text-4xl font-bold text-primary">-70%</div>
                  <div className="text-sm text-muted-foreground">{t('pitch.acquisitionCost')}</div>
                </AnimatedMetric>
                <AnimatedMetric delay={0.2} className="text-center">
                  <div className="text-4xl font-bold text-primary">-73%</div>
                  <div className="text-sm text-muted-foreground">{t('pitch.manualTasks')}</div>
                </AnimatedMetric>
                <AnimatedMetric delay={0.3} className="text-center">
                  <div className="text-4xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">{t('pitch.availability')}</div>
                </AnimatedMetric>
              </div>
            </SlideUp>

            {/* Security & CTA */}
            <div className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">AES-256</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">GDPR</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">SOC 2 Type II</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">ISO 27001</span>
              </div>

              <p className="text-2xl font-bold text-foreground mb-6">
                "{t('pitch.slogan')}"
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gradient-primary text-lg px-8" asChild>
                  <Link href="/vente">
                    {t('hero.cta2')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    {t('pitch.freeAudit')}
                  </a>
                </Button>
              </div>

              <p className="text-muted-foreground mt-4">
                {t('pitch.aiWorksSleep')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('services.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-border hover:shadow-elegant-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Architecture Principles */}
          <div className="mt-16 bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-foreground mb-6 text-center">
                {t('services.architecturePrinciples')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('services.closedModifications')}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t('services.closedModificationsDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Puzzle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('services.openExtensions')}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t('services.openExtensionsDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('services.intelligentAuto')}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t('services.intelligentAutoDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Code2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('services.cleanArchitecture')}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t('services.cleanArchitectureDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Solutions Section */}
      <AutomationSolutions />

      {/* Architecture Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('architecture.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('architecture.description')}
            </p>
          </div>
          <div className="bg-background rounded-2xl p-8 border border-border">
            <AnimatedArchitecture />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('portfolio.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('portfolio.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <Card key={index} className="border-border hover:shadow-elegant-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">{t('portfolio.techUsed')}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <InteractiveDemo />

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('about.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('about.subtitle')}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                {t('about.description')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-background rounded-lg p-6 border border-border">
                  <Building2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{t('about.expertise')}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">
                        {t('about.expertiseItems.0')}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{t('about.expertiseItems.1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{t('about.expertiseItems.2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{t('about.expertiseItems.3')}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-background rounded-lg p-6 border border-border">
                  <Mail className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{t('about.contact')}</h3>
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      <strong className="text-foreground">{t('about.address')}:</strong>
                      <br />
                      Hilschergasse 10/23
                      <br />
                      1120 Wien, Austria
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <strong className="text-foreground">Email:</strong>
                      <br />
                      <a href="mailto:asmaewarter5@gmail.com" className="text-primary hover:underline">
                        asmaewarter5@gmail.com
                      </a>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <strong className="text-foreground">{t('about.phone')}:</strong>
                      <br />
                      <a href="tel:004368120460618" className="text-primary hover:underline">
                        +43 681 2046 0618
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('contact.title')}</h2>
            <p className="text-xl text-muted-foreground mb-12">
              {t('contact.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="border-border hover:shadow-elegant-lg transition-all duration-300 hover:border-primary cursor-pointer">
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors">
                      <MessageSquare className="w-8 h-8 text-[#25D366]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">{t('contact.whatsappDesc')}</p>
                  </CardContent>
                </Card>
              </a>

              {/* WhatsApp Business */}
              <a
                href={`https://wa.me/${whatsappBusinessNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="border-border hover:shadow-elegant-lg transition-all duration-300 hover:border-primary cursor-pointer">
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors">
                      <Building2 className="w-8 h-8 text-[#25D366]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">WhatsApp Business</h3>
                    <p className="text-muted-foreground text-sm">{t('contact.businessDesc')}</p>
                  </CardContent>
                </Card>
              </a>
            </div>

            <Card className="border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">{t('contact.formTitle')}</CardTitle>
                <CardDescription>{t('contact.formDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-elegant-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
        aria-label={t('chat.open', 'Open chat')}
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Box */}
      <ChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <Footer />
    </div>
  );
}
