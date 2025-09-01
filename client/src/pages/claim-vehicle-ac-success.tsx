
import { useEffect } from 'react';
import { useLocation } from "wouter";
import { CheckCircle, Mail, Phone, FileText } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';

export default function ClaimVehicleACSuccess() {
  const [, setLocation] = useLocation();

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={8} 
        totalSteps={8} 
        stepLabels={["Wybór ubezpieczenia", "Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu", "Informacje o zdarzeniu", "Uszkodzenia pojazdu", "Dokumenty"]} 
        stepRoutes={["/claim/vehicle", "/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data", "/claim/vehicle/ac/incident-info", "/claim/vehicle/ac/damage", "/claim/vehicle/ac/documents"]}
      />
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 category-icon-vehicles rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">AC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">Moje ubezpieczenie</h1>
                <p className="text-gray-600">
                  Zgłoszenie szkody z ubezpieczenia autocasco zostało przesłane.
                </p>
              </div>
            </div>
          </div>

          <div className="insurance-card p-8">
            {/* Success Icon and Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dziękujemy za zgłoszenie szkody
              </h2>
              <p className="text-gray-600 text-lg">
                Twoje zgłoszenie zostało pomyślnie przesłane i jest w trakcie przetwarzania.
              </p>
            </div>

            {/* Claim Number */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Numer sprawy</h3>
              </div>
              <p className="text-2xl font-bold text-blue-700 tracking-wider" data-testid="claim-number">
                PL2025090182764
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Zapisz ten numer - będzie potrzebny do komunikacji w sprawie Twojego zgłoszenia.
              </p>
            </div>

            {/* Information Cards */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              {/* Email Confirmation */}
              <div className="bg-gradient-to-r from-white to-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">E-mail potwierdzający</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Na Twój adres e-mail zostanie wysłane potwierdzenie zgłoszenia wraz ze szczegółami sprawy.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-white to-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Kontakt z ekspertem</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Nasz ekspert skontaktuje się z Tobą w ciągu 48 godzin w celu omówienia dalszych kroków.
                </p>
              </div>
            </div>

            {/* What's Next Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Co dzieje się dalej?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  Otrzymasz e-mail z potwierdzeniem zgłoszenia
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  Ekspert skontaktuje się z Tobą w ciągu 48 godzin
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  Zostanie ustalony termin oględzin pojazdu (jeśli wymagane)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                  Otrzymasz informację o dalszym przebiegu sprawy
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation("/")}
                className="insurance-button"
                data-testid="button-home"
              >
                Wróć do strony głównej
              </Button>
              <Button 
                variant="outline"
                onClick={() => setLocation("/claim/vehicle")}
                data-testid="button-new-claim"
              >
                Zgłoś nową szkodę
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
