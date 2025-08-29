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
import { TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useToast } from "@/hooks/use-toast";

const collisionVehicleFormSchema = z.object({
  vehicleOwner: z.enum(["me", "other"], { required_error: "Wybierz właściciela pojazdu" }),
  ownerFirstName: z.string().optional(),
  ownerLastName: z.string().optional(),
  ownerPesel: z.string().optional(),
  driver: z.enum(["me", "other"], { required_error: "Wybierz kto kierował pojazdem" }),
});

type CollisionVehicleFormData = z.infer<typeof collisionVehicleFormSchema>;

export default function ClaimVehicleACCollisionVehiclePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<CollisionVehicleFormData>({
    resolver: zodResolver(collisionVehicleFormSchema),
    defaultValues: {
      vehicleOwner: undefined,
      ownerFirstName: "",
      ownerLastName: "",
      ownerPesel: "",
      driver: undefined,
    }
  });

  const vehicleOwner = form.watch("vehicleOwner");

  const onSubmit = async (data: CollisionVehicleFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log("Dane formularza zderzenia z pojazdem:", data);
      
      toast({
        title: "Dane zapisane!",
        description: "Informacje o zderzeniu zostały zapisane.",
      });
      
      // Tutaj będzie przekierowanie do kolejnego kroku
      // setLocation("/claim/vehicle/ac/collision-vehicle/next-step");
      
    } catch (error) {
      toast({
        title: "Błąd podczas zapisywania",
        description: "Wystąpił problem podczas zapisywania danych. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={3} 
        totalSteps={3} 
        stepLabels={["Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia"]} 
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
                Zderzenie z pojazdem w ruchu
              </h2>
              <p className="text-sm text-gray-600">
                Podaj szczegóły dotyczące właściciela pojazdu i kierowcy
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Sekcja właściciela pojazdu */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="vehicleOwner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-900">
                          Kto jest właścicielem pojazdu?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            sx={{
                              '& .MuiFormControlLabel-root': {
                                marginBottom: '12px',
                              },
                              '& .MuiRadio-root': {
                                color: '#6b7280',
                                '&.Mui-checked': {
                                  color: 'hsl(207, 90%, 54%)',
                                },
                              },
                            }}
                          >
                            <FormControlLabel 
                              value="me" 
                              control={<Radio />} 
                              label="Ja" 
                              data-testid="radio-owner-me"
                            />
                            <FormControlLabel 
                              value="other" 
                              control={<Radio />} 
                              label="Inna osoba" 
                              data-testid="radio-owner-other"
                            />
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Pola dla właściciela - pokazują się gdy wybrano "Ja" lub "Inna osoba" */}
                  {vehicleOwner && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                      <h3 className="font-medium text-gray-900 mb-4">
                        {vehicleOwner === "me" ? "Podaj swoje dane:" : "Podaj dane właściciela:"}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="ownerFirstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Imię</FormLabel>
                              <FormControl>
                                <TextField
                                  {...field}
                                  label="Imię"
                                  fullWidth
                                  data-testid="input-owner-first-name"
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
                          name="ownerLastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nazwisko</FormLabel>
                              <FormControl>
                                <TextField
                                  {...field}
                                  label="Nazwisko"
                                  fullWidth
                                  data-testid="input-owner-last-name"
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
                        name="ownerPesel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PESEL</FormLabel>
                            <FormControl>
                              <TextField
                                {...field}
                                label="PESEL"
                                placeholder="np. 12345678901"
                                fullWidth
                                data-testid="input-owner-pesel"
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
                  )}
                </div>

                {/* Sekcja kierowcy */}
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="driver"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-900">
                          Kto kierował?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            sx={{
                              '& .MuiFormControlLabel-root': {
                                marginBottom: '12px',
                              },
                              '& .MuiRadio-root': {
                                color: '#6b7280',
                                '&.Mui-checked': {
                                  color: 'hsl(207, 90%, 54%)',
                                },
                              },
                            }}
                          >
                            <FormControlLabel 
                              value="me" 
                              control={<Radio />} 
                              label="Ja" 
                              data-testid="radio-driver-me"
                            />
                            <FormControlLabel 
                              value="other" 
                              control={<Radio />} 
                              label="Inna osoba" 
                              data-testid="radio-driver-other"
                            />
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                  <Link href="/claim/vehicle/ac/incident-type">
                    <Button variant="outline" data-testid="button-back">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Cofnij
                    </Button>
                  </Link>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="insurance-button"
                    data-testid="button-submit-form"
                  >
                    {isSubmitting ? "Zapisywanie..." : "Kontynuuj"}
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