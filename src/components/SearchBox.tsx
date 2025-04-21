
import { Search } from "lucide-react";
import { ParkEaseButton } from "./ui/parkease-button";

interface SearchBoxProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const SearchBox = ({ placeholder, onSearch }: SearchBoxProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <div className="relative w-full">
        <input
          name="search"
          type="text"
          placeholder={placeholder}
          className="park-input pl-8"
        />
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      </div>
      <ParkEaseButton type="submit" className="ml-2">Search</ParkEaseButton>
    </form>
  );
};

export default SearchBox;
