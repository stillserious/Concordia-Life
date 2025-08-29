import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, HelpCircle, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  tips?: string[];
  documents?: string[];
  nextAction?: {
    text: string;
    href?: string;
    action?: () => void;
  };
}

const vehicleGuide: GuideStep[] = [
  {
    id: "start",
    title: "Zgłaszanie szkody pojazdu - Start",
    description: "Pomogę Ci przejść przez proces zgłaszania szkody pojazdu krok po kroku.",
    tips: [
      "Przygotuj dokumenty przed rozpoczęciem",
      "Proces займe около 10 минут",
      "Możesz zapisać i wrócić później"
    ],
    nextAction: { text: "Rozpocznij zgłoszenie" }
  },
  {
    id: "type",
    title: "Krok 1: Typ szkody",
    description: "Określ jaki typ szkody chcesz zgłosić:",
    tips: [
      "AC (Autocasco) - szkody własnego pojazdu",
      "OC sprawcy - szkody wyrządzone przez inną osobę",
      "Jeśli nie jesteś pewien, wybierz AC"
    ],
    nextAction: { text: "Wybierz typ ubezpieczenia", href: "/claim/vehicle" }
  },
  {
    id: "documents",
    title: "Krok 2: Przygotowanie dokumentów",
    description: "Upewnij się, że masz następujące dokumenty:",
    documents: [
      "Polisa ubezpieczeniowa",
      "Prawo jazdy",
      "Dowód rejestracyjny pojazdu",
      "Dokumenty tożsamości",
      "Protokół policji (jeśli dotyczy)"
    ],
    tips: [
      "Wszystkie dokumenty możesz przesłać jako zdjęcia",
      "Upewnij się, że zdjęcia są czytelne"
    ],
    nextAction: { text: "Mam dokumenty, kontynuuj" }
  },
  {
    id: "complete",
    title: "Gotowe do zgłoszenia!",
    description: "Masz wszystko co potrzebne. Teraz możesz przejść do formularza zgłoszenia szkody.",
    tips: [
      "Wypełnij formularz dokładnie",
      "Opisz zdarzenie szczegółowo",
      "Dodaj zdjęcia uszkodzeń jeśli masz"
    ],
    nextAction: { text: "Przejdź do formularza", href: "/claim/vehicle" }
  }
];

const propertyGuide: GuideStep[] = [
  {
    id: "start",
    title: "Zgłaszanie szkody majątkowej - Start",
    description: "Przewodnik po zgłaszaniu szkód dotyczących nieruchomości i mienia.",
    nextAction: { text: "Rozpocznij" }
  },
  {
    id: "assess",
    title: "Krok 1: Ocena szkody",
    description: "Określ rodzaj i zakres szkody:",
    tips: [
      "Zalanie - sprawdź źródło wody",
      "Pożar - zachowaj dowody",
      "Kradzież - zgłoś na policję",
      "Uszkodzenie - udokumentuj przyczynę"
    ],
    nextAction: { text: "Kontynuuj" }
  },
  {
    id: "documents",
    title: "Krok 2: Dokumenty",
    description: "Przygotuj wymagane dokumenty:",
    documents: [
      "Polisa ubezpieczeniowa",
      "Dowód własności/najem",
      "Zdjęcia szkód",
      "Faktury za naprawy (jeśli są)",
      "Protokół policji (przy kradzieży)"
    ],
    nextAction: { text: "Przejdź do zgłoszenia", href: "/claim/property" }
  }
];

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  const [currentGuide, setCurrentGuide] = useState<"menu" | "vehicle" | "property">("menu");
  const [currentStep, setCurrentStep] = useState(0);
  
  const getCurrentGuideSteps = () => {
    if (currentGuide === "vehicle") return vehicleGuide;
    if (currentGuide === "property") return propertyGuide;
    return [];
  };

  const resetGuide = () => {
    setCurrentGuide("menu");
    setCurrentStep(0);
  };

  const nextStep = () => {
    const steps = getCurrentGuideSteps();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentGuide("menu");
    }
  };

  if (!isOpen) return null;

  const renderMenu = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Wybierz kategorie pomocy:</h3>
      <div className="space-y-3">
        <button
          onClick={() => {setCurrentGuide("vehicle"); setCurrentStep(0);}}
          className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          data-testid="guide-vehicle"
        >
          <div className="font-medium text-gray-900">🚗 Pojazdy</div>
          <div className="text-sm text-gray-600">Przewodnik po zgłaszaniu szkód pojazdów</div>
        </button>
        
        <button
          onClick={() => {setCurrentGuide("property"); setCurrentStep(0);}}
          className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          data-testid="guide-property"
        >
          <div className="font-medium text-gray-900">🏠 Majątek</div>
          <div className="text-sm text-gray-600">Przewodnik po zgłaszaniu szkód majątkowych</div>
        </button>

        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            💡 <strong>Wskazówka:</strong> Wybierz kategorię, która najlepiej opisuje Twoją szkodę.
          </p>
        </div>
      </div>
    </div>
  );

  const renderGuideStep = () => {
    const steps = getCurrentGuideSteps();
    const step = steps[currentStep];
    
    return (
      <div className="flex flex-col h-full">
        {/* Progress bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Krok {currentStep + 1} z {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-insurance-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-3" data-testid="step-title">
            {step.title}
          </h3>
          
          <p className="text-gray-700 mb-4 leading-relaxed" data-testid="step-description">
            {step.description}
          </p>

          {step.documents && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Wymagane dokumenty:
              </h4>
              <ul className="space-y-2">
                {step.documents.map((doc, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step.tips && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                Przydatne wskazówki:
              </h4>
              <ul className="space-y-1">
                {step.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-blue-800">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStep}
              data-testid="button-prev-step"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Wstecz
            </Button>

            {step.nextAction?.href ? (
              <Link href={step.nextAction.href}>
                <Button size="sm" className="ml-2" data-testid="button-next-link">
                  {step.nextAction.text}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <Button
                size="sm"
                onClick={step.nextAction?.action || nextStep}
                disabled={currentStep === steps.length - 1}
                data-testid="button-next-step"
              >
                {step.nextAction?.text || "Dalej"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50" data-testid="chat-assistant">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-insurance-primary text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          <h3 className="font-semibold">Asystent pomocy</h3>
        </div>
        <div className="flex items-center gap-2">
          {currentGuide !== "menu" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetGuide}
              className="text-white hover:bg-white/20"
              data-testid="button-reset-guide"
            >
              Menu
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
            data-testid="button-close-assistant"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {currentGuide === "menu" ? renderMenu() : renderGuideStep()}
      </div>
    </div>
  );
}