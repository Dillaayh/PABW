// components/flight/InfoIdentitas.jsx
"use client";
import React from "react";

export default function InfoIdentitas({ formData }) {
  return (
    <div className="border border-[#3E588F] rounded-2xl shadow p-4 font-[Montserrat] text-[#203562] space-y-3">
      <h2 className="text-lg font-semibold">Informasi Penulisan Identitas</h2>
      <div className="space-y-2">
        {formData.passengers.map((passenger, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-4 border-b pb-2 last:border-none"
          >
            <div className="bg-gray-100 p-4 rounded-md text-sm flex-1">
              <p>
                <strong>Nama Penumpang {index + 1}:</strong>{" "}
                {passenger.title} {passenger.firstName} {passenger.lastName}
              </p>
            </div>
            <div className="text-xs text-[#203562] flex-1 self-center">
              <p>
                Pastikan nama penumpang dimasukkan dengan tepat sesuai dengan yang tercantum pada tanda pengenal yang dikeluarkan pemerintah.
                <br />Ikuti contoh berikut:
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm font-medium">Maka Penulisan nama seharusnya:</p>
        <div className="flex flex-wrap gap-4 text-sm pt-1">
          <p>Nama Depan: <strong>Lattema</strong></p>
          <p>Nama Belakang: <strong>Aleanor Zelie</strong></p>
        </div>
      </div>
    </div>
  );
}
