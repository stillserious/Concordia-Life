import { useState, useEffect } from "react";
import { ArrowLeft, Car } from "lucide-react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const damageFormSchema = z.object({
  damagedParts: z.array(z.string()).min(1, { message: "Wybierz przynajmniej jedną uszkodzoną część" }),
  damageDescription: z.string().optional(),
});

type DamageFormData = z.infer<typeof damageFormSchema>;

declare global {
  interface Window {
    showTooltip: (evt: any, text: string) => void;
    hideTooltip: () => void;
  }
}

export default function ClaimVehicleACDamagePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const form = useForm<DamageFormData>({
    resolver: zodResolver(damageFormSchema),
    defaultValues: {
      damagedParts: [],
      damageDescription: "",
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Listen for messages from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'partSelection') {
        setSelectedParts(event.data.allSelectedParts || []);
        form.setValue('damagedParts', event.data.allSelectedParts || []);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [form]);


  const onSubmit = async (data: DamageFormData) => {
    try {
      console.log("Dane uszkodzeń pojazdu:", data);
      console.log("Wybrane części:", selectedParts);
      
      toast({
        title: "Zgłoszenie zakończone!",
        description: "Twoje zgłoszenie szkody zostało pomyślnie złożone.",
      });
      
    } catch (error) {
      toast({
        title: "Błąd podczas zapisywania",
        description: "Spróbuj ponownie.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={7} 
        totalSteps={7} 
        stepLabels={["Wybór ubezpieczenia", "Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu", "Informacje o zdarzeniu", "Uszkodzenia pojazdu"]} 
        stepRoutes={["/claim/vehicle", "/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data", "/claim/vehicle/ac/incident-info", "/claim/vehicle/ac/damage"]}
      />
      <main className="flex-1 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 category-icon-vehicles rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">AC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">Moje ubezpieczenie</h1>
                <p className="text-gray-600">
                  Zgłaszasz szkodę z ubezpieczenia autocasco.
                </p>
              </div>
            </div>
          </div>

          <div className="insurance-card p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Wskaż uszkodzenia pojazdu
              </h2>
              <p className="text-sm text-gray-600">
                Kliknij na części samochodu, które zostały uszkodzone. Wybrane części zostaną podświetlone.
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-5xl" data-testid="car-diagram">
                <iframe 
                  src="/car-diagram-full.html"
                  className="w-full border-0 rounded-lg"
                  style={{ height: '700px', minHeight: '500px' }}
                  title="Interaktywny diagram samochodu"
                  data-testid="car-diagram-iframe"
                />
              </div>
            </div>

            {selectedParts.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Wybrane części do naprawy:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedParts.map((partId) => (
                    <span key={partId} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {partId.replace(/_/g, ' ').toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="damageDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dodatkowy opis uszkodzeń (opcjonalnie)</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="Opisz szczegóły uszkodzeń, które mogą nie być widoczne na diagramie..."
                          data-testid="damage-description-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/claim/vehicle/ac/incident-info")}
                    type="button"
                    data-testid="back-button"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cofnij
                  </Button>
                  
                  <Button type="submit" className="min-w-32" data-testid="submit-button">
                    Zakończ zgłoszenie
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}