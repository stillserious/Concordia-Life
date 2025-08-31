import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CategoryCard from "@/components/claim/category-card";
import { Clock } from "lucide-react";

import pojazdyIcon from "@assets/pojazdy_1756500953737.png";
import majatekIcon from "@assets/Majatek_1756500953736.png";
import ludziIcon from "@assets/ludzie_1756500953736.png";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl w-full text-center mx-auto">
          {/* Welcome Section */}
          <section className="mb-12" data-testid="welcome-section">
            <h1 className="text-2xl font-bold text-gray-900 mb-1.5 leading-tight" data-testid="greeting">
              Witaj w systemie do zgłaszania spraw online. Wybierz, czego dotyczy Twoje zgłoszenie.
            </h1>
            <p className="text-sm text-gray-500 font-light" data-testid="time-estimate">
              Zgłoszenie wniosku zajmie Ci około 10 minut.
            </p>
          </section>

          {/* Categories Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-stretch" data-testid="categories-grid">
            <CategoryCard
              category="pojazdy"
              title="Szkoda pojazdu"
              description="Zgłoś uszkodzenie samochodu, motocykla lub innego pojazdu, np. kolizja, kradzież lub awaria mechaniczna."
              icon={<img src={pojazdyIcon} alt="Kolizja pojazdów" className="w-10 h-10" loading="eager" decoding="async" />}
              iconClassName="category-icon-vehicles"
              href="/claim/vehicle"
            />

            <div className="relative group">
              <CategoryCard
                category="majatek"
                title="Szkoda majątkowa"
                description="Zgłoś szkodę dotyczącą domu, mieszkania lub innego mienia, np. zalanie, pożar, kradzież lub inne zdarzenie losowe."
                icon={<img src={majatekIcon} alt="Lokalizacja z ostrzeżeniem" className="w-10 h-10" loading="eager" decoding="async" />}
                iconClassName="category-icon-property"
                href="#"
              />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed">
                {/* Wyblurowany kafelek w tle */}
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 backdrop-blur-sm rounded-2xl group-hover:opacity-100 opacity-0 transition-opacity duration-200"></div>
                
                {/* Zawartość overlay */}
                <div className="relative bg-white border border-blue-200 p-6 mx-4 text-center rounded-xl shadow-xl max-w-sm">
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

            <div className="relative group">
              <CategoryCard
                category="ludzie"
                title="Życie i zdrowie"
                description="Zgłoś zdarzenie związane z życiem lub zdrowiem Twoim albo bliskiej osoby, np. wypadek, poważne zachorowanie lub śmierć ubezpieczonego."
                icon={<img src={ludziIcon} alt="Ambulans" className="w-10 h-10" loading="eager" decoding="async" />}
                iconClassName="category-icon-people"
                href="#"
              />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-not-allowed">
                {/* Wyblurowany kafelek w tle */}
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 backdrop-blur-sm rounded-2xl group-hover:opacity-100 opacity-0 transition-opacity duration-200"></div>
                
                {/* Zawartość overlay */}
                <div className="relative bg-white border border-blue-200 p-6 mx-4 text-center rounded-xl shadow-xl max-w-sm">
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
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}