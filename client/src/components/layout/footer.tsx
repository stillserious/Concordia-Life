
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
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 md:px-6 md:py-6">
        <div className="flex flex-col space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0 md:justify-items-start md:max-w-4xl md:mx-auto">
          {/* Kontakt */}
          <div className="space-y-3 text-left w-full">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default"
              onClick={() => toggleSection('kontakt')}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Kontakt</h3>
              <div className="md:hidden">
                {openSections.kontakt ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </div>
            <div className={`space-y-2 md:block ${openSections.kontakt ? 'block' : 'hidden'}`}>
              <div className="flex items-center space-x-3" data-testid="footer-phone">
                <div className="flex-shrink-0">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">606 302 302</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700">kontakt@concordialife.pl</p>
                </div>
              </div>
            </div>
          </div>

          {/* Godziny pracy */}
          <div className="space-y-3 text-left w-full">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default"
              onClick={() => toggleSection('godziny')}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Godziny pracy</h3>
              <div className="md:hidden">
                {openSections.godziny ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </div>
            <div className={`md:block ${openSections.godziny ? 'block' : 'hidden'}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Infolinia</p>
                  <p className="text-sm text-gray-600">24h/7dni</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bezpieczeństwo */}
          <div className="space-y-3 text-left w-full">
            <div 
              className="flex justify-between items-center md:justify-start cursor-pointer md:cursor-default"
              onClick={() => toggleSection('bezpieczenstwo')}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Bezpieczeństwo</h3>
              <div className="md:hidden">
                {openSections.bezpieczenstwo ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </div>
            </div>
            <div className={`md:block ${openSections.bezpieczenstwo ? 'block' : 'hidden'}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Dane bezpieczne</p>
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
