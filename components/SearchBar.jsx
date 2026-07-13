import { Search } from "lucide-react";

function SearchBar({ value, onChange }) {
  function handleInputChange(event) {
    const newValue = event.target.value;
    onChange(newValue);
  }

  return (
    <div className="relative w-64">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search by name, email, or company..."
        value={value}
        onChange={handleInputChange}
        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;