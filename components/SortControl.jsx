"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

const statusOptions = ["all", "active", "inactive"];

function SortControl({ sortBy, onSortChange, statusFilter, onStatusFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
      >
        <Filter size={14} />
        Filter
      </button>


      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 p-2">

          <p className="text-xs text-gray-400 px-2">
            Sort by
          </p>

          <button
            onClick={() => {
              onSortChange("name");
              setIsOpen(false);
            }}
            className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${
              sortBy === "name"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            Name
          </button>


          <button
            onClick={() => {
              onSortChange("company");
              setIsOpen(false);
            }}
            className={`w-full text-left px-2 py-1.5 rounded-md text-sm ${
              sortBy === "company"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            Company
          </button>


          <p className="text-xs text-gray-400 px-2 mt-2 border-t pt-2">
            Status
          </p>


          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => {
                onStatusFilterChange(status);
                setIsOpen(false);
              }}
              className={`w-full text-left px-2 py-1.5 rounded-md text-sm capitalize ${
                statusFilter === status
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}

export default SortControl;