import { ReactNode } from "react";
import { Link } from "wouter";

interface CategoryCardProps {
  category: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconClassName: string;
  href: string;
}

export default function CategoryCard({ 
  category, 
  title, 
  description, 
  icon, 
  iconClassName, 
  href 
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div 
        className="insurance-card p-8 cursor-pointer group flex flex-col h-full hover:transform hover:scale-102 transition-all duration-300"
        data-testid={`card-${category}`}
      >
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl ${iconClassName}`}>
          {icon}
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center" data-testid={`title-${category}`}>
          {title}
        </h2>
        
        <p className="text-xs text-gray-600 text-center mb-8 leading-relaxed flex-grow" data-testid={`description-${category}`}>
          {description}
        </p>
        
        <div className="text-center mt-auto">
          <div className="insurance-button w-full sm:w-auto px-4 py-2 rounded-lg text-white font-medium">
            Zgłoś sprawę
          </div>
        </div>
      </div>
    </Link>
  );
}
