import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center" data-testid="header-logo">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-insurance-primary rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-insurance-primary">
              Ochrona 24h
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
