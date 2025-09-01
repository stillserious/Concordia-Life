import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import clockIcon from "@assets/clock_1756748401326.png";
import collisionVehicleIcon from "@assets/zderzenie z pojazdem_1756675500604.png";
import collisionObjectIcon from "@assets/zderzenie z przedmiotem_1756675500604.png";
import collisionAnimalIcon from "@assets/zderzenie ze zwierzeciem_1756675500602.png";
import theftPartsIcon from "@assets/kradziez czesci_1756675500603.png";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/claim/category-card";

export default function ClaimVehicleACIncidentTypePage() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={3} 
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
                  Zgłaszasz szkodę z ubezpieczenia autocasco.
                </p>
              </div>
            </div>
          </div>

          <div className="insurance-card p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Jaki typ zdarzenia chcesz zgłosić?
              </h2>
              <p className="text-sm text-gray-600">
                Wybierz opcję, która najlepiej opisuje Twoje zdarzenie
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryCard
                category="collision-vehicle"
                title="Zderzenie z pojazdem w ruchu"
                description="Kolizja z innym pojazdem podczas jazdy. Obejmuje zderzenia na skrzyżowaniach, wyprzedzaniu i innych sytuacjach drogowych."
                icon={<img src={collisionVehicleIcon} alt="Zderzenie z pojazdem" className="w-10 h-10" />}
                iconClassName="category-icon-vehicles"
                href="/claim/vehicle/ac/collision-vehicle"
                size="small"
                showButton={false}
              />
              
              <div className="relative group">
                <CategoryCard
                  category="collision-object"
                  title="Zderzenie z przedmiotem"
                  description="Kolizja z nieruchomym obiektem jak bariera, słup, ściana, drzewo lub inne przeszkody na drodze."
                  icon={<img src={collisionObjectIcon} alt="Zderzenie z przedmiotem" className="w-10 h-10" />}
                  iconClassName="category-icon-property"
                  href="#"
                  size="small"
                  showButton={false}
                />
                {/* Blur - pojawia się od razu */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100"></div>
                
                {/* Overlay z treścią */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed transition-all duration-500 ease-out">
                  {/* Zawartość overlay */}
                  <div className="relative bg-gradient-to-br from-white via-purple-50 to-blue-100 border-2 border-purple-300 p-4 mx-2 text-center rounded-xl shadow-xl max-w-xs transform group-hover:scale-100 scale-95 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full flex items-center justify-center shadow transform group-hover:rotate-6 transition-transform duration-500">
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
              
              <div className="relative group">
                <CategoryCard
                  category="collision-animal"
                  title="Zderzenie ze zwierzęciem"
                  description="Kolizja ze zwierzęciem na drodze. Obejmuje zderzenia z dzikimi zwierzętami i zwierzętami domowymi."
                  icon={<img src={collisionAnimalIcon} alt="Zderzenie ze zwierzęciem" className="w-10 h-10" />}
                  iconClassName="category-icon-people"
                  href="#"
                  size="small"
                  showButton={false}
                />
                {/* Blur - pojawia się od razu */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100"></div>
                
                {/* Overlay z treścią */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed transition-all duration-500 ease-out">
                  {/* Zawartość overlay */}
                  <div className="relative bg-gradient-to-br from-white via-purple-50 to-blue-100 border-2 border-purple-300 p-4 mx-2 text-center rounded-xl shadow-xl max-w-xs transform group-hover:scale-100 scale-95 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full flex items-center justify-center shadow transform group-hover:rotate-6 transition-transform duration-500">
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
              
              <div className="relative group">
                <CategoryCard
                  category="theft-parts"
                  title="Kradzież części"
                  description="Kradzież elementów pojazdu jak koła, lusterka, katalizator, akcesoria lub inne części samochodu."
                  icon={<img src={theftPartsIcon} alt="Kradzież części" className="w-10 h-10" />}
                  iconClassName="category-icon-vehicles"
                  href="#"
                  size="small"
                  showButton={false}
                />
                {/* Blur - pojawia się od razu */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100"></div>
                
                {/* Overlay z treścią */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed transition-all duration-500 ease-out">
                  {/* Zawartość overlay */}
                  <div className="relative bg-gradient-to-br from-white via-purple-50 to-blue-100 border-2 border-purple-300 p-4 mx-2 text-center rounded-xl shadow-xl max-w-xs transform group-hover:scale-100 scale-95 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-cyan-200 rounded-full flex items-center justify-center shadow transform group-hover:rotate-6 transition-transform duration-500">
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

            <div className="flex items-center justify-end gap-4 pt-4">
              <button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                data-testid="button-back" 
                onClick={() => setLocation("/claim/vehicle/ac")}
                onTouchStart={() => setLocation("/claim/vehicle/ac")}
                type="button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cofnij
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}