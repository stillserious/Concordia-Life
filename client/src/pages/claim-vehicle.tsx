import { ArrowLeft, Shield, FileText } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/claim/category-card";

export default function ClaimVehiclePage() {
  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="page-title">
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
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-not-allowed">
                <div className="bg-orange-100 p-4 my-4 text-center shadow-lg w-full">
                  <p className="text-sm font-medium text-black mb-1">
                    Formularz tymczasowo niedostępny
                  </p>
                  <p className="text-xs text-black">
                    Skontaktuj się z nami telefonicznie
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button variant="outline" className="hover:border-black focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Powrót do kategorii
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
