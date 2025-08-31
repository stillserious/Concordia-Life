import { Phone, Mail, Clock, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 md:px-6 md:py-6">
        <div className="flex flex-col space-y-6 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 justify-items-center">
          {/* Kontakt */}
          <div className="space-y-3 text-center w-full max-w-xs">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Kontakt</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-3" data-testid="footer-phone">
                <div className="flex-shrink-0">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">606 883 506</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
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
          <div className="space-y-3 text-center w-full max-w-xs">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Godziny pracy</h3>
            <div className="flex items-start justify-center space-x-3">
              <div className="flex-shrink-0">
                <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">Infolinia</p>
                <p className="text-sm text-gray-600">24h/7dni</p>
              </div>
            </div>
          </div>

          {/* Bezpieczeństwo */}
          <div className="space-y-3 text-center w-full max-w-xs">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Bezpieczeństwo</h3>
            <div className="flex items-start justify-center space-x-3">
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
    </footer>
  );
}