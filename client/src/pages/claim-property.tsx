import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function ClaimPropertyPage() {
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
              Zgłoszenie szkody - Majątek
            </h1>
            <p className="text-gray-600" data-testid="page-description">
              Wypełnij formularz aby zgłosić szkodę majątkową
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4" data-testid="form-placeholder-title">
                Formularz w budowie
              </h2>
              <p className="text-gray-600 mb-8" data-testid="form-placeholder-description">
                Tutaj będzie znajdować się formularz zgłoszenia szkody majątkowej z wszystkimi niezbędnymi polami.
              </p>
              <Link href="/">
                <Button data-testid="button-return">
                  Wróć do strony głównej
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
