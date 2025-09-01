import { ReactNode } from "react";
import { Link } from "wouter";

interface CategoryCardProps {
  category: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconClassName: string;
  href: string;
  size?: "default" | "small";
  showButton?: boolean;
}

export default function CategoryCard({
  category,
  title,
  description,
  icon,
  iconClassName,
  href,
  size = "default",
  showButton = true
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div
        className={`${
          size === "small"
            ? "bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300"
            : "insurance-card"
        } cursor-pointer group flex flex-col h-full hover:transform hover:scale-[1.02] transition-all duration-300 ${
          size === "small" ? "p-4" : "p-8"
        } min-h-[140px]`}
        data-testid={`card-${category}`}
      >
        <div className="mx-auto rounded-full flex items-center justify-center w-14 h-14 mb-3 text-lg category-icon-vehicles text-[#8df320] bg-[#21211d]">
          {icon}
        </div>

        <h2 className={`font-semibold text-gray-900 text-center ${
          size === "small"
            ? "text-base mb-2"
            : "text-xl mb-4"
        }`} data-testid={`title-${category}`}>
          {title}
        </h2>

        <p className={`text-xs text-gray-600 text-center leading-relaxed flex-grow ${
          size === "small" ? "mb-4" : "mb-8"
        }`} data-testid={`description-${category}`}>
          {description}
        </p>

        {showButton && (
          <div className="text-center mt-auto">
            <div className={`insurance-button w-full sm:w-auto rounded-lg text-white font-medium ${
              size === "small" ? "px-3 py-1.5 text-sm" : "px-4 py-2"
            }`}>
              Zgłoś zdarzenie
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}