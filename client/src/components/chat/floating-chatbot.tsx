import { useState } from "react";
import { MessageCircle, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatFAQ from "./chat-faq";
import ChatAssistant from "./chat-assistant";

type ChatMode = "closed" | "menu" | "faq" | "assistant";

export default function FloatingChatbot() {
  const [mode, setMode] = useState<ChatMode>("closed");

  const openMenu = () => setMode("menu");
  const closeChatbot = () => setMode("closed");

  const renderChatMenu = () => (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50" data-testid="chat-menu">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-insurance-primary text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Pomoc i wsparcie</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={closeChatbot}
          className="text-white hover:bg-white/20"
          data-testid="button-close-menu"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Menu Options */}
      <div className="p-4">
        <p className="text-gray-700 mb-4">Wybierz rodzaj pomocy:</p>
        
        <div className="space-y-3">
          <button
            onClick={() => setMode("faq")}
            className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-insurance-primary transition-all group"
            data-testid="button-open-faq"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-insurance-primary group-hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Często zadawane pytania</div>
                <div className="text-sm text-gray-600">Szybkie odpowiedzi na popularne pytania</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode("assistant")}
            className="w-full p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-insurance-primary transition-all group"
            data-testid="button-open-assistant"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-insurance-primary group-hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Asystent pomocy</div>
                <div className="text-sm text-gray-600">Przewodnik krok po kroku</div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Potrzebujesz bezpośredniej pomocy?<br />
            <strong className="text-insurance-primary">📞 800 123 456</strong><br />
            <span className="text-xs">Dostępne 24/7</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Floating Button */}
      {mode === "closed" && (
        <Button
          onClick={openMenu}
          className="w-14 h-14 rounded-full bg-insurance-primary hover:bg-insurance-primary-hover shadow-lg hover:shadow-xl transition-all duration-300 group"
          data-testid="floating-chat-button"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </Button>
      )}

      {/* Chat Menu */}
      {mode === "menu" && renderChatMenu()}

      {/* FAQ Component */}
      <ChatFAQ
        isOpen={mode === "faq"}
        onClose={() => setMode("menu")}
      />

      {/* Assistant Component */}
      <ChatAssistant
        isOpen={mode === "assistant"}
        onClose={() => setMode("menu")}
      />

      {/* Notification Badge */}
      {mode === "closed" && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
          ?
        </div>
      )}
    </div>
  );
}