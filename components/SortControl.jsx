"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

const statusOptions = ["all", "active", "inactive"];

function OptionButton({ label, isSelected, onClick }) {
  let buttonStyle;
  if (isSelected) {
    buttonStyle = "bg-blue-50 text-blue-600";
  } else {
    buttonStyle = "hover:bg-gray-50";
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-2 py-1.5 rounded-md text-sm capitalize ${buttonStyle}`}
    >
      {label}
    </button>
  );
}

function SortControl({ sortBy, onSortChange, statusFilter, onStatusFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleSortClick(newSortBy) {
    onSortChange(newSortBy);
    setIsOpen(false);
  }

  function handleStatusClick(newStatus) {
    onStatusFilterChange(newStatus);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
      >
        <Filter size={14} />
        Filter
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
          <p className="text-xs text-gray-400 px-2 pt-1 pb-1">Sort by</p>

          <OptionButton
            label="Name"
            isSelected={sortBy === "name"}
            onClick={() => handleSortClick("name")}
          />
          <OptionButton
            label="Company"
            isSelected={sortBy === "company"}
            onClick={() => handleSortClick("company")}
          />

          <p className="text-xs text-gray-400 px-2 pt-2 pb-1 border-t border-gray-100 mt-1">Status</p>

          {statusOptions.map((status) => (
            <OptionButton
              key={status}
              label={status}
              isSelected={statusFilter === status}
              onClick={() => handleStatusClick(status)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SortControl;