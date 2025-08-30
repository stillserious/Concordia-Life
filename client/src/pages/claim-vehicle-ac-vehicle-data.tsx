import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TextField } from '@mui/material';
import { useToast } from "@/hooks/use-toast";

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

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const onSubmit = (data: VehicleDataFormData) => {
    console.log("Dane pojazdu:", data);
    
    toast({
      title: "Dane pojazdu zapisane",
      description: "Przechodzę do następnego kroku...",
    });

    // Tutaj będzie logika zapisywania i przejścia do następnego kroku
    // setLocation("/claim/vehicle/ac/next-step");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar 
        currentStep={4} 
        totalSteps={4} 
        stepLabels={["Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu"]} 
        stepRoutes={["/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data"]}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Dane pojazdu
            </h1>
            <p className="text-gray-600">
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
                            <TextField
                              {...field}
                              label="Marka *"
                              placeholder="np. Toyota, BMW, Ford"
                              fullWidth
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
                          <TextField
                            {...field}
                            label="Model"
                            placeholder="np. Corolla, X5, Focus"
                            fullWidth
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
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-4">
                <Link href="/claim/vehicle/ac/collision-vehicle">
                  <Button variant="outline" data-testid="button-back">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cofnij
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  data-testid="button-submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Zakończ zgłoszenie
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}