import { useEffect } from "react";
import { CheckCircle, Mail, Clock, Home } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ClaimVehicleACConfirmation() {
  const [, setLocation] = useLocation();

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Generuj numer sprawy
  const claimNumber = `PL2025090182764`;

  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar
        currentStep={9}
        totalSteps={8}
        stepLabels={[
          "Wybór ubezpieczenia",
          "Podstawowe dane",
          "Typ zdarzenia",
          "Szczegóły zdarzenia",
          "Dane pojazdu",
          "Informacje o zdarzeniu",
          "Uszkodzenia pojazdu",
          "Dokumenty",
        ]}
        stepRoutes={[
          "/claim/vehicle",
          "/claim/vehicle/ac",
          "/claim/vehicle/ac/incident-type",
          "/claim/vehicle/ac/collision-vehicle",
          "/claim/vehicle/ac/vehicle-data",
          "/claim/vehicle/ac/incident-info",
          "/claim/vehicle/ac/damage",
          "/claim/vehicle/ac/documents",
        ]}
        isCompleted={true}
      />
      <main className="flex-1 py-6 md:py-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="insurance-card p-6 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-8 md:mb-10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg">
                <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Dziękujemy za zgłoszenie!
              </h2>

              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-md mx-auto px-4">
                Twój wniosek został pomyślnie przesłany i wkrótce się nim
                zajmiemy
              </p>
            </div>

            {/* Claim Number Card */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Numer Twojej sprawy
              </h3>
              <div className="text-xl md:text-2xl font-bold text-blue-900 tracking-wider break-all">
                {claimNumber}
              </div>
              <p className="text-xs md:text-sm text-blue-700 mt-2">
                Nie musisz go zapisywać - otrzymasz go w wiadomości e-mail,
                którą do Ciebie wysłaliśmy
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="bg-slate-50 rounded-lg p-4 md:p-6 text-left">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">
                      E-mail z potwierdzeniem
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Na Twój adres e-mail wysłaliśmy szczegóły zgłoszenia wraz
                      z numerem sprawy
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 md:p-6 text-left">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">
                      Dalsze kroki
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Skontaktujemy się z Tobą{" "}
                      <strong>w ciągu 48 godzin</strong> w sprawie kolejnych
                      etapów wniosku
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 md:pt-4">
              <Button
                onClick={() => setLocation("/")}
                className="insurance-button px-4 md:px-8 py-2 md:py-3 text-sm md:text-lg max-w-full"
                data-testid="button-home"
              >
                <Home className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                <span className="truncate">Wróć do strony głównej</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
