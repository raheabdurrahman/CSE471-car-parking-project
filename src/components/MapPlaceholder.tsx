
import { ParkCard } from "./ui/park-card";

interface MapPlaceholderProps {
  height?: string;
  text?: string;
}

const MapPlaceholder = ({ 
  height = "400px", 
  text = "Map View"
}: MapPlaceholderProps) => {
  return (
    <ParkCard className="h-full">
      <div 
        className="bg-parkblue-light rounded-md flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center text-parkblue p-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 mx-auto mb-2" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
          </svg>
          <p className="text-lg font-medium">{text}</p>
          <p className="text-sm">Interactive map would be displayed here</p>
        </div>
      </div>
    </ParkCard>
  );
};

export default MapPlaceholder;
