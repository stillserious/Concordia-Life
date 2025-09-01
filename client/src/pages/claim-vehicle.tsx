import { ArrowLeft, Shield, FileText } from "lucide-react";
import { Link, useLocation } from "wouter";
import clockIcon from "@assets/clock_1756748401326.png";
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
    "Szczegóły zdarzenia",
    "Dane pojazdu",
    "Informacje o zdarzeniu",
    "Uszkodzenia pojazdu",
    "Dokumenty"
  ];
  
  const stepRoutes = [
    "/claim/vehicle",
    "/claim/vehicle/ac",
    "/claim/vehicle/ac/incident-type", 
    "/claim/vehicle/ac/collision-vehicle",
    "/claim/vehicle/ac/vehicle-data",
    "/claim/vehicle/ac/incident-info",
    "/claim/vehicle/ac/damage",
    "/claim/vehicle/ac/documents"
  ];
  
  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      
      <ProgressBar 
        currentStep={1}
        totalSteps={8}
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
              {/* Blur - pojawia się od razu */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Overlay z treścią */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed transition-all duration-300 ease-out">
                {/* Zawartość overlay */}
                <div className="relative bg-gradient-to-br from-white via-purple-50 to-blue-100 border-2 border-purple-300 p-4 mx-2 text-center rounded-xl shadow-xl max-w-xs transform group-hover:scale-100 scale-95 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full flex items-center justify-center shadow transform group-hover:rotate-6 transition-transform duration-300">
                      <img src={clockIcon} alt="Zegar" className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    Formularz tymczasowo niedostępny
                  </h3>
                  <a 
                    href="tel:+48228200220"
                    className="inline-flex items-center justify-center px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded text-xs font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    📞 Zadzwoń teraz
                  </a>
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
