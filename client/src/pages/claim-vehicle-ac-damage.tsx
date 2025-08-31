import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "wouter";
import PreciseCarDiagram, { CAR_PARTS, type CarPartName } from "@/components/PreciseCarDiagram";

const damageFormSchema = z.object({
  damagedParts: z.array(z.string()).default([]),
});

type DamageFormData = z.infer<typeof damageFormSchema>;

export default function ClaimVehicleACDamage() {
  const [, setLocation] = useLocation();
  const [selectedParts, setSelectedParts] = useState<Set<CarPartName>>(new Set());

  const form = useForm<DamageFormData>({
    resolver: zodResolver(damageFormSchema),
    defaultValues: {
      damagedParts: [],
    }
  });

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePartSelect = (partName: CarPartName) => {
    const newSelectedParts = new Set(selectedParts);
    if (newSelectedParts.has(partName)) {
      newSelectedParts.delete(partName);
    } else {
      newSelectedParts.add(partName);
    }
    setSelectedParts(newSelectedParts);
    form.setValue('damagedParts', Array.from(newSelectedParts));
  };

  const onSubmit = (data: DamageFormData) => {
    console.log('Damage data:', data);
    // TODO: Zapisz dane i przejdź do kolejnego kroku
    setLocation('/claim/vehicle/ac/summary'); // Następny krok
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <ProgressBar currentStep={6} totalSteps={6} />
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/claim/vehicle/ac/incident-info">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back">
                <ArrowLeft className="h-4 w-4" />
                Cofnij
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Zaznacz uszkodzone części pojazdu
            </h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Instrukcja */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Instrukcja:</strong> Wybierz uszkodzone części samochodu klikając na diagram lub zaznaczając checkboxy po prawej stronie. 
                  Możesz przełączać między widokiem "PRZÓD I LEWY BOK" a "TYŁ I PRAWY BOK" używając przycisków na górze.
                </p>
              </div>

              {/* Interaktywny diagram samochodu */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Interaktywny diagram pojazdu</h2>
                
                <FormField
                  control={form.control}
                  name="damagedParts"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <PreciseCarDiagram 
                          selectedParts={selectedParts}
                          onPartSelect={handlePartSelect}
                          className="min-h-[500px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Lista zaznaczonych części */}
              {selectedParts.size > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Zaznaczone uszkodzenia:</h3>
                  <ul className="list-disc list-inside text-sm text-red-700">
                    {Array.from(selectedParts).map(partName => (
                      <li key={partName}>{CAR_PARTS[partName]}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Przyciski nawigacji */}
              <div className="flex justify-between pt-6">
                <Link href="/claim/vehicle/ac/incident-info">
                  <Button type="button" variant="outline" data-testid="button-previous">
                    Poprzedni krok
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  data-testid="button-next"
                >
                  {isSubmitting ? 'Zapisywanie...' : 'Dalej'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>

      <Footer />
    </div>
  );
}