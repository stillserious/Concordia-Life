import { useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import collisionVehicleIcon from "@assets/zderzenie z pojazdem_1756754991398.png";
import collisionObjectIcon from "@assets/zderzenie z przedmiotem_1756754991398.png";
import collisionAnimalIcon from "@assets/zderzenie ze zwierzeciem_1756754991397.png";
import theftPartsIcon from "@assets/kradziez czesci_1756754991398.png";
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
              <div className="w-12 h-12 category-icon-vehicles bg-[#262222] rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-[#cbcbf5]">AC</span>
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
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/30 backdrop-blur-sm rounded-lg group-hover:opacity-100 opacity-0 transition-opacity duration-200"></div>
                  <div className="relative bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 p-4 mx-2 text-center rounded-2xl shadow-2xl max-w-xs">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-2">
                      Formularz tymczasowo niedostępny
                    </h3>
                    <p className="text-xs text-gray-600">
                      Przepraszamy za niedogodności
                    </p>
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
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/30 backdrop-blur-sm rounded-lg group-hover:opacity-100 opacity-0 transition-opacity duration-200"></div>
                  <div className="relative bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 p-4 mx-2 text-center rounded-2xl shadow-2xl max-w-xs">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-2">
                      Formularz tymczasowo niedostępny
                    </h3>
                    <p className="text-xs text-gray-600">
                      Przepraszamy za niedogodności
                    </p>
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
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/30 backdrop-blur-sm rounded-lg group-hover:opacity-100 opacity-0 transition-opacity duration-200"></div>
                  <div className="relative bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 p-4 mx-2 text-center rounded-2xl shadow-2xl max-w-xs">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-2">
                      Formularz tymczasowo niedostępny
                    </h3>
                    <p className="text-xs text-gray-600">
                      Przepraszamy za niedogodności
                    </p>
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