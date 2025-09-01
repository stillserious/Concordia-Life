import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import InteractiveCarDiagram from "@/components/claim/interactive-car-diagram";

const damageFormSchema = z.object({
  damagedParts: z.array(z.string()).min(1, { message: "Wybierz przynajmniej jedną uszkodzoną część pojazdu" }),
  damageDescription: z.string().optional(),
});

type DamageFormData = z.infer<typeof damageFormSchema>;

export default function ClaimVehicleACDamage() {
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
  }, []);

  useEffect(() => {
    form.setValue("damagedParts", selectedParts);
  }, [selectedParts, form]);

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: DamageFormData) => {
    try {
      console.log("Dane uszkodzeń pojazdu:", data);
      
      toast({
        title: "Zgłoszenie wysłane",
        description: "Twoje zgłoszenie szkody zostało pomyślnie wysłane.",
        variant: "default",
      });

      // Po pomyślnym wysłaniu można przekierować do strony podsumowania
      // setLocation("/claim/vehicle/ac/summary");
      
    } catch (error) {
      toast({
        title: "Błąd podczas wysyłania",
        description: "Spróbuj ponownie.",
        variant: "destructive",
      });
    }
  };

  const handlePartToggle = (partId: string) => {
    setSelectedParts(prev => {
      if (prev.includes(partId)) {
        return prev.filter(id => id !== partId);
      } else {
        return [...prev, partId];
      }
    });
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
                Wskaż uszkodzone części pojazdu
              </h2>
              <p className="text-sm text-gray-600">
                Kliknij na diagram samochodu, aby oznaczyć uszkodzone części
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="space-y-6">
                  <InteractiveCarDiagram
                    selectedParts={selectedParts}
                    onPartToggle={handlePartToggle}
                  />
                  
                  {selectedParts.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-2">Wybrane uszkodzone części:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedParts.map((part) => (
                          <span 
                            key={part}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                            data-testid={`selected-part-${part.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {part}
                            <button
                              type="button"
                              onClick={() => handlePartToggle(part)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                              data-testid={`remove-part-${part.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="damageDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            {...field}
                            placeholder="Dodatkowy opis uszkodzeń (opcjonalnie)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={4}
                            data-testid="textarea-damage-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="damagedParts"
                    render={() => (
                      <FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    data-testid="button-back" 
                    onClick={() => setLocation("/claim/vehicle/ac/incident-info")}
                    type="button"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cofnij
                  </button>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || selectedParts.length === 0}
                    className="insurance-button"
                    data-testid="button-submit-damage"
                  >
                    {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
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