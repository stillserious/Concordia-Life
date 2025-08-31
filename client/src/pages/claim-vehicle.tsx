import { ArrowLeft, Shield, FileText, Clock } from "lucide-react";
import { Link, useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/claim/category-card";
import ProgressBar from "@/components/ui/progress-bar";

export default function ClaimVehiclePage() {
  const [, setLocation] = useLocation();
  
  const stepLabels = [
    "Wybór ubezpieczenia",
    "Podstawowe dane", 
    "Typ zdarzenia",
    "Dane pojazdu",
    "Informacje o zdarzeniu"
  ];
  
  const stepRoutes = [
    "/claim/vehicle",
    "/claim/vehicle/ac",
    "/claim/vehicle/ac/incident-type", 
    "/claim/vehicle/ac/vehicle-data",
    "/claim/vehicle/ac/incident-info"
  ];
  
  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      
      <ProgressBar 
        currentStep={1}
        totalSteps={5}
        stepLabels={stepLabels}
        stepRoutes={stepRoutes}
      />
      
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" data-testid="page-title">
              Zgłoszenie szkody pojazdu
            </h1>
            <p className="text-gray-600" data-testid="page-description">
              Wybierz typ ubezpieczenia, z którego chcesz zgłosić szkodę.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <CategoryCard
              category="ac"
              title="Moje ubezpieczenie"
              description="Zgłoś szkodę z własnego ubezpieczenia. Ubezpieczenie pokrywa uszkodzenia pojazdu, kolizje oraz kradzieże."
              icon={<span className="text-2xl font-bold text-black">AC</span>}
              iconClassName="category-icon-vehicles"
              href="/claim/vehicle/ac"
            />
            
            <div className="relative group">
              <CategoryCard
                category="sprawca"
                title="Ubezpieczenie sprawcy"
                description="Zgłoś szkodę z ubezpieczenia sprawcy zdarzenia. OC sprawcy pokrywa szkody powstałe w wyniku kolizji."
                icon={<span className="text-2xl font-bold text-black">OC</span>}
                iconClassName="category-icon-property"
                href="#"
              />
              <div className="absolute inset-0 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-not-allowed">
                <div className="bg-blue-50 border border-blue-200 p-6 mx-4 text-center rounded-xl shadow-lg max-w-sm">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-blue-900 mb-2">
                    Formularz tymczasowo niedostępny
                  </h3>
                  <p className="text-sm text-blue-700">
                    Skontaktuj się z nami telefonicznie
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              data-testid="button-back" 
              onClick={() => {
                setLocation("/");
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
              }}
              onTouchStart={() => {
                setLocation("/");
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
              }}
              type="button"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cofnij
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
