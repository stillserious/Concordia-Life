import logoImage from "@assets/LOGO_1756645859902.png";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center" data-testid="header-logo">
          <div className="flex items-center">
            <img 
              src={logoImage} 
              alt="ConcordiaLife" 
              className="h-14 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
