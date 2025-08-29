import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
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
    <div 
      className="insurance-card p-8 cursor-pointer group flex flex-col h-full"
      data-testid={`card-${category}`}
    >
      <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl ${iconClassName}`}>
        {icon}
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center" data-testid={`title-${category}`}>
        {title}
      </h2>
      
      <p className="text-gray-600 text-center mb-8 leading-relaxed flex-grow" data-testid={`description-${category}`}>
        {description}
      </p>
      
      <div className="text-center mt-auto">
        <Link href={href}>
          <Button 
            className="insurance-button w-full sm:w-auto"
            data-testid={`button-claim-${category}`}
          >
            Zgłoś sprawę
          </Button>
        </Link>
      </div>
    </div>
  );
}
