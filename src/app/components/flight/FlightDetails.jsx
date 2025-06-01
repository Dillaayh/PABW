// components/FlightDetails.jsx
import React from "react";

// FlightDetails.jsx
export default function FlightDetails({ index, name, handleChange }) {
  return (
    <div className="border rounded-2xl shadow border-[#3E588F] p-4 space-y-2 font-[Montserrat] text-[#203562]">
      <h3 className="text-lg font-semibold text-[#1E3A8A]">Penumpang {index + 1}</h3>
      <input
        type="text"
        name={`passengers[${index}].name`}
        value={name}
        onChange={handleChange}
        placeholder={`Nama Penumpang ${index + 1}`}
        className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
      />
    </div>
  );
}
