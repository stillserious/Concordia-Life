import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { DirectionsCar, Warning, Pets, Security } from "@mui/icons-material";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/claim/category-card";

export default function ClaimVehicleACIncidentTypePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={2} 
        totalSteps={5} 
        stepLabels={["Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu", "Informacje o zdarzeniu"]} 
        stepRoutes={["/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data", "/claim/vehicle/ac/incident-info"]}
      />
      
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 category-icon-vehicles rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">AC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">
                  Moje ubezpieczenie (AC)
                </h1>
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
                icon={<DirectionsCar sx={{ fontSize: 16 }} />}
                iconClassName="category-icon-vehicles"
                href="/claim/vehicle/ac/collision-vehicle"
                size="small"
                showButton={false}
              />
              
              <CategoryCard
                category="collision-object"
                title="Zderzenie z przedmiotem"
                description="Kolizja z nieruchomym obiektem jak bariera, słup, ściana, drzewo lub inne przeszkody na drodze."
                icon={<Warning sx={{ fontSize: 16 }} />}
                iconClassName="category-icon-property"
                href="/claim/vehicle/ac/collision-object"
                size="small"
                showButton={false}
              />
              
              <CategoryCard
                category="collision-animal"
                title="Zderzenie ze zwierzęciem"
                description="Kolizja ze zwierzęciem na drodze. Obejmuje zderzenia z dzikimi zwierzętami i zwierzętami domowymi."
                icon={<Pets sx={{ fontSize: 16 }} />}
                iconClassName="category-icon-people"
                href="/claim/vehicle/ac/collision-animal"
                size="small"
                showButton={false}
              />
              
              <CategoryCard
                category="theft-parts"
                title="Kradzież części"
                description="Kradzież elementów pojazdu jak koła, lusterka, katalizator, akcesoria lub inne części samochodu."
                icon={<Security sx={{ fontSize: 16 }} />}
                iconClassName="category-icon-vehicles"
                href="/claim/vehicle/ac/theft-parts"
                size="small"
                showButton={false}
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <Link href="/claim/vehicle/ac">
                <Button variant="outline" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cofnij
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}