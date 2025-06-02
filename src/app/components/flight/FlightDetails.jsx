// components/flight/FlightDetails.jsx
import React from "react";

export default function FlightDetails({ index, passenger, handleChange }) {
  return (
    <div className="border rounded-2xl shadow border-[#3E588F] font-[Montserrat]">
      <div className="bg-[#3E588F] text-white px-4 py-2 rounded-t-2xl">
        <h3 className="text-lg font-semibold">Penumpang {index + 1}</h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#203562]">Title Nama</label>
          <select
            name={`passengers[${index}].title`}
            value={passenger.title}
            onChange={handleChange}
            className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
          >
            <option value="">Pilih Title</option>
            <option value="Tuan">Tuan</option>
            <option value="Nyonya">Nyonya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#203562]">Nama Depan</label>
          <input
            type="text"
            name={`passengers[${index}].firstName`}
            value={passenger.firstName}
            onChange={handleChange}
            placeholder="Nama Depan"
            className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#203562]">Nama Belakang</label>
          <input
            type="text"
            name={`passengers[${index}].lastName`}
            value={passenger.lastName}
            onChange={handleChange}
            placeholder="Nama Belakang"
            className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
          />
        </div>
      </div>
    </div>
  );
}
