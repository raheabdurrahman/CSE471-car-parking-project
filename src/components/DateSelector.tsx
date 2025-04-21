
import { Calendar } from "lucide-react";

interface DateSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateSelector = ({ label, value, onChange }: DateSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="park-input pl-8"
        />
        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default DateSelector;
