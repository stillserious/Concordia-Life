import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { TextField } from '@mui/material';
import { useToast } from "@/hooks/use-toast";
import SelectionCard from "@/components/ui/selection-card";
import GoogleMap from "@/components/ui/google-map";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Link } from "wouter";

const incidentInfoFormSchema = z.object({
  incidentLocation: z.string().min(1, { message: "Miejsce zdarzenia jest wymagane" }),
  incidentLocationLat: z.number().optional(),
  incidentLocationLng: z.number().optional(),
  incidentDescription: z.string().min(1, { message: "Opis zdarzenia jest wymagany" }),
  faultCause: z.enum(["inna_przyczyna", "drugi_uczestnik"], { message: "Wybierz sprawcę zdarzenia" }),
  policePresent: z.enum(["tak", "nie"], { message: "Wybierz czy była policja" }),
  vehicleTowed: z.enum(["tak", "nie"], { message: "Wybierz czy pojazd był holowany" }),
  vehicleInGarage: z.enum(["tak", "nie"], { message: "Wybierz czy pojazd jest w warsztacie" }),
});

type IncidentInfoFormData = z.infer<typeof incidentInfoFormSchema>;

export default function ClaimVehicleACIncidentInfo() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<IncidentInfoFormData>({
    resolver: zodResolver(incidentInfoFormSchema),
    defaultValues: {
      incidentLocation: "",
      incidentLocationLat: undefined,
      incidentLocationLng: undefined,
      incidentDescription: "",
      faultCause: undefined,
      policePresent: undefined,
      vehicleTowed: undefined,
      vehicleInGarage: undefined,
    }
  });

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: IncidentInfoFormData) => {
    try {
      console.log("Dane formularza informacji o zdarzeniu:", data);
      
      toast({
        title: "Dane zapisane!",
        description: "Zgłoszenie zostało zakończone pomyślnie.",
      });
      
      // Tutaj będzie przekierowanie do strony podsumowania lub zakończenia
      // setLocation("/claim/vehicle/ac/summary");
      
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
        currentStep={6} 
        totalSteps={6} 
        stepLabels={["Wybór ubezpieczenia", "Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu", "Informacje o zdarzeniu"]} 
        stepRoutes={["/claim/vehicle", "/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data", "/claim/vehicle/ac/incident-info"]}
      />
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
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
                Informacje o zdarzeniu
              </h2>
              <p className="text-sm text-gray-600">
                Podaj szczegóły dotyczące miejsca i okoliczności zdarzenia
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Miejsce zdarzenia */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Wskaż miejsce zdarzenia</h2>
                  <p className="text-gray-600 text-sm">Kliknij na mapie lub przeciągnij marker, aby wskazać dokładne miejsce zdarzenia</p>
                  
                  <div className="space-y-4">
                    <GoogleMap
                      onLocationSelect={(location) => {
                        form.setValue("incidentLocation", location.address);
                        form.setValue("incidentLocationLat", location.lat);
                        form.setValue("incidentLocationLng", location.lng);
                      }}
                      height="400px"
                    />
                    
                    <FormField
                      control={form.control}
                      name="incidentLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TextField
                              {...field}
                              label="Wybrane miejsce zdarzenia *"
                              placeholder="Adres zostanie automatycznie uzupełniony po wybraniu miejsca na mapie"
                              fullWidth
                              data-testid="input-incident-location"
                              InputProps={{
                                readOnly: true,
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: '#f9fafb',
                                  borderRadius: '8px',
                                  '& fieldset': {
                                    borderColor: '#e5e7eb',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'hsl(207, 90%, 54%)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'hsl(207, 90%, 54%)',
                                  },
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Opis zdarzenia */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Opis zdarzenia</h2>
                  
                  <FormField
                    control={form.control}
                    name="incidentDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextField
                            {...field}
                            label="Opis zdarzenia *"
                            placeholder="Jak doszło do zdarzenia, jakie pojazdy w nim uczestniczyły oraz inne ważne informacje"
                            multiline
                            rows={6}
                            fullWidth
                            data-testid="input-incident-description"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                '& fieldset': {
                                  borderColor: '#e5e7eb',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'hsl(207, 90%, 54%)',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'hsl(207, 90%, 54%)',
                                },
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Sprawca zdarzenia */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Kto był sprawcą zdarzenia?</h2>
                  
                  <FormField
                    control={form.control}
                    name="faultCause"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectionCard
                              value="inna_przyczyna"
                              title="Inna przyczyna"
                              isSelected={field.value === "inna_przyczyna"}
                              onSelect={() => field.onChange("inna_przyczyna")}
                              testId="card-fault-other"
                            />
                            <SelectionCard
                              value="drugi_uczestnik"
                              title="Drugi uczestnik"
                              isSelected={field.value === "drugi_uczestnik"}
                              onSelect={() => field.onChange("drugi_uczestnik")}
                              testId="card-fault-participant"
                            />
                          </div>
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>Wybierz "Inna przyczyna"</strong>, gdy to Ty, kierowca uszkodzonego pojazdu, członek Twojej rodziny, zwierzę lub zjawisko atmosferyczne spowodowały szkodę.
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Czy była policja */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Czy na miejscu zdarzenia była policja?</h2>
                  
                  <FormField
                    control={form.control}
                    name="policePresent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectionCard
                              value="tak"
                              title="Tak"
                              isSelected={field.value === "tak"}
                              onSelect={() => field.onChange("tak")}
                              testId="card-police-yes"
                            />
                            <SelectionCard
                              value="nie"
                              title="Nie"
                              isSelected={field.value === "nie"}
                              onSelect={() => field.onChange("nie")}
                              testId="card-police-no"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Czy pojazd był holowany */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Czy pojazd był holowany?</h2>
                  
                  <FormField
                    control={form.control}
                    name="vehicleTowed"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectionCard
                              value="tak"
                              title="Tak"
                              isSelected={field.value === "tak"}
                              onSelect={() => field.onChange("tak")}
                              testId="card-towed-yes"
                            />
                            <SelectionCard
                              value="nie"
                              title="Nie"
                              isSelected={field.value === "nie"}
                              onSelect={() => field.onChange("nie")}
                              testId="card-towed-no"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Czy pojazd jest w warsztacie */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Czy uszkodzony pojazd znajduje się już w warsztacie?</h2>
                  
                  <FormField
                    control={form.control}
                    name="vehicleInGarage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectionCard
                              value="tak"
                              title="Tak"
                              isSelected={field.value === "tak"}
                              onSelect={() => field.onChange("tak")}
                              testId="card-garage-yes"
                            />
                            <SelectionCard
                              value="nie"
                              title="Nie"
                              isSelected={field.value === "nie"}
                              onSelect={() => field.onChange("nie")}
                              testId="card-garage-no"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                  <button 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    data-testid="button-back" 
                    onClick={() => setLocation("/claim/vehicle/ac/vehicle-data")}
                    onTouchStart={() => setLocation("/claim/vehicle/ac/vehicle-data")}
                    type="button"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cofnij
                  </button>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="insurance-button"
                    data-testid="button-submit-form"
                  >
                    {isSubmitting ? "Zapisywanie..." : "Zakończ zgłoszenie"}
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