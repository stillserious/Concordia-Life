import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TextField } from '@mui/material';
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pl } from 'date-fns/locale';

const acFormSchema = z.object({
  incidentDate: z.date().optional(),
  incidentTime: z.date().optional(),
  licensePlate: z.string()
});

type ACFormData = z.infer<typeof acFormSchema>;

export default function ClaimVehicleACPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ACFormData>({
    resolver: zodResolver(acFormSchema),
    defaultValues: {
      incidentDate: undefined,
      incidentTime: undefined,
      licensePlate: ""
    }
  });

  const onSubmit = async (data: ACFormData) => {
    setIsSubmitting(true);

    try {
      // Tutaj będzie logika wysyłania danych do backend'u
      console.log("Dane formularza AC:", data);

      // Po pomyślnym wysłaniu, przekieruj do wyboru typu zdarzenia
      setLocation("/claim/vehicle/ac/incident-type");

    } catch (error) {
      console.error("Błąd podczas wysyłania:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
      <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={1} 
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
                Podstawowe informacje o zdarzeniu
              </h2>
              <p className="text-sm text-gray-600">
                Wypełnij wymagane pola, aby rozpocząć proces zgłaszania szkody.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="incidentDate"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormControl>
                          <DatePicker
                            {...field}
                            value={value || null}
                            onChange={onChange}
                            label="Wybierz datę zdarzenia"
                            slotProps={{
                              textField: {
                                error: false,
                                sx: {
                                  width: '100%',
                                  '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                      borderColor: '#e5e7eb',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: 'hsl(207, 90%, 54%) !important',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: 'hsl(207, 90%, 54%) !important',
                                      borderWidth: '2px !important',
                                    },
                                  },
                                  '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                      color: 'hsl(207, 90%, 54%) !important',
                                    },
                                  },
                                }
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
                    name="incidentTime"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormControl>
                          <TimePicker
                            {...field}
                            value={value || null}
                            onChange={onChange}
                            label="Wybierz godzinę zdarzenia"
                            ampm={false}
                            closeOnSelect
                            slotProps={{
                              textField: {
                                error: false,
                                sx: {
                                  width: '100%',
                                  '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                      borderColor: '#e5e7eb',
                                    },
                                    '&:hover fieldset': {
                                      borderColor: 'hsl(207, 90%, 54%) !important',
                                    },
                                    '&.Mui-focused fieldset': {
                                      borderColor: 'hsl(207, 90%, 54%) !important',
                                      borderWidth: '2px !important',
                                    },
                                  },
                                  '& .MuiInputLabel-root': {
                                    '&.Mui-focused': {
                                      color: 'hsl(207, 90%, 54%) !important',
                                    },
                                  },
                                }
                              },
                              actionBar: {
                                actions: [],
                              },
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
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          {...field}
                          label="np. WA 12345"
                          placeholder="np. WA 12345"
                          inputProps={{ 'data-testid': 'input-license-plate' }}
                          fullWidth
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

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">
                    💡 Co dalej?
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Po wypełnieniu tych danych przejdziesz do szczegółowego formularza</li>
                    <li>• Będziesz mógł dodać opis zdarzenia i dokumenty</li>
                    <li>• Otrzymasz numer sprawy do śledzenia statusu</li>
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                  <Link href="/claim/vehicle">
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
                    {isSubmitting ? "Przetwarzanie..." : "Przejdź dalej"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

        </div>
      </main>

        <Footer />
      </div>
    </LocalizationProvider>
  );
}