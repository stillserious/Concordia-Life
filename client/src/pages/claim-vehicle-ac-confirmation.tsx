import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
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
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 category-icon-vehicles rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">AC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">Moje ubezpieczenie</h1>
                <p className="text-gray-600">
                  Zgłaszasz szkodę z ubezpieczenia autocasco.
                </p>
              </div>
            </div>
          </div>

          <div className="insurance-card p-8 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Dziękujemy za zgłoszenie
              </h2>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  <strong>Twój numer sprawy: <span className="text-blue-600">{claimNumber}</span></strong>
                </p>
                
                <p>
                  Potwierdzenie i numer zgłoszenia znajdziesz również w e-mailu, który do Ciebie wysłaliśmy.
                </p>
                
                <p className="font-medium">
                  Skontaktujemy się z Tobą w ciągu 48h
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                onClick={() => setLocation("/")}
                className="insurance-button"
                data-testid="button-home"
              >
                Wróć do strony głównej
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}