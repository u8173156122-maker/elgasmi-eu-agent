import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ShoppingCart, Code, ArrowRight, Sparkles, Bot } from "lucide-react";
import { Link } from "wouter";

export default function Projects() {
  const getLang = () => {
    const lang = localStorage.getItem('i18nextLng') || 'en';
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('de')) return 'de';
    if (lang.startsWith('ar')) return 'ar';
    return 'en';
  };

  const lang = getLang();

  const content = {
    hero: {
      badge: {
        en: "Our Solutions",
        fr: "Nos Solutions",
        de: "Unsere Losungen",
        ar: "حلولنا"
      },
      title: {
        en: "Enterprise AI Projects",
        fr: "Projets IA Enterprise",
        de: "Enterprise KI-Projekte",
        ar: "مشاريع الذكاء الاصطناعي للمؤسسات"
      },
      subtitle: {
        en: "Ready-to-deploy AI solutions for your business. Full ownership with one-time purchase.",
        fr: "Solutions IA pretes a deployer pour votre entreprise. Propriete complete avec achat unique.",
        de: "Einsatzbereite KI-Losungen fur Ihr Unternehmen. Vollstandiges Eigentum bei einmaligem Kauf.",
        ar: "حلول ذكاء اصطناعي جاهزة للنشر لعملك. ملكية كاملة بشراء لمرة واحدة."
      }
    },
    projects: [
      {
        id: "jasmine-dev",
        href: "/projects/jasmine-dev",
        icon: ShoppingCart,
        color: "from-purple-600 to-indigo-600",
        bgColor: "from-purple-900 via-indigo-900 to-slate-900",
        title: "Jasmine Dev",
        subtitle: {
          en: "Next-Gen E-Commerce AI Platform",
          fr: "Plateforme E-Commerce IA Nouvelle Generation",
          de: "E-Commerce KI-Plattform der nachsten Generation",
          ar: "منصة التجارة الإلكترونية بالذكاء الاصطناعي"
        },
        description: {
          en: "All-in-one SaaS platform with 30+ native AI tools, 8 specialized AI agents, and automated e-commerce management.",
          fr: "Plateforme SaaS tout-en-un avec 30+ outils IA natifs, 8 agents IA specialises et gestion e-commerce automatisee.",
          de: "All-in-One SaaS-Plattform mit 30+ nativen KI-Tools, 8 spezialisierten KI-Agenten und automatisiertem E-Commerce-Management.",
          ar: "منصة SaaS شاملة مع 30+ أداة ذكاء اصطناعي أصلية، 8 وكلاء ذكاء اصطناعي متخصصين وإدارة تجارة إلكترونية آلية."
        },
        features: [
          { en: "30+ AI Tools", fr: "30+ Outils IA", de: "30+ KI-Tools", ar: "30+ أداة ذكاء اصطناعي" },
          { en: "8 AI Agents", fr: "8 Agents IA", de: "8 KI-Agenten", ar: "8 وكلاء ذكاء اصطناعي" },
          { en: "AI Negotiator Chatbot", fr: "Chatbot Negociateur IA", de: "KI-Verhandlungs-Chatbot", ar: "روبوت محادثة مفاوض" },
          { en: "Dynamic Pricing", fr: "Pricing Dynamique", de: "Dynamische Preisgestaltung", ar: "التسعير الديناميكي" }
        ],
        price: "10,000€"
      },
      {
        id: "code-generator",
        href: "/projects/code-generator",
        icon: Code,
        color: "from-blue-600 to-cyan-600",
        bgColor: "from-slate-900 via-blue-900 to-indigo-900",
        title: "18+ Frameworks",
        subtitle: {
          en: "Enterprise AI Code Generator",
          fr: "Generateur de Code IA Enterprise",
          de: "Enterprise KI-Code-Generator",
          ar: "مولد كود ذكاء اصطناعي للمؤسسات"
        },
        description: {
          en: "Doctoral-level AI platform with auto-correction, 50+ optimization strategies, and support for 18+ frameworks.",
          fr: "Plateforme IA niveau doctoral avec auto-correction, 50+ strategies d'optimisation et support 18+ frameworks.",
          de: "KI-Plattform auf Doktoratsniveau mit Autokorrektur, 50+ Optimierungsstrategien und Unterstutzung fur 18+ Frameworks.",
          ar: "منصة ذكاء اصطناعي بمستوى الدكتوراه مع التصحيح التلقائي، 50+ استراتيجية تحسين ودعم 18+ إطار عمل."
        },
        features: [
          { en: "18+ Frameworks", fr: "18+ Frameworks", de: "18+ Frameworks", ar: "18+ إطار عمل" },
          { en: "50+ Auto-corrections", fr: "50+ Auto-corrections", de: "50+ Auto-Korrekturen", ar: "50+ تصحيح تلقائي" },
          { en: "ANSSI Security", fr: "Securite ANSSI", de: "ANSSI-Sicherheit", ar: "أمان ANSSI" },
          { en: "70% Time Reduction", fr: "70% Reduction Temps", de: "70% Zeitreduzierung", ar: "70% تقليل الوقت" }
        ],
        price: "10,000€"
      },
      {
        id: "agents-autonomes",
        href: "/projects/agents-autonomes",
        icon: Bot,
        color: "from-emerald-500 to-teal-600",
        bgColor: "from-emerald-900 via-teal-900 to-slate-900",
        title: {
          en: "4 AI Agents",
          fr: "4 Agents IA",
          de: "4 KI-Agenten",
          ar: "4 وكلاء ذكاء اصطناعي"
        },
        subtitle: {
          en: "Autonomous AI System",
          fr: "Systeme IA Autonome",
          de: "Autonomes KI-System",
          ar: "نظام ذكاء اصطناعي مستقل"
        },
        description: {
          en: "4 specialized AI agents working 24/7 without human intervention. Sales, Marketing, Operations and Support - all automated.",
          fr: "4 agents IA specialises travaillent 24h/24, 7j/7 sans intervention humaine. Ventes, Marketing, Operations et Support - tous automatises.",
          de: "4 spezialisierte KI-Agenten arbeiten rund um die Uhr. Vertrieb, Marketing, Operations und Support - alles automatisiert.",
          ar: "4 وكلاء ذكاء اصطناعي متخصصين يعملون على مدار الساعة. المبيعات والتسويق والعمليات والدعم - كلها آلية."
        },
        features: [
          { en: "Sales Agent", fr: "Agent Ventes", de: "Vertriebsagent", ar: "وكيل المبيعات" },
          { en: "Marketing Agent", fr: "Agent Marketing", de: "Marketing-Agent", ar: "وكيل التسويق" },
          { en: "Operations Agent", fr: "Agent Operations", de: "Operations-Agent", ar: "وكيل العمليات" },
          { en: "Support Agent", fr: "Agent Support", de: "Support-Agent", ar: "وكيل الدعم" }
        ],
        price: "10,000€"
      }
    ],
    cta: {
      view: {
        en: "View Details",
        fr: "Voir Details",
        de: "Details anzeigen",
        ar: "عرض التفاصيل"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {content.hero.badge[lang as keyof typeof content.hero.badge]}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {content.hero.title[lang as keyof typeof content.hero.title]}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {content.hero.subtitle[lang as keyof typeof content.hero.subtitle]}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {content.projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className={`bg-gradient-to-br ${project.bgColor} p-8 text-white`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        {typeof project.title === 'string' ? project.title : project.title[lang as keyof typeof project.title]}
                      </h3>
                      <p className="text-sm opacity-80">{project.subtitle[lang as keyof typeof project.subtitle]}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-6">
                    {project.description[lang as keyof typeof project.description]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {feature[lang as keyof typeof feature]}
                      </span>
                    ))}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {lang === 'fr' ? 'Vente Definitive' : lang === 'de' ? 'Endgultiger Verkauf' : lang === 'ar' ? 'بيع نهائي' : 'Definitive Sale'}
                      </p>
                      <p className="text-4xl font-bold text-primary">{project.price}</p>
                    </div>
                    <Button asChild className="group-hover:translate-x-1 transition-transform">
                      <Link href={project.href}>
                        {content.cta.view[lang as keyof typeof content.cta.view]}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
