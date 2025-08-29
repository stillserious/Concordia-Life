import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "Zgłaszanie szkód",
    question: "Jak szybko muszę zgłosić szkodę?",
    answer: "Szkodę należy zgłosić jak najszybciej, najlepiej w ciągu 7 dni od zdarzenia. W przypadku kradzieży - niezwłocznie po odkryciu."
  },
  {
    category: "Zgłaszanie szkód", 
    question: "Jakie dokumenty są potrzebne do zgłoszenia?",
    answer: "Podstawowe dokumenty to: polisa ubezpieczeniowa, dokument tożsamości, opis zdarzenia. W zależności od typu szkody mogą być potrzebne dodatkowe dokumenty."
  },
  {
    category: "Pojazdy",
    question: "Co to jest różnica między AC a OC?",
    answer: "OC (odpowiedzialność cywilna) to ubezpieczenie obowiązkowe, które pokrywa szkody wyrządzone innym. AC (autocasco) to dobrowolne ubezpieczenie własnego pojazdu."
  },
  {
    category: "Pojazdy",
    question: "Czy potrzebuję protokołu policji?",
    answer: "Protokół policji jest wymagany przy kradzieży pojazdu, wypadkach z udziałem osób trzecich i w przypadkach gdy strony nie są zgodne co do przebiegu zdarzenia."
  },
  {
    category: "Majątek",
    question: "Czy zalanie jest pokryte przez ubezpieczenie?",
    answer: "Tak, ubezpieczenie mieszkania zazwyczaj pokrywa szkody od zalania, pod warunkiem że nie wynikają z zaniedbania ubezpieczonego."
  },
  {
    category: "Ludzie",
    question: "Jak długo trwa wypłata odszkodowania?",
    answer: "Standardowo wypłata następuje w ciągu 30 dni od złożenia kompletnej dokumentacji. W skomplikowanych przypadkach może to potrwać dłużej."
  }
];

interface ChatFAQProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatFAQ({ isOpen, onClose }: ChatFAQProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("wszystkie");
  
  const categories = ["wszystkie", ...Array.from(new Set(faqData.map(item => item.category)))];
  
  const filteredFAQ = selectedCategory === "wszystkie" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50" data-testid="chat-faq">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-insurance-primary text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Często zadawane pytania</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20"
          data-testid="button-close-faq"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Category Filter */}
      <div className="p-3 border-b border-gray-200">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm"
          data-testid="select-category"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === "wszystkie" ? "Wszystkie kategorie" : category}
            </option>
          ))}
        </select>
      </div>

      {/* FAQ Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {filteredFAQ.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                className="w-full p-3 text-left hover:bg-gray-50 flex items-center justify-between"
                data-testid={`faq-question-${index}`}
              >
                <span className="text-sm font-medium text-gray-900 pr-2">
                  {item.question}
                </span>
                {expandedItem === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {expandedItem === index && (
                <div className="p-3 pt-0 border-t border-gray-200 bg-gray-50">
                  <p className="text-sm text-gray-700 leading-relaxed" data-testid={`faq-answer-${index}`}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <p className="text-xs text-gray-500 text-center">
          Nie znalazłeś odpowiedzi? Skontaktuj się z nami: <strong>800 123 456</strong>
        </p>
      </div>
    </div>
  );
}