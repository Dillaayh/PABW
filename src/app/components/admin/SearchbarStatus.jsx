'use client';

import { FaSearch } from "react-icons/fa";

export default function SearchBar({ searchTerm, onSearchChange, placeholder = "Mencari..." }) {
  return (
     <div className="flex flex-col sm:flex-row justify-between mt-[10px] mb-4 gap-4">
        <div className="flex items-center gap-2 border rounded-full px-2 py-2 w-[302px] ml-[60px] text-[#1A3A64] font-medium ">
          <FaSearch className="text-gray-400 mr-3" size={16} />
          <input
            type="text"
            placeholder="Mencari..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>
    </div>
  );
}