import { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { ArrowLeft, Upload, FileText, AlertCircle, Info } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgressBar from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ClaimVehicleACDocuments() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [registrationDocument, setRegistrationDocument] = useState<File | null>(null);
  const [otherDocument, setOtherDocument] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  // Przewiń do góry po załadowaniu komponentu
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Generuj losowy numer zgłoszenia
  const claimNumber = `PL${new Date().getFullYear()}${String(Date.now()).slice(-8)}`;

  const handleFileSelect = (file: File, type: 'registration' | 'other') => {
    // Sprawdź rozmiar pliku (15MB max)
    if (file.size > 15 * 1024 * 1024) {
      toast({
        title: "Plik jest za duży",
        description: "Maksymalny rozmiar pliku to 15 MB.",
        variant: "destructive",
      });
      return;
    }

    // Sprawdź format pliku
    const allowedTypes = [
      'image/bmp', 'text/csv', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/gif', 'image/jpeg', 'image/jpg', 'image/png',
      'application/vnd.oasis.opendocument.spreadsheet',
      'application/vnd.oasis.opendocument.text',
      'application/pdf', 'application/x-rar-compressed',
      'application/rtf', 'image/tiff', 'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/zip'
    ];

    const fileExtension = file.name.toLowerCase().split('.').pop();
    const allowedExtensions = ['bmp', 'csv', 'doc', 'docx', 'gif', 'jpeg', 'jpg', 'ods', 'odt', 'ops', 'pdf', 'png', 'rar', 'rtf', 'tif', 'tiff', 'txt', 'xls', 'xlsx', 'zip'];

    if (!allowedExtensions.includes(fileExtension || '')) {
      toast({
        title: "Nieprawidłowy format pliku",
        description: "Dozwolone formaty: bmp, csv, doc, docx, gif, jpeg, jpg, ods, odt, ops, pdf, png, rar, rtf, tif, tiff, txt, xls, xlsx, zip",
        variant: "destructive",
      });
      return;
    }

    if (type === 'registration') {
      setRegistrationDocument(file);
    } else {
      setOtherDocument(file);
    }

    toast({
      title: "Plik został dodany",
      description: `${file.name} został pomyślnie załączony.`,
    });
  };

  const handleDrop = (e: React.DragEvent, type: 'registration' | 'other') => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file, type);
    }
  };

  const handleSubmit = async () => {
    console.log("Dokumenty:", {
      registrationDocument: registrationDocument?.name,
      otherDocument: otherDocument?.name
    });

    // Przekieruj do strony potwierdzenia
    setTimeout(() => {
      setLocation("/claim/vehicle/ac/confirmation");
    }, 1000);
  };

  const FileUploadZone = ({ 
    type, 
    title, 
    file, 
    onFileSelect 
  }: { 
    type: 'registration' | 'other', 
    title: string, 
    file: File | null,
    onFileSelect: (file: File) => void 
  }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver === type 
            ? 'border-blue-400 bg-blue-50' 
            : file 
            ? 'border-green-400 bg-green-50' 
            : 'border-blue-200 hover:border-blue-400 bg-gradient-to-r from-white to-blue-50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(type);
        }}
        onDragLeave={() => setDragOver(null)}
        onDrop={(e) => handleDrop(e, type)}
        data-testid={`upload-zone-${type}`}
      >
        {file ? (
          <div className="flex flex-col items-center">
            <FileText className="w-12 h-12 text-green-600 mb-3" />
            <p className="text-sm font-medium text-green-700">{file.name}</p>
            <p className="text-xs text-gray-500 mt-1">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => {
                if (type === 'registration') setRegistrationDocument(null);
                else setOtherDocument(null);
              }}
              data-testid={`button-remove-${type}`}
            >
              Usuń plik
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-gray-600 mb-2">
              Przeciągnij i upuść plik tutaj lub
            </p>
            <Button
              variant="outline"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.bmp,.csv,.doc,.docx,.gif,.jpeg,.jpg,.ods,.odt,.ops,.pdf,.png,.rar,.rtf,.tif,.tiff,.txt,.xls,.xlsx,.zip';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) onFileSelect(file);
                };
                input.click();
              }}
              data-testid={`button-upload-${type}`}
            >
              Dodaj załącznik
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col insurance-gradient-bg">
      <Header />
      <ProgressBar 
        currentStep={8} 
        totalSteps={8} 
        stepLabels={["Wybór ubezpieczenia", "Podstawowe dane", "Typ zdarzenia", "Szczegóły zdarzenia", "Dane pojazdu", "Informacje o zdarzeniu", "Uszkodzenia pojazdu", "Dokumenty"]} 
        stepRoutes={["/claim/vehicle", "/claim/vehicle/ac", "/claim/vehicle/ac/incident-type", "/claim/vehicle/ac/collision-vehicle", "/claim/vehicle/ac/vehicle-data", "/claim/vehicle/ac/incident-info", "/claim/vehicle/ac/damage", "/claim/vehicle/ac/documents"]}
      />
      <main className="flex-1 py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 category-icon-vehicles bg-[#262222] rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-[#cbcbf5]">AC</span>
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
                Załącz niezbędne dokumenty
              </h2>
              <p className="text-sm text-gray-600">
                Akceptujemy załączniki w formacie: jpeg, jpg, ods, odt, pdf, png, rar, zip, tif, tiff.<br />
                Maksymalna wielkość załącznika nie może przekroczyć 15 MB.
              </p>
            </div>

            <div className="space-y-6">
              <FileUploadZone
                type="registration"
                title="Zdjęcie dowodu rejestracyjnego"
                file={registrationDocument}
                onFileSelect={(file) => handleFileSelect(file, 'registration')}
              />

              <FileUploadZone
                type="other"
                title="Inny dokument"
                file={otherDocument}
                onFileSelect={(file) => handleFileSelect(file, 'other')}
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                data-testid="button-back" 
                onClick={() => setLocation("/claim/vehicle/ac/damage")}
                type="button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cofnij
              </button>

              <Button 
                onClick={handleSubmit}
                className="insurance-button"
                data-testid="button-submit"
              >
                Wyślij zgłoszenie
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}