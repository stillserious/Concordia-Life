import { ReactNode } from "react";

interface SelectionCardProps {
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
  title: string;
  icon?: ReactNode;
  testId?: string;
}

export default function SelectionCard({ 
  value, 
  isSelected, 
  onSelect, 
  title, 
  icon,
  testId 
}: SelectionCardProps) {
  return (
    <div
      className={`
        cursor-pointer border-2 rounded-lg p-4 transition-all duration-200
        ${isSelected 
          ? "border-gray-400 bg-gray-100" 
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
        }
      `}
      onClick={() => onSelect(value)}
      data-testid={testId}
    >
      <div className="flex items-center space-x-3">
        {icon && (
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${isSelected ? "bg-gray-500 text-white" : "bg-gray-100 text-gray-600"}
          `}>
            {icon}
          </div>
        )}
        <span className={`font-medium ${isSelected ? "text-gray-700" : "text-gray-900"}`}>
          {title}
        </span>
      </div>
    </div>
  );
}