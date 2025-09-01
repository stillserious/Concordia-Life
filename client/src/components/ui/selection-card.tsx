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
        cursor-pointer rounded-2xl p-4 transition-all duration-300 transform hover:scale-[1.02] shadow-lg
        ${isSelected 
          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-200" 
          : "bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 hover:border-blue-300 hover:shadow-xl"
        }
      `}
      onClick={() => onSelect(value)}
      data-testid={testId}
    >
      <div className="flex items-center space-x-3">
        {icon && (
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
            ${isSelected ? "bg-white/20 text-white" : "bg-gradient-to-br from-blue-400 to-blue-500 text-white"}
          `}>
            {icon}
          </div>
        )}
        <span className={`font-semibold text-base ${isSelected ? "text-white" : "text-gray-800"}`}>
          {title}
        </span>
      </div>
    </div>
  );
}