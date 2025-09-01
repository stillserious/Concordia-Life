
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
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Mobile: Accordion */}
        <div className="md:hidden space-y-6">
          {/* Kontakt Mobile */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer py-3"
              onClick={() => toggleSection('kontakt')}
            >
              <h3 className="text-base font-medium text-gray-900">Kontakt</h3>
              {openSections.kontakt ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
            <div className={`${openSections.kontakt ? 'block' : 'hidden'} space-y-3 pb-4`}>
              <a 
                href="tel:+48228200220"
                className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                data-testid="footer-phone"
              >
                +48 22 820 02 20
              </a>
              <a 
                href="mailto:kontakt@concordialife.pl"
                className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                kontakt@concordialife.pl
              </a>
            </div>
          </div>

          {/* Dostępność Mobile */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer py-3"
              onClick={() => toggleSection('godziny')}
            >
              <h3 className="text-base font-medium text-gray-900">Godziny pracy</h3>
              {openSections.godziny ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
            <div className={`${openSections.godziny ? 'block' : 'hidden'} pb-4`}>
              <p className="text-sm text-gray-600">Całodobowo, 7 dni w tygodniu</p>
            </div>
          </div>
        </div>

        {/* Desktop: Clean horizontal layout */}
        <div className="hidden md:flex md:justify-between md:items-center">
          <div className="flex space-x-16">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Kontakt</h3>
              <div className="space-y-2">
                <a 
                  href="tel:+48228200220"
                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  data-testid="footer-phone"
                >
                  +48 22 820 02 20
                </a>
                <a 
                  href="mailto:kontakt@concordialife.pl"
                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  kontakt@concordialife.pl
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Godziny pracy</h3>
              <p className="text-sm text-gray-600">Całodobowo, 7 dni w tygodniu</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Dane chronione SSL/TLS</span>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-xs text-gray-400">
            © 2025 ConcordiaLife. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
