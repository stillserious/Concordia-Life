
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
    <footer className="bg-gradient-to-br from-white to-blue-50 border-t-2 border-blue-200 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-col space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 md:justify-items-center md:max-w-4xl md:mx-auto">
          {/* Kontakt */}
          <div className="space-y-2 text-left w-full">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default"
              onClick={() => toggleSection('kontakt')}
            >
              <h3 className="text-sm font-bold text-gray-800 mb-2">Kontakt</h3>
              <div className="md:hidden">
                {openSections.kontakt ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </div>
            <div className={`space-y-1 md:block ${openSections.kontakt ? 'block' : 'hidden'}`}>
              <div className="flex items-center space-x-3 h-5" data-testid="footer-phone">
                <div className="flex-shrink-0">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-center h-5">
                  <a 
                    href="tel:+48228200220"
                    className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors whitespace-nowrap"
                  >
                    +48 22 820 02 20
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 h-5">
                <div className="flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-center h-5">
                  <a 
                    href="mailto:kontakt@concordialife.pl"
                    className="text-sm text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
                  >
                    kontakt@concordialife.pl
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Godziny pracy */}
          <div className="space-y-2 text-left w-full">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default"
              onClick={() => toggleSection('godziny')}
            >
              <h3 className="text-sm font-bold text-gray-800 mb-2">Godziny pracy</h3>
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
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-gray-800">Infolinia</p>
                  <p className="text-sm text-gray-600">Całodobowo, 7 dni w tygodniu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bezpieczeństwo */}
          <div className="space-y-2 text-left w-full">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default"
              onClick={() => toggleSection('bezpieczenstwo')}
            >
              <h3 className="text-sm font-bold text-gray-800 mb-2">Bezpieczeństwo</h3>
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
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-gray-800">Twoje dane są bezpieczne</p>
                  <p className="text-sm text-gray-600">Szyfrowanie SSL/TLS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
