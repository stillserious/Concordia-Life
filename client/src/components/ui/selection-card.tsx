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
        cursor-pointer rounded-2xl p-4 transition-all duration-300 transform hover:scale-[1.01] shadow-sm
        ${isSelected 
          ? "bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-sm" 
          : "bg-gradient-to-br from-white to-blue-25 border border-blue-100 hover:border-blue-200 hover:shadow-md"
        }
      `}
      onClick={() => onSelect(value)}
      data-testid={testId}
    >
      <div className="flex items-center space-x-3">
        {icon && (
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300
            ${isSelected ? "bg-white/30 text-white" : "bg-gradient-to-br from-blue-300 to-blue-400 text-white"}
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