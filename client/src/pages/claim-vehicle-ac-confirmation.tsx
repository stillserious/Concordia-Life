import { useEffect } from "react";
import { CheckCircle, Mail, Clock, Home } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { useLocation } from "wouter";

export default function ClaimVehicleACConfirmation() {
  const [, setLocation] = useLocation();

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Generuj numer sprawy
  const claimNumber = `PL2025090182764`;

  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={9} 
        totalSteps={8} 
        stepLabels={["Wybór ubezpieczenia", "Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu", "Informacje o zdarzeniu", "Uszkodzenia pojazdu", "Dokumenty"]} 
        stepRoutes={["/claim/vehicle", "/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data", "/claim/vehicle/ac/incident-info", "/claim/vehicle/ac/damage", "/claim/vehicle/ac/documents"]}
        isCompleted={true}
      />
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="insurance-card p-12 text-center">
            {/* Success Icon */}
            <div className="mb-10">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Dziękujemy za zgłoszenie!</h2>
              
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Twoje zgłoszenie zostało pomyślnie przesłane i znajduje się w naszym systemie
              </p>
            </div>

            {/* Claim Number Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-8 border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Numer Twojej sprawy</h3>
              <div className="text-2xl font-bold text-blue-900 tracking-wider">
                {claimNumber}
              </div>
              <p className="text-sm text-blue-700 mt-2">Nie musisz go zapisywać, otrzymasz go w mailu który wysłaliśmy do Ciebie</p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-50 rounded-lg p-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">E-mail z potwierdzeniem</h4>
                    <p className="text-sm text-gray-600">
                      Na Twój adres e-mail wysłaliśmy szczegóły zgłoszenia wraz z numerem sprawy
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Szybka reakcja</h4>
                    <p className="text-sm text-gray-600">
                      Skontaktujemy się z Tobą <strong>w ciągu 48 godzin</strong> w sprawie dalszych kroków
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button 
                onClick={() => setLocation("/")}
                className="insurance-button px-8 py-3 text-lg"
                data-testid="button-home"
              >
                <Home className="w-5 h-5 mr-2" />
                Wróć do strony głównej
              </Button>
            </div>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Masz pytania? Skontaktuj się z nami, podając numer sprawy: <strong>{claimNumber}</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}