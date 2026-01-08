import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Elgasmi.e.U</span>
                <span className="text-xs text-muted-foreground">Systèmes Agentiques</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Expert en architecture microservices et systèmes agentiques. Nous concevons des solutions évolutives,
              résilientes et conformes aux principes SOLID.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>Hilschergasse 10/23</p>
                  <p>1120 Wien</p>
                  <p>Autriche</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:asmaewarter5@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  asmaewarter5@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:004368120460618"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +43 681 2046 0618
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/#portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Elgasmi.e.U. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
