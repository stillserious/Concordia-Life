import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategoryCard from "@/components/claim/category-card";
import carIcon from "@assets/car_1756497973001.png";
import homeIcon from "@assets/home_1756497973002.png";
import shieldIcon from "@assets/shield_1756497973002.png";

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
              icon={<img src={carIcon} alt="Samochód" className="w-6 h-6" />}
              iconClassName="category-icon-vehicles"
              href="/claim/vehicle"
            />
            
            <CategoryCard
              category="majatek"
              title="Majątek"
              description="Zgłoś szkodę dotyczącą domu, mieszkania, sprzętu RTV, AGD lub innego mienia. Obejmujemy zalania, pożary i kradzieże."
              icon={<img src={homeIcon} alt="Dom" className="w-6 h-6" />}
              iconClassName="category-icon-property"
              href="/claim/property"
            />
            
            <CategoryCard
              category="ludzie"
              title="Ludzie"
              description="Zgłoś szkodę dotyczącą życia lub zdrowia Twojego lub członka rodziny. Wypadki, choroby i inne zdarzenia ubezpieczeniowe."
              icon={<img src={shieldIcon} alt="Tarcza" className="w-6 h-6" />}
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
