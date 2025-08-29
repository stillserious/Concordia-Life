import { Car, Building, Shield } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategoryCard from "@/components/claim/category-card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-10 px-6">
        <div className="max-w-5xl w-full text-center">
          {/* Welcome Section */}
          <section className="mb-12" data-testid="welcome-section">
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 leading-tight" data-testid="greeting">
              Dzień dobry,<br />
              wybierz jedną z kategorii, aby kontynuować zgłoszenie szkody
            </h1>
            <p className="text-lg text-gray-600 mb-2" data-testid="subtitle">
              Proste i szybkie zgłoszenie online
            </p>
            <p className="text-sm text-gray-500 font-light" data-testid="time-estimate">
              Proces zajmie około 10 minut
            </p>
          </section>
          
          {/* Categories Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12" data-testid="categories-grid">
            <CategoryCard
              category="pojazdy"
              title="Pojazdy"
              description="Zgłoś szkodę uszkodzonego samochodu, motocykla lub innego pojazdu. Obsługujemy kolizje, kradzieże i uszkodzenia mechaniczne."
              icon={<Car />}
              iconClassName="category-icon-vehicles"
              href="/claim/vehicle"
            />
            
            <CategoryCard
              category="majatek"
              title="Majątek"
              description="Zgłoś szkodę dotyczącą domu, mieszkania, sprzętu RTV, AGD lub innego mienia. Obejmujemy zalania, pożary i kradzieże."
              icon={<Building />}
              iconClassName="category-icon-property"
              href="/claim/property"
            />
            
            <CategoryCard
              category="ludzie"
              title="Ludzie"
              description="Zgłoś szkodę dotyczącą życia lub zdrowia Twojego lub członka rodziny. Wypadki, choroby i inne zdarzenia ubezpieczeniowe."
              icon={<Shield />}
              iconClassName="category-icon-people"
              href="/claim/people"
            />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
