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
            <Link href="/">
              <Button variant="ghost" className="mb-4" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Powrót do kategorii
              </Button>
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="page-title">
              Zgłoszenie szkody - Pojazdy
            </h1>
            <p className="text-gray-600" data-testid="page-description">
              Wybierz typ ubezpieczenia, z którego chcesz zgłosić szkodę
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryCard
              category="ac"
              title="Moje ubezpieczenie (AC)"
              description="Zgłoś szkodę z własnego ubezpieczenia autocasco. Uszkodzenia własnego pojazdu, kolizje, kradzieże."
              icon={<Shield />}
              iconClassName="category-icon-vehicles"
              href="/claim/vehicle/ac"
            />
            
            <CategoryCard
              category="sprawca"
              title="Ubezpieczenie sprawcy"
              description="Zgłoś szkodę z ubezpieczenia sprawcy zdarzenia. OC sprawcy pokrywa szkody powstałe w wyniku kolizji."
              icon={<FileText />}
              iconClassName="category-icon-property"
              href="/claim/vehicle/sprawca"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
