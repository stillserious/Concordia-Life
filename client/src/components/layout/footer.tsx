
import { Phone, Mail, Clock, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    kontakt: false,
    godziny: false,
    bezpieczenstwo: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-8 md:px-8 md:py-12">
        <div className="flex flex-col space-y-8 md:grid md:grid-cols-3 md:gap-12 md:space-y-0 md:justify-items-center md:max-w-5xl md:mx-auto">
          {/* Kontakt */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default mb-4"
              onClick={() => toggleSection('kontakt')}
            >
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Kontakt
              </h3>
              <div className="md:hidden">
                {openSections.kontakt ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </div>
            <div className={`space-y-4 md:block ${openSections.kontakt ? 'block' : 'hidden'}`}>
              <div className="flex items-center space-x-3" data-testid="footer-phone">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <a 
                    href="tel:+48228200220"
                    className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    +48 22 820 02 20
                  </a>
                  <p className="text-xs text-gray-500">Infolinia 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <a 
                    href="mailto:kontakt@concordialife.pl"
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    kontakt@concordialife.pl
                  </a>
                  <p className="text-xs text-gray-500">Odpowiedź w 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Godziny pracy */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default mb-4"
              onClick={() => toggleSection('godziny')}
            >
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Dostępność
              </h3>
              <div className="md:hidden">
                {openSections.godziny ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </div>
            <div className={`md:block ${openSections.godziny ? 'block' : 'hidden'}`}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Całodobowo</p>
                  <p className="text-xs text-gray-500">7 dni w tygodniu</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600">Dostępni teraz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bezpieczeństwo */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default mb-4"
              onClick={() => toggleSection('bezpieczenstwo')}
            >
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                Bezpieczeństwo
              </h3>
              <div className="md:hidden">
                {openSections.bezpieczenstwo ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </div>
            <div className={`md:block ${openSections.bezpieczenstwo ? 'block' : 'hidden'}`}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Dane chronione</p>
                  <p className="text-xs text-gray-500">Szyfrowanie SSL/TLS</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-xs text-amber-600">Certyfikat ważny</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
