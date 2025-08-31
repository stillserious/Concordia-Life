import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategoryCard from "@/components/claim/category-card";

import pojazdyIcon from "@assets/pojazdy_1756500953737.png";
import majatekIcon from "@assets/Majatek_1756500953736.png";
import ludziIcon from "@assets/ludzie_1756500953736.png";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-10 px-6">
        <div className="max-w-5xl w-full text-center">
          {/* Welcome Section */}
          <section className="mb-12" data-testid="welcome-section">
            <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 leading-tight" data-testid="greeting">
              Witaj w systemie do zgłaszania spraw online. Wybierz, czego dotyczy Twoje zgłoszenie.
            </h1>
            <p className="text-sm text-gray-500 font-light" data-testid="time-estimate">
              Zajmie Ci to około 10 minut.
            </p>
          </section>
          
          {/* Categories Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 items-stretch" data-testid="categories-grid">
            <CategoryCard
              category="pojazdy"
              title="Pojazdy"
              description="Zgłoś szkodę uszkodzonego samochodu, motocykla lub innego pojazdu. Obsługujemy kolizje, kradzieże i uszkodzenia mechaniczne."
              icon={<img src={pojazdyIcon} alt="Kolizja pojazdów" className="w-8 h-8" />}
              iconClassName="category-icon-vehicles"
              href="/claim/vehicle"
            />
            
            <div className="relative group">
              <CategoryCard
                category="majatek"
                title="Majątek"
                description="Zgłoś szkodę dotyczącą domu, mieszkania, sprzętu RTV, AGD lub innego mienia. Obsługujemy zalania, pożary i kradzieże."
                icon={<img src={majatekIcon} alt="Lokalizacja z ostrzeżeniem" className="w-8 h-8" />}
                iconClassName="category-icon-property"
                href="#"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-not-allowed">
                <div className="bg-white rounded-lg p-4 m-4 text-center shadow-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Formularz tymczasowo niedostępny
                  </p>
                  <p className="text-xs text-gray-600">
                    Przepraszamy za niedogodności
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <CategoryCard
                category="ludzie"
                title="Ludzie"
                description="Zgłoś szkodę dotyczącą życia lub zdrowia Twojego lub członka rodziny. Obsługujemy wypadki, choroby i inne zdarzenia ubezpieczeniowe."
                icon={<img src={ludziIcon} alt="Ambulans" className="w-10 h-10" />}
                iconClassName="category-icon-people"
                href="#"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-not-allowed">
                <div className="bg-white rounded-lg p-4 m-4 text-center shadow-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Formularz tymczasowo niedostępny
                  </p>
                  <p className="text-xs text-gray-600">
                    Przepraszamy za niedogodności
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
