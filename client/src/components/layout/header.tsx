import logoImage from "@assets/logo_1756646377592.png";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-1">
        <div className="flex items-center" data-testid="header-logo">
          <div className="flex items-center">
            <img 
              src={logoImage} 
              alt="ConcordiaLife" 
              className="h-16 w-auto"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
