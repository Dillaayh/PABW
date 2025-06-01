// components/flight/InfoIdentitas.jsx
"use client";
import React from "react";

export default function InfoIdentitas({ formData }) {
  return (
    <div className="border border-[#3E588F] rounded-2xl shadow p-4 font-[Montserrat] text-[#203562] space-y-3">
      <h2 className="text-lg font-semibold">Informasi Penulisan Identitas</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-gray-100 p-4 rounded-md text-sm flex-1">
          <p>
            <strong>Nama:</strong>{" "}
            {formData.titleNama} {formData.namaDepan} {formData.namaBelakang}
          </p>
        </div>
        <div className="text-xs text-[#203562] flex-1 self-center">
          <p>
            Pastikan nama penumpang dimasukkan dengan tepat sesuai dengan yang tercantum pada tanda pengenal yang dikeluarkan pemerintah.
            <br />Ikuti contoh berikut:
          </p>
        </div>
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
