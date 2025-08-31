import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Person, PersonOutline } from "@mui/icons-material";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SelectionCard from "@/components/ui/selection-card";
import { TextField } from '@mui/material';
import { useToast } from "@/hooks/use-toast";

const collisionVehicleFormSchema = z.object({
  vehicleOwner: z.enum(["me", "other"], { required_error: "Wybierz właściciela pojazdu" }),
  ownerFirstName: z.string().optional(),
  ownerLastName: z.string().optional(),
  ownerPesel: z.string().optional(),
  driver: z.enum(["me", "other"], { required_error: "Wybierz kto kierował pojazdem" }),
  driverFirstName: z.string().optional(),
  driverLastName: z.string().optional(),
  driverPesel: z.string().optional(),
  driverStreet: z.string().optional(),
  driverHouseNumber: z.string().optional(),
  driverApartmentNumber: z.string().optional(),
  driverPostalCode: z.string().optional(),
  driverCity: z.string().optional(),
  driverPhone: z.string().optional(),
  driverEmail: z.string().optional(),
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
      driverFirstName: "",
      driverLastName: "",
      driverPesel: "",
      driverStreet: "",
      driverHouseNumber: "",
      driverApartmentNumber: "",
      driverPostalCode: "",
      driverCity: "",
      driverPhone: "",
      driverEmail: "",
    }
  });

  const vehicleOwner = form.watch("vehicleOwner");
  const driver = form.watch("driver");

  const onSubmit = async (data: CollisionVehicleFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log("Dane formularza zderzenia z pojazdem:", data);
      
      toast({
        title: "Dane zapisane!",
        description: "Przechodzę do danych pojazdu...",
      });
      
      setLocation("/claim/vehicle/ac/vehicle-data");
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectionCard
                              value="me"
                              isSelected={field.value === "me"}
                              onSelect={field.onChange}
                              title="Ja"
                              icon={<Person />}
                              testId="card-owner-me"
                            />
                            <SelectionCard
                              value="other"
                              isSelected={field.value === "other"}
                              onSelect={field.onChange}
                              title="Inna osoba"
                              icon={<PersonOutline />}
                              testId="card-owner-other"
                            />
                          </div>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectionCard
                              value="me"
                              isSelected={field.value === "me"}
                              onSelect={field.onChange}
                              title="Ja"
                              icon={<Person />}
                              testId="card-driver-me"
                            />
                            <SelectionCard
                              value="other"
                              isSelected={field.value === "other"}
                              onSelect={field.onChange}
                              title="Inna osoba"
                              icon={<PersonOutline />}
                              testId="card-driver-other"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Pola dla kierowcy - pokazują się gdy wybrano "Ja" lub "Inna osoba" */}
                  {driver && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                      <h3 className="font-medium text-gray-900 mb-4">
                        {driver === "me" ? "Podaj swoje dane jako kierowcy:" : "Podaj dane kierowcy:"}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="driverFirstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TextField
                                  {...field}
                                  label="Imię"
                                  fullWidth
                                  data-testid="input-driver-first-name"
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
                          name="driverLastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TextField
                                  {...field}
                                  label="Nazwisko"
                                  fullWidth
                                  data-testid="input-driver-last-name"
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
                        name="driverPesel"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <TextField
                                {...field}
                                label="PESEL"
                                placeholder="np. 12345678901"
                                fullWidth
                                data-testid="input-driver-pesel"
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

                      {/* Dodatkowe pola dla innej osoby kierującej */}
                      {driver === "other" && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="driverStreet"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <TextField
                                      {...field}
                                      label="Ulica"
                                      fullWidth
                                      data-testid="input-driver-street"
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
                              name="driverHouseNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <TextField
                                      {...field}
                                      label="Nr domu"
                                      fullWidth
                                      data-testid="input-driver-house-number"
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
                              name="driverApartmentNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <TextField
                                      {...field}
                                      label="Nr lokalu"
                                      fullWidth
                                      data-testid="input-driver-apartment-number"
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="driverPostalCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <TextField
                                      {...field}
                                      label="Kod pocztowy"
                                      placeholder="np. 00-000"
                                      fullWidth
                                      data-testid="input-driver-postal-code"
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
                              name="driverCity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <TextField
                                      {...field}
                                      label="Miejscowość"
                                      fullWidth
                                      data-testid="input-driver-city"
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="driverPhone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <TextField
                                      {...field}
                                      label="Telefon"
                                      placeholder="np. +48 123 456 789"
                                      fullWidth
                                      data-testid="input-driver-phone"
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
                              name="driverEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <TextField
                                      {...field}
                                      label="E-mail"
                                      type="email"
                                      placeholder="np. email@przykład.pl"
                                      fullWidth
                                      data-testid="input-driver-email"
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
                        </>
                      )}
                    </div>
                  )}
                </div>


                <div className="flex items-center justify-end gap-4 pt-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    data-testid="button-back" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      requestAnimationFrame(() => {
                        setLocation("/claim/vehicle/ac/incident-type");
                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
                      });
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Cofnij
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="insurance-button"
                    data-testid="button-submit-form"
                  >
                    {isSubmitting ? "Zapisywanie..." : "Przejdź dalej"}
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