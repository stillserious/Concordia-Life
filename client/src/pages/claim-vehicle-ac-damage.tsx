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

// Polskie nazwy części samochodu
const CAR_PARTS = {
  'blotnik-tylny-lewy': 'Błotnik tylny lewy',
  'blotnik-przedni-lewy': 'Błotnik przedni lewy', 
  'chlodnica': 'Chłodnica',
  'dach': 'Dach',
  'drzwi-przednie-lewe': 'Drzwi przednie lewe',
  'drzwi-tylne-lewe': 'Drzwi tylne lewe',
  'kolo-przednie-lewe': 'Koło przednie lewe',
  'kolo-tylne-lewe': 'Koło tylne lewe',
  'krata-wlotu-powietrza': 'Krata wlotu powietrza',
  'lampa-tylna-lewa': 'Lampa tylna lewa',
  'listwa-drzwi-przednich-lewych': 'Listwa drzwi przednich lewych',
  'listwa-drzwi-tylnych-lewych': 'Listwa drzwi tylnych lewych',
  'lusterko-lewe': 'Lusterko lewe',
  'pas-przedni': 'Pas przedni',
  'podluznica-przednia-lewa': 'Podłużnica przednia lewa',
  'pokrywa-przednia': 'Pokrywa przednia',
  'prog-lewy': 'Próg lewy',
  'reflektor-przedni-lewy': 'Reflektor przedni lewy',
  'silnik': 'Silnik',
  'szyba-czolowa': 'Szyba czołowa',
  'szyba-drzwi-przednich-lewych': 'Szyba drzwi przednich lewych',
  'szyba-drzwi-tylnych-lewych': 'Szyba drzwi tylnych lewych',
  'slupek-przedni-lewy': 'Słupek przedni lewy',
  'slupek-srodkowy-lewy': 'Słupek środkowy lewy',
  'zawieszenie-przednie': 'Zawieszenie przednie',
  'zderzak-przedni': 'Zderzak przedni'
} as const;

const damageFormSchema = z.object({
  damagedParts: z.array(z.string()).default([]),
});

type DamageFormData = z.infer<typeof damageFormSchema>;

export default function ClaimVehicleACDamage() {
  const [, setLocation] = useLocation();
  const [selectedParts, setSelectedParts] = useState<Set<string>>(new Set());

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

  const handlePartClick = (partId: string) => {
    const newSelectedParts = new Set(selectedParts);
    if (newSelectedParts.has(partId)) {
      newSelectedParts.delete(partId);
    } else {
      newSelectedParts.add(partId);
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
                  <strong>Instrukcja:</strong> Kliknij na części samochodu, które zostały uszkodzone podczas zdarzenia. 
                  Wybrane części będą oznaczone na czerwono. Możesz zaznaczyć lub odznaczyć części klikając na nie ponownie.
                </p>
              </div>

              {/* Diagram samochodu */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Diagram pojazdu</h2>
                
                <FormField
                  control={form.control}
                  name="damagedParts"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          {/* SVG Car Diagram */}
                          <svg 
                            viewBox="0 0 800 400" 
                            className="w-full h-auto max-w-4xl mx-auto"
                            style={{ minHeight: '400px' }}
                          >
                            {/* Tło samochodu */}
                            <rect x="50" y="100" width="700" height="200" fill="#e5e7eb" stroke="#374151" strokeWidth="2" rx="20"/>
                            
                            {/* Pokrywa przednia (maska) */}
                            <rect 
                              id="pokrywa-przednia"
                              x="50" y="120" width="120" height="160" 
                              fill={selectedParts.has('pokrywa-przednia') ? '#ef4444' : '#d1d5db'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('pokrywa-przednia')}
                              data-testid="part-pokrywa-przednia"
                            />
                            <text x="110" y="205" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Pokrywa przednia
                            </text>

                            {/* Zderzak przedni */}
                            <rect 
                              id="zderzak-przedni"
                              x="20" y="150" width="40" height="100" 
                              fill={selectedParts.has('zderzak-przedni') ? '#ef4444' : '#d1d5db'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('zderzak-przedni')}
                              data-testid="part-zderzak-przedni"
                            />
                            <text x="40" y="195" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Zderzak
                            </text>

                            {/* Reflektor przedni lewy */}
                            <circle 
                              id="reflektor-przedni-lewy"
                              cx="80" cy="140" r="15" 
                              fill={selectedParts.has('reflektor-przedni-lewy') ? '#ef4444' : '#f3f4f6'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('reflektor-przedni-lewy')}
                              data-testid="part-reflektor-przedni-lewy"
                            />
                            <text x="80" y="170" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Reflektor L
                            </text>

                            {/* Drzwi przednie lewe */}
                            <rect 
                              id="drzwi-przednie-lewe"
                              x="180" y="120" width="80" height="160" 
                              fill={selectedParts.has('drzwi-przednie-lewe') ? '#ef4444' : '#d1d5db'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('drzwi-przednie-lewe')}
                              data-testid="part-drzwi-przednie-lewe"
                            />
                            <text x="220" y="205" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Drzwi przednie L
                            </text>

                            {/* Drzwi tylne lewe */}
                            <rect 
                              id="drzwi-tylne-lewe"
                              x="270" y="120" width="80" height="160" 
                              fill={selectedParts.has('drzwi-tylne-lewe') ? '#ef4444' : '#d1d5db'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('drzwi-tylne-lewe')}
                              data-testid="part-drzwi-tylne-lewe"
                            />
                            <text x="310" y="205" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Drzwi tylne L
                            </text>

                            {/* Dach */}
                            <rect 
                              id="dach"
                              x="180" y="100" width="400" height="30" 
                              fill={selectedParts.has('dach') ? '#ef4444' : '#d1d5db'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('dach')}
                              data-testid="part-dach"
                            />
                            <text x="380" y="90" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Dach
                            </text>

                            {/* Szyba czołowa */}
                            <polygon 
                              id="szyba-czolowa"
                              points="170,120 180,120 180,150 170,140" 
                              fill={selectedParts.has('szyba-czolowa') ? '#ef4444' : '#bfdbfe'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('szyba-czolowa')}
                              data-testid="part-szyba-czolowa"
                            />
                            <text x="175" y="145" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Szyba
                            </text>

                            {/* Koła */}
                            <circle 
                              id="kolo-przednie-lewe"
                              cx="140" cy="320" r="25" 
                              fill={selectedParts.has('kolo-przednie-lewe') ? '#ef4444' : '#374151'} 
                              stroke="#1f2937" strokeWidth="2" 
                              className="cursor-pointer hover:fill-yellow-600 transition-colors"
                              onClick={() => handlePartClick('kolo-przednie-lewe')}
                              data-testid="part-kolo-przednie-lewe"
                            />
                            <text x="140" y="360" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Koło przednie L
                            </text>

                            <circle 
                              id="kolo-tylne-lewe"
                              cx="340" cy="320" r="25" 
                              fill={selectedParts.has('kolo-tylne-lewe') ? '#ef4444' : '#374151'} 
                              stroke="#1f2937" strokeWidth="2" 
                              className="cursor-pointer hover:fill-yellow-600 transition-colors"
                              onClick={() => handlePartClick('kolo-tylne-lewe')}
                              data-testid="part-kolo-tylne-lewe"
                            />
                            <text x="340" y="360" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Koło tylne L
                            </text>

                            {/* Błotniki */}
                            <rect 
                              id="blotnik-przedni-lewy"
                              x="130" y="290" width="20" height="40" 
                              fill={selectedParts.has('blotnik-przedni-lewy') ? '#ef4444' : '#9ca3af'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('blotnik-przedni-lewy')}
                              data-testid="part-blotnik-przedni-lewy"
                            />

                            <rect 
                              id="blotnik-tylny-lewy"
                              x="330" y="290" width="20" height="40" 
                              fill={selectedParts.has('blotnik-tylny-lewy') ? '#ef4444' : '#9ca3af'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('blotnik-tylny-lewy')}
                              data-testid="part-blotnik-tylny-lewy"
                            />

                            {/* Lusterko lewe */}
                            <rect 
                              id="lusterko-lewe"
                              x="160" y="130" width="15" height="8" 
                              fill={selectedParts.has('lusterko-lewe') ? '#ef4444' : '#6b7280'} 
                              stroke="#374151" strokeWidth="1" 
                              className="cursor-pointer hover:fill-yellow-300 transition-colors"
                              onClick={() => handlePartClick('lusterko-lewe')}
                              data-testid="part-lusterko-lewe"
                            />
                            <text x="167" y="125" textAnchor="middle" className="text-xs fill-gray-700 pointer-events-none">
                              Lusterko L
                            </text>

                            {/* Dodatkowe części - dodamy je progressywnie */}
                          </svg>
                        </div>
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
                    {Array.from(selectedParts).map(partId => (
                      <li key={partId}>{CAR_PARTS[partId as keyof typeof CAR_PARTS]}</li>
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