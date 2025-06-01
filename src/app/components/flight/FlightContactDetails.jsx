// components/FlightContactDetails.jsx
import React from "react";

const FlightContactDetails = ({ formData, handleChange }) => {
  return (
    <div className="border rounded-2xl shadow border-[#3E588F]">
      <div className="bg-[#3E588F] text-white px-4 py-2 rounded-t-2xl">
        <h2 className="text-lg font-semibold">Detail Kontak (E-Ticket/Voucher)</h2>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E3A8A]">Nama Depan</label>
          <input
            name="kontakDepan"
            value={formData.kontakDepan}
            onChange={handleChange}
            className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
            placeholder="Lattema"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E3A8A]">Nama Belakang</label>
          <input
            name="kontakBelakang"
            value={formData.kontakBelakang}
            onChange={handleChange}
            className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
            placeholder="Huang"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E3A8A]">Nomor Telepon</label>
          <input
            name="kontakTelepon"
            value={formData.kontakTelepon}
            onChange={handleChange}
            className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
            placeholder="08123456789"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E3A8A]">Email</label>
          <input
            name="kontakEmail"
            value={formData.kontakEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
            placeholder="AleanorZelie@gmail.com"
          />
          <p className="text-xs text-gray-500 mt-1">Cth : AleanorZelie@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default FlightContactDetails;
