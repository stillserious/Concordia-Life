import { Phone, Mail, Clock, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kontakt */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Kontakt</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start space-x-3" data-testid="footer-phone">
                <div className="flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">606 883 506</p>
                  <p className="text-xs text-gray-600"></p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700">kontakt@concordialife.pl</p>
                </div>
              </div>
            </div>
          </div>

          {/* Godziny pracy */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Godziny pracy</h3>
            <div className="flex items-start justify-center md:justify-start space-x-3">
              <div className="flex-shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">Infolinia</p>
                <p className="text-sm text-gray-600">24 godziny na dobę, 7 dni w tygodniu</p>
                <p className="text-sm text-gray-600"></p>
              </div>
            </div>
          </div>

          {/* Bezpieczeństwo */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Bezpieczeństwo</h3>
            <div className="flex items-start justify-center md:justify-start space-x-3">
              <div className="flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">Twoje dane są bezpieczne</p>
                <p className="text-sm text-gray-600">Szyfrowanie SSL/TLS</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
}