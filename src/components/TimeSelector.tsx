
import { Clock } from "lucide-react";

interface TimeSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TimeSelector = ({ label, value, onChange }: TimeSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="park-input pl-8"
        />
        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default TimeSelector;
