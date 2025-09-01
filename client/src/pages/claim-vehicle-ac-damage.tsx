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

// Mapowanie angielskich ID części na polskie nazwy
const partTranslations: Record<string, string> = {
  'SPARE_REAR_WHEEL': 'zapasowe tylne koło',
  'ROOF': 'dach',
  'FRONT_REAR_WINDOW': 'tylna szyba',
  'FRONT_WINDSCREEN': 'przednia szyba',
  'RIGHT_SIDE_DRIVER_DOOR': 'prawe drzwi kierowcy',
  'LEFT_SIDE_DRIVER_DOOR': 'lewe drzwi kierowcy',
  'LEFT_SIDE_PASSENGER_DOOR': 'lewe drzwi pasażera',
  'RIGHT_SIDE_PASSENGER_DOOR': 'prawe drzwi pasażera',
  'LEFT_SIDE_FRONT_WHEEL': 'lewe przednie koło',
  'RIGHT_SIDE_FRONT_WHEEL': 'prawe przednie koło',
  'LEFT_SIDE_REAR_WHEEL': 'lewe tylne koło',
  'RIGHT_SIDE_REAR_WHEEL': 'prawe tylne koło',
  'FRONT_LEFT_SIDE_HEADLAMP': 'przedni lewy reflektor',
  'FRONT_RIGHT_SIDE_HEADLAMP': 'przedni prawy reflektor',
  'LEFT_INNER_TAIL_LIGHT': 'lewe wewnętrzne światło tylne',
  'LEFT_OUTER_TAIL_LIGHT': 'lewe zewnętrzne światło tylne',
  'RIGHT_INNER_TAIL_LIGHT': 'prawe wewnętrzne światło tylne',
  'RIGHT_OUTER_TAIL_LIGHT': 'prawe zewnętrzne światło tylne',
  'FRONT_BONNET': 'przednia maska',
  'REAR_BONNET': 'tylna klapa',
  'FRONT_BUMPERS': 'przednie zderzaki',
  'REAR_BUMPERS': 'tylne zderzaki',
  'LEFT_SIDE_FENDER': 'lewy błotnik',
  'RIGHT_SIDE_FENDER': 'prawy błotnik',
  'FRONT_LEFT_SIDE_WHEEL_ARCH': 'przednie lewe nadkole',
  'FRONT_RIGHT_SIDE_WHEEL_ARCH': 'przednie prawe nadkole',
  'REAR_LEFT_SIDE_WHEEL_ARCH': 'tylne lewe nadkole',
  'REAR_RIGHT_SIDE_WHEEL_ARCH': 'tylne prawe nadkole',
  'LEFT_SIDE_WING_MIRROR': 'lewe lusterko boczne',
  'RIGHT_SIDE_WING_MIRROR': 'prawe lusterko boczne',
  'LEFT_SIDE_DRIVER_WINDOW': 'lewe okno kierowcy',
  'RIGHT_SIDE_DRIVER_WINDOW': 'prawe okno kierowcy',
  'LEFT_SIDE_PASSENGER_WINDOW': 'lewe okno pasażera',
  'RIGHT_SIDE_PASSENGER_WINDOW': 'prawe okno pasażera',
  'FRONT_GRILL': 'przednia kratka',
  'LEFT_QUATER_PANEL': 'lewy panel ćwiartkowy',
  'RIGHT_QUATER_PANEL': 'prawy panel ćwiartkowy',
  'TOP_QUATER_PANEL': 'górny panel ćwiartkowy',
  'LEFT_SIDE_ROCKER_PANEL': 'lewy próg',
  'RIGHT_SIDE_ROCKER_PANEL': 'prawy próg',
  'EXHAUST_TIPS': 'końcówki wydęchu',
  'SUN_MOON_ROOF': 'szyberdach',
  'LEFT_SIDE_A_PILLAR': 'lewy słupek A',
  'RIGHT_SIDE_A_PILLAR': 'prawy słupek A',
  'LEFT_SIDE_B_PILLAR': 'lewy słupek B',
  'RIGHT_SIDE_B_PILLAR': 'prawy słupek B',
  'FIREWALL': 'gródź ogniowa',
  'LEFT_FRONT_DRL_FOG_LIGHT': 'lewe przednie światła DRL / przeciwmgielne',
  'RIGHT_FRONT_DRL_FOG_LIGHT': 'prawe przednie światła DRL / przeciwmgielne',
  'LEFT_SIDE_REAR_MARKERS': 'lewe tylne światła',
  'RIGHT_SIDE_REAR_MARKERS': 'prawe tylne światła',
  'BODY_TRIM': 'listwy nadwozia',
  'FRONT_APRON_SPOILER': 'przedni fartuch / spojler',
  'REAR_DIFFUSER': 'tylny dyfuzor',
  'LEFT_SIDE_ROOF_RAILS': 'lewe relingi dachowe',
  'RIGHT_SIDE_ROOF_RAILS': 'prawe relingi dachowe',
  'LEFT_SIDE_DRIVER_HANDLE': 'lewa klamka kierowcy',
  'RIGHT_SIDE_DRIVER_HANDLE': 'prawa klamka kierowcy',
  'LEFT_SIDE_PASSENGER_HANDLE': 'lewa klamka pasażera',
  'RIGHT_SIDE_PASSENGER_HANDLE': 'prawa klamka pasażera',
  'LEFT_SIDE_FRONT_TYPE': 'lewy typ przedni',
  'RIGHT_SIDE_FRONT_TYPE': 'prawy typ przedni',
  'LEFT_SIDE_REAR_TYPE': 'lewy typ tylny',
  'RIGHT_SIDE_REAR_TYPE': 'prawy typ tylny',
  'SPARE_REAR_TYPE': 'zapasowy typ tylny',
  'RREAR_NUMBER_PLATE': 'tylna tablica rejestracyjna',
  'REAR_NUMBER_PLATE': 'tylna tablica rejestracyjna'
};

// Funkcja tłumacząca ID części na polską nazwę
const translatePartName = (partId: string): string => {
  return partTranslations[partId] || partId.replace(/_/g, ' ').toLowerCase();
};

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
                  className="w-full border-0 rounded-lg md:h-[450px] h-[280px]"
                  style={{ minHeight: '250px' }}
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
                      {translatePartName(partId)}
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
                          placeholder="Opisz szczegóły uszkodzeń, które mogą nie być widoczne na modelu."
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