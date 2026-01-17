import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ShoppingCart, MessageSquare, CheckCircle2, ArrowRight,
  Shield, Bot, Sparkles, BarChart3, Mail, DollarSign, Lock
} from "lucide-react";

export default function JasmineDev() {
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
        en: "Next-Gen E-Commerce AI Platform",
        fr: "Plateforme E-Commerce IA Nouvelle Generation",
        de: "E-Commerce KI-Plattform der nachsten Generation",
        ar: "منصة التجارة الإلكترونية بالذكاء الاصطناعي من الجيل الجديد"
      },
      title: "Jasmine Dev",
      subtitle: {
        en: "All-in-one SaaS platform with 30+ native AI tools to automate your entire e-commerce business.",
        fr: "Plateforme SaaS tout-en-un qui integre nativement 30+ outils IA pour automatiser l'ensemble de votre activite e-commerce.",
        de: "All-in-One SaaS-Plattform mit 30+ nativen KI-Tools zur Automatisierung Ihres gesamten E-Commerce-Geschafts.",
        ar: "منصة SaaS شاملة مع 30+ أداة ذكاء اصطناعي أصلية لأتمتة نشاطك التجاري الإلكتروني بالكامل."
      }
    },
    problem: {
      title: { en: "The Problem", fr: "Le Probleme", de: "Das Problem", ar: "المشكلة" },
      items: [
        { en: "80% of time wasted on repetitive manual tasks", fr: "80% du temps perdu en taches manuelles repetitives", de: "80% der Zeit fur wiederholende manuelle Aufgaben verschwendet", ar: "80% من الوقت يضيع في المهام اليدوية المتكررة" },
        { en: "Lack of native integrated AI tools (dependency on third-party apps)", fr: "Manque d'outils IA integres natifs (dependance aux apps tierces)", de: "Mangel an nativen integrierten KI-Tools (Abhangigkeit von Drittanbieter-Apps)", ar: "نقص أدوات الذكاء الاصطناعي المتكاملة الأصلية" },
        { en: "Exponential costs to scale with fragmented solutions", fr: "Couts exponentiels pour scaler avec des solutions fragmentees", de: "Exponentielle Kosten fur die Skalierung mit fragmentierten Losungen", ar: "تكاليف أسية للتوسع مع الحلول المجزأة" }
      ]
    },
    comparison: {
      title: { en: "Unique Value Proposition", fr: "Proposition de Valeur Unique", de: "Einzigartiges Wertversprechen", ar: "عرض القيمة الفريد" },
      headers: {
        competitor: { en: "Competitor", fr: "Concurrent", de: "Wettbewerber", ar: "المنافس" },
        thirdParty: { en: "Third-party apps", fr: "Apps tierces", de: "Drittanbieter-Apps", ar: "تطبيقات الطرف الثالث" },
        jasmine: { en: "Jasmine Dev", fr: "Jasmine Dev", de: "Jasmine Dev", ar: "Jasmine Dev" }
      },
      rows: [
        { competitor: "Shopify", thirdParty: "15-20", jasmine: { en: "0 - All integrated", fr: "0 - Tout integre", de: "0 - Alles integriert", ar: "0 - الكل متكامل" } },
        { competitor: "WooCommerce", thirdParty: "25+", jasmine: { en: "0 - Native AI", fr: "0 - IA native", de: "0 - Native KI", ar: "0 - ذكاء اصطناعي أصلي" } },
        { competitor: "Magento", thirdParty: { en: "Complex setup", fr: "Config complexe", de: "Komplexe Einrichtung", ar: "إعداد معقد" }, jasmine: { en: "Ready in 5 min", fr: "Pret en 5 min", de: "Bereit in 5 Min", ar: "جاهز في 5 دقائق" } }
      ]
    },
    stack: {
      title: { en: "Enterprise-Grade Technical Stack", fr: "Stack Technique Enterprise-Grade", de: "Enterprise-Grade Technischer Stack", ar: "مكدس تقني بمستوى المؤسسات" },
      items: [
        { label: "Frontend", value: "React 18 + TypeScript + Tailwind CSS" },
        { label: "Backend", value: "Spring Boot 3.2 + Java 17" },
        { label: "AI Engine", value: "FastAPI + LangChain + GPT-4 Turbo" },
        { label: "Data", value: "PostgreSQL 15 + Redis 7 + Pinecone" },
        { label: "Infra", value: "Kubernetes + Kong API Gateway + Kafka" }
      ]
    },
    performance: {
      title: { en: "Guaranteed Performance", fr: "Performance Garantie", de: "Garantierte Leistung", ar: "أداء مضمون" },
      items: [
        { en: "< 200ms global response time (CDN)", fr: "< 200ms temps de reponse global (CDN)", de: "< 200ms globale Antwortzeit (CDN)", ar: "< 200ms وقت استجابة عالمي" },
        { en: "99.9% uptime SLA", fr: "99.9% uptime SLA", de: "99.9% Verfugbarkeit SLA", ar: "99.9% SLA وقت التشغيل" },
        { en: "10,000+ simultaneous users", fr: "10,000+ utilisateurs simultanes", de: "10.000+ gleichzeitige Benutzer", ar: "10,000+ مستخدم متزامن" },
        { en: "Adaptive Kubernetes auto-scaling", fr: "Auto-scaling Kubernetes adaptatif", de: "Adaptives Kubernetes Auto-Scaling", ar: "تحجيم تلقائي متكيف" }
      ]
    },
    aiTools: {
      title: { en: "30+ Native AI Tools", fr: "30+ Outils IA Natifs", de: "30+ Native KI-Tools", ar: "30+ أداة ذكاء اصطناعي أصلية" },
      categories: [
        {
          icon: Sparkles,
          title: { en: "Product Generation", fr: "Generation Produits", de: "Produktgenerierung", ar: "توليد المنتجات" },
          items: [
            { en: "Auto product sheets (title, description, SEO)", fr: "Fiches produits auto (titre, description, SEO)", de: "Auto Produktblatter (Titel, Beschreibung, SEO)", ar: "صفحات منتجات تلقائية" },
            { en: "DALL-E 3 for professional photos", fr: "DALL-E 3 pour photos professionnelles", de: "DALL-E 3 fur professionelle Fotos", ar: "DALL-E 3 للصور الاحترافية" },
            { en: "Deep learning personalized recommendations", fr: "Recommandations personnalisees deep learning", de: "Deep Learning personalisierte Empfehlungen", ar: "توصيات مخصصة بالتعلم العميق" }
          ]
        },
        {
          icon: DollarSign,
          title: { en: "Dynamic Pricing", fr: "Pricing Dynamique", de: "Dynamische Preisgestaltung", ar: "التسعير الديناميكي" },
          items: [
            { en: "Real-time price adjustment (demand + competition)", fr: "Ajustement prix temps reel (demande + concurrence)", de: "Echtzeit-Preisanpassung", ar: "تعديل الأسعار في الوقت الفعلي" },
            { en: "Targeted promotions generation", fr: "Generation promotions ciblees", de: "Generierung gezielter Werbeaktionen", ar: "توليد العروض الترويجية المستهدفة" },
            { en: "Price elasticity analysis", fr: "Analyse elasticite prix", de: "Preiselastizitatsanalyse", ar: "تحليل مرونة الأسعار" }
          ]
        },
        {
          icon: BarChart3,
          title: { en: "Sales Prediction", fr: "Prediction Ventes", de: "Verkaufsprognose", ar: "التنبؤ بالمبيعات" },
          items: [
            { en: "ML Ensemble: Prophet + XGBoost + LSTM", fr: "Ensemble ML : Prophet + XGBoost + LSTM", de: "ML Ensemble: Prophet + XGBoost + LSTM", ar: "مجموعة ML" },
            { en: "90-day forecasts with confidence intervals", fr: "Previsions 90 jours avec intervalles confiance", de: "90-Tage-Prognosen", ar: "توقعات 90 يومًا" },
            { en: "Concrete action recommendations", fr: "Recommandations actions concretes", de: "Konkrete Handlungsempfehlungen", ar: "توصيات إجراءات ملموسة" }
          ]
        },
        {
          icon: Bot,
          title: { en: "AI Negotiator Chatbot", fr: "Chatbot Negociateur IA", de: "KI-Verhandlungs-Chatbot", ar: "روبوت محادثة مفاوض" },
          items: [
            { en: "World innovation: negotiates prices with customers", fr: "Innovation mondiale : negocie les prix avec vos clients", de: "Weltinnovation: verhandelt Preise mit Kunden", ar: "ابتكار عالمي: يتفاوض على الأسعار" },
            { en: "Proposes bundles and alternatives", fr: "Propose bundles et alternatives", de: "Schlagt Bundles und Alternativen vor", ar: "يقترح الحزم والبدائل" },
            { en: "Respects your minimum margins", fr: "Respecte vos marges minimales", de: "Respektiert Ihre Mindestmargen", ar: "يحترم هوامشك الدنيا" }
          ]
        },
        {
          icon: Mail,
          title: { en: "Automated Marketing", fr: "Marketing Automatise", de: "Automatisiertes Marketing", ar: "التسويق الآلي" },
          items: [
            { en: "AI personalized emails", fr: "Emails personnalises IA", de: "KI-personalisierte E-Mails", ar: "رسائل بريد إلكتروني مخصصة" },
            { en: "Abandoned cart recovery", fr: "Recuperation paniers abandonnes", de: "Wiederherstellung abgebrochener Warenkorbe", ar: "استرداد السلات المهجورة" },
            { en: "Auto-generated social media content", fr: "Contenu social media auto-genere", de: "Automatisch generierter Social-Media-Inhalt", ar: "محتوى وسائل التواصل المولد تلقائيًا" }
          ]
        }
      ]
    },
    agents: {
      title: { en: "8 Specialized AI Agents", fr: "8 Agents IA Specialises", de: "8 Spezialisierte KI-Agenten", ar: "8 وكلاء ذكاء اصطناعي متخصصين" },
      subtitle: { en: "A world-class AI team working synergistically like an executive board", fr: "Une equipe IA de classe mondiale travaillant en synergie comme un board executif", de: "Ein KI-Team von Weltklasse, das synergetisch wie ein Vorstand arbeitet", ar: "فريق ذكاء اصطناعي عالمي المستوى يعمل بتناغم" },
      items: [
        { emoji: "👑", title: "CEO Agent", desc: { en: "Strategic vision, decisions, roadmap", fr: "Vision strategique, decisions, roadmap", de: "Strategische Vision, Entscheidungen, Roadmap", ar: "رؤية استراتيجية، قرارات، خارطة طريق" } },
        { emoji: "📈", title: "CMO Agent", desc: { en: "Omnichannel marketing, SEO, Ads", fr: "Marketing omnicanal, SEO, Ads", de: "Omnichannel-Marketing, SEO, Ads", ar: "تسويق متعدد القنوات، SEO، إعلانات" } },
        { emoji: "💰", title: "Sales Agent", desc: { en: "Sales strategy, scripts, CRM", fr: "Strategie commerciale, scripts, CRM", de: "Vertriebsstrategie, Skripte, CRM", ar: "استراتيجية المبيعات، النصوص، CRM" } },
        { emoji: "🛠", title: "Product Manager", desc: { en: "Product roadmap, MVP tests, pricing", fr: "Roadmap produit, tests MVP, pricing", de: "Produkt-Roadmap, MVP-Tests, Preise", ar: "خارطة المنتج، اختبارات MVP، التسعير" } },
        { emoji: "🤝", title: "Support Agent", desc: { en: "Customer experience, onboarding", fr: "Experience client, onboarding", de: "Kundenerfahrung, Onboarding", ar: "تجربة العملاء، التأهيل" } },
        { emoji: "📊", title: "Data Analyst", desc: { en: "KPIs, ROI, CAC, LTV, dashboards", fr: "KPIs, ROI, CAC, LTV, dashboards", de: "KPIs, ROI, CAC, LTV, Dashboards", ar: "مؤشرات الأداء، العائد، تكلفة الاستحواذ" } },
        { emoji: "🌍", title: "Legal Agent", desc: { en: "GDPR, taxation, global commerce", fr: "RGPD, fiscalite, commerce global", de: "DSGVO, Steuern, globaler Handel", ar: "GDPR، الضرائب، التجارة العالمية" } },
        { emoji: "🎥", title: "Content Creator", desc: { en: "Video ads, visuals, templates", fr: "Ads videos, visuels, templates", de: "Video-Ads, Visuals, Templates", ar: "إعلانات فيديو، مرئيات، قوالب" } }
      ]
    },
    security: {
      title: { en: "Government-Grade Security", fr: "Securite Government-Grade", de: "Sicherheit auf Regierungsebene", ar: "أمان بمستوى حكومي" },
      items: [
        { en: "AES-256-GCM encryption (data at rest)", fr: "Chiffrement AES-256-GCM (donnees au repos)", de: "AES-256-GCM-Verschlusselung", ar: "تشفير AES-256-GCM" },
        { en: "Argon2id hashing (passwords)", fr: "Hachage Argon2id (mots de passe)", de: "Argon2id-Hashing", ar: "تجزئة Argon2id" },
        { en: "RSA-2048 (keys and JWT tokens)", fr: "RSA-2048 (cles et tokens JWT)", de: "RSA-2048 (Schlussel und JWT-Token)", ar: "RSA-2048" },
        { en: "Zero Trust Architecture", fr: "Architecture Zero Trust", de: "Zero-Trust-Architektur", ar: "هندسة Zero Trust" },
        { en: "SOC 2 Type II, GDPR, PCI-DSS Level 1 compliant", fr: "Conforme SOC 2 Type II, GDPR, PCI-DSS Level 1", de: "SOC 2 Type II, GDPR, PCI-DSS Level 1 konform", ar: "متوافق مع SOC 2 Type II, GDPR, PCI-DSS Level 1" }
      ]
    },
    roi: {
      title: { en: "Measurable ROI", fr: "ROI Mesurable", de: "Messbarer ROI", ar: "عائد استثمار قابل للقياس" },
      metrics: [
        { label: { en: "Product creation time", fr: "Temps creation produit", de: "Produkterstellungszeit", ar: "وقت إنشاء المنتج" }, before: "45 min", after: "2 min", change: "-96%" },
        { label: { en: "Conversion rate", fr: "Taux conversion", de: "Konversionsrate", ar: "معدل التحويل" }, before: "2.1%", after: "3.8%", change: "+81%" },
        { label: { en: "Average cart", fr: "Panier moyen", de: "Durchschnittlicher Warenkorb", ar: "متوسط السلة" }, before: "67€", after: "89€", change: "+33%" },
        { label: { en: "Tools cost/month", fr: "Cout outils/mois", de: "Werkzeugkosten/Monat", ar: "تكلفة الأدوات/شهر" }, before: "450€", after: "99€", change: "-78%" }
      ]
    },
    pricing: {
      title: { en: "Definitive Sale", fr: "Vente Definitive", de: "Endgultiger Verkauf", ar: "بيع نهائي" },
      subtitle: { en: "One-time purchase - Full ownership", fr: "Achat unique - Propriete complete", de: "Einmaliger Kauf - Vollstandiges Eigentum", ar: "شراء لمرة واحدة - ملكية كاملة" },
      includes: [
        { en: "Complete source code", fr: "Code source complet", de: "Vollstandiger Quellcode", ar: "الكود المصدري الكامل" },
        { en: "Full documentation", fr: "Documentation complete", de: "Vollstandige Dokumentation", ar: "التوثيق الكامل" },
        { en: "Deployment support", fr: "Support deploiement", de: "Deployment-Unterstutzung", ar: "دعم النشر" },
        { en: "30 days assistance", fr: "30 jours d'assistance", de: "30 Tage Unterstutzung", ar: "30 يوم مساعدة" },
        { en: "Commercial license", fr: "Licence commerciale", de: "Kommerzielle Lizenz", ar: "رخصة تجارية" }
      ]
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ShoppingCart className="w-4 h-4" />
            {content.hero.badge[lang as keyof typeof content.hero.badge]}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            {content.hero.title}
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            {content.hero.subtitle[lang as keyof typeof content.hero.subtitle]}
          </p>
          <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-100" asChild>
            <a href="https://wa.me/4368120460618" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 w-5 h-5" />
              {lang === 'fr' ? 'Demander une Demo' : lang === 'de' ? 'Demo anfordern' : lang === 'ar' ? 'طلب عرض توضيحي' : 'Request Demo'}
            </a>
          </Button>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-50 dark:bg-red-950/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
            {content.problem.title[lang as keyof typeof content.problem.title]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {content.problem.items.map((item, idx) => (
              <Card key={idx} className="border-red-200 dark:border-red-800">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-600">{idx + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{item[lang as keyof typeof item]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            {content.comparison.title[lang as keyof typeof content.comparison.title]}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-4 text-left font-semibold">{content.comparison.headers.competitor[lang as keyof typeof content.comparison.headers.competitor]}</th>
                  <th className="p-4 text-left font-semibold">{content.comparison.headers.thirdParty[lang as keyof typeof content.comparison.headers.thirdParty]}</th>
                  <th className="p-4 text-left font-semibold text-primary">{content.comparison.headers.jasmine[lang as keyof typeof content.comparison.headers.jasmine]}</th>
                </tr>
              </thead>
              <tbody>
                {content.comparison.rows.map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-4 font-medium">{row.competitor}</td>
                    <td className="p-4 text-red-500">
                      {typeof row.thirdParty === 'string' ? row.thirdParty : row.thirdParty[lang as keyof typeof row.thirdParty]}
                    </td>
                    <td className="p-4 text-green-600 font-semibold">
                      {row.jasmine[lang as keyof typeof row.jasmine]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            {content.stack.title[lang as keyof typeof content.stack.title]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {content.stack.items.map((item, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6 text-center">
                  <div className="text-xs text-slate-400 mb-2">{item.label}</div>
                  <div className="text-sm font-mono text-green-400">{item.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-6">
              {content.performance.title[lang as keyof typeof content.performance.title]}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {content.performance.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{item[lang as keyof typeof item]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {content.aiTools.title[lang as keyof typeof content.aiTools.title]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.aiTools.categories.map((cat, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <cat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      {cat.title[lang as keyof typeof cat.title]}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{item[lang as keyof typeof item]}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8 AI Agents */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            {content.agents.title[lang as keyof typeof content.agents.title]}
          </h2>
          <p className="text-center text-purple-200 mb-12 max-w-2xl mx-auto">
            {content.agents.subtitle[lang as keyof typeof content.agents.subtitle]}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {content.agents.items.map((agent, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-2">{agent.emoji}</div>
                <h3 className="font-bold text-lg mb-1">{agent.title}</h3>
                <p className="text-sm text-purple-200">{agent.desc[lang as keyof typeof agent.desc]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50 dark:bg-green-950/20">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold text-green-600">
              {content.security.title[lang as keyof typeof content.security.title]}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {content.security.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-3 rounded-lg shadow-sm">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm">{item[lang as keyof typeof item]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            {content.roi.title[lang as keyof typeof content.roi.title]}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {content.roi.metrics.map((metric, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {metric.label[lang as keyof typeof metric.label]}
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-red-500 line-through">{metric.before}</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-lg font-bold text-green-600">{metric.after}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{metric.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - 10,000€ Definitive Sale */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            {content.pricing.title[lang as keyof typeof content.pricing.title]}
          </h2>
          <div className="max-w-xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="text-7xl font-bold text-white mb-2">10,000€</div>
              <p className="text-purple-200 text-lg mb-8">
                {content.pricing.subtitle[lang as keyof typeof content.pricing.subtitle]}
              </p>
              <div className="border-t border-white/20 pt-6">
                <ul className="space-y-3 text-left max-w-xs mx-auto">
                  {content.pricing.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-purple-100">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                      {item[lang as keyof typeof item]}
                    </li>
                  ))}
                </ul>
              </div>
              <Button size="lg" className="mt-8 bg-white text-purple-900 hover:bg-purple-100 w-full" asChild>
                <a href="https://wa.me/4368120460618" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 w-5 h-5" />
                  {lang === 'fr' ? 'Contacter pour Acheter' : lang === 'de' ? 'Kontakt zum Kauf' : lang === 'ar' ? 'تواصل للشراء' : 'Contact to Buy'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
