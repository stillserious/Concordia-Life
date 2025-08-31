import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TextField, Autocomplete } from '@mui/material';
import { useToast } from "@/hooks/use-toast";
import carModelsData from "@/data/car-models.json";

const vehicleDataFormSchema = z.object({
  vehicleBrand: z.string().min(1, { message: "Marka pojazdu jest wymagana" }),
  vehicleProductionYear: z.string().optional(),
  vehicleModel: z.string().optional(),
});

type VehicleDataFormData = z.infer<typeof vehicleDataFormSchema>;

export default function ClaimVehicleACVehicleData() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<VehicleDataFormData>({
    resolver: zodResolver(vehicleDataFormSchema),
    defaultValues: {
      vehicleBrand: "",
      vehicleProductionYear: "",
      vehicleModel: "",
    }
  });

  const selectedBrand = form.watch("vehicleBrand");
  
  // Pobierz listę marek
  const brands = carModelsData.map(item => item.brand);
  
  // Pobierz modele dla wybranej marki
  const availableModels = selectedBrand 
    ? carModelsData.find(item => item.brand === selectedBrand)?.models || []
    : [];

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const onSubmit = (data: VehicleDataFormData) => {
    console.log("Dane pojazdu:", data);
    
    toast({
      title: "Dane pojazdu zapisane",
      description: "Przechodzę do informacji o zdarzeniu...",
    });

    setLocation("/claim/vehicle/ac/incident-info");
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={4} 
        totalSteps={5} 
        stepLabels={["Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu", "Informacje o zdarzeniu"]} 
        stepRoutes={["/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data", "/claim/vehicle/ac/incident-info"]}
      />
      
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 category-icon-vehicles rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-gray-800">AC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">
                  Moje ubezpieczenie (AC)
                </h1>
                <p className="text-gray-600">
                  Zgłaszasz szkodę z ubezpieczenia autocasco.
                </p>
              </div>
            </div>
          </div>

          <div className="insurance-card p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Dane pojazdu
              </h2>
              <p className="text-sm text-gray-600">
                Podaj informacje o pojeździe objętym zgłoszeniem szkody.
              </p>
            </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Wpisz dane pojazdu</h2>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vehicleBrand"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Autocomplete
                              options={brands}
                              value={field.value || null}
                              onChange={(_, newValue) => {
                                field.onChange(newValue || "");
                                // Reset model when brand changes
                                form.setValue("vehicleModel", "");
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Marka *"
                                  placeholder="Wybierz markę pojazdu"
                                  data-testid="input-vehicle-brand"
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
                              )}
                              sx={{ width: '100%' }}
                              noOptionsText="Nie znaleziono marki"
                              openText="Otwórz"
                              closeText="Zamknij"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicleProductionYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TextField
                              {...field}
                              label="Rok produkcji"
                              placeholder="np. 2020"
                              fullWidth
                              data-testid="input-vehicle-production-year"
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

                  <FormField
                    control={form.control}
                    name="vehicleModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Autocomplete
                            options={availableModels}
                            value={field.value || null}
                            onChange={(_, newValue) => {
                              field.onChange(newValue || "");
                            }}
                            disabled={!selectedBrand}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Model"
                                placeholder={selectedBrand ? "Wybierz model pojazdu" : "Najpierw wybierz markę"}
                                data-testid="input-vehicle-model"
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
                            )}
                            sx={{ width: '100%' }}
                            noOptionsText={selectedBrand ? "Nie znaleziono modelu" : "Najpierw wybierz markę"}
                            openText="Otwórz"
                            closeText="Zamknij"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4">
                <Button variant="outline" data-testid="button-back" onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLocation("/claim/vehicle/ac/collision-vehicle");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cofnij
                </Button>
                <Button 
                  type="submit" 
                  data-testid="button-submit"
                  className="insurance-button"
                >
                  Przejdź dalej
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