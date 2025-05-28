'use client';

import React, { useState } from 'react';
import SidebarPenerbangan from '@/app/components/sidebarMitra/penerbangan/page'; // Sidebar tidak disertakan sesuai permintaan

// Data dummy untuk tabel
const flightData = [
  {
    no: 1,
    tipePesawat: 'Airbus',
    tanggal: '12/04/2025',
    kodePenerbangan: 'GA 001',
    bandaraKeberangkatan: 'Bandara Internasional Soekarno-Hatta (CGK)',
    bandaraTujuan: 'Bandara Internasional Kuala Namu (KNO)',
    jumlahPenumpang: 360,
  },
  {
    no: 2,
    tipePesawat: 'Boeing',
    tanggal: '13/04/2025',
    kodePenerbangan: 'GA 202',
    bandaraKeberangkatan: 'Bandara Internasional Adisutjipto (JOG)',
    bandaraTujuan: 'Bandara Internasional Ngurah Rai (DPS)',
    jumlahPenumpang: 180,
  },
  {
    no: 3,
    tipePesawat: 'Garuda',
    tanggal: '14/04/2025',
    kodePenerbangan: 'GA 503',
    bandaraKeberangkatan: 'Bandara Internasional Yogyakarta (YIA)',
    bandaraTujuan: 'Bandara Internasional Minangkabau (PDG)',
    jumlahPenumpang: 190,
  },
  {
    no: 4,
    tipePesawat: 'ATR',
    tanggal: '15/04/2025',
    kodePenerbangan: 'GA 604',
    bandaraKeberangkatan: 'Bandara Internasional Sultan Aji Muhammad Sulaiman Sepinggan (BPN)',
    bandaraTujuan: 'Bandara Internasional Juanda (SUB)',
    jumlahPenumpang: 120,
  },
];

export default function MelihatKetersediaan() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data berdasarkan search term (jika ada)
  const filteredData = flightData.filter(flight =>
    Object.values(flight).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex min-h-screen font-sans">
      <SidebarPenerbangan active="MelihatStatus" />

      <main className="flex-1 p-10 bg-[#EEF5FF]">
        {/* Judul halaman */}
        <div className="bg-[#C6DDF4] rounded-xl px-6 py-4 mb-8 w-full text-center"> {/* w-full dan text-center */}
          <h2 className="text-2xl font-semibold text-[#3E588F]">
            Kelola Kapasitas Penerbangan Garuda
          </h2>
        </div>

        {/* Search Input */}
        <div className="mb-6 flex justify-start"> {/* Pindahkan ke kanan */}
          <input
            type="text"
            placeholder="Cari..."
            className="w-fit mr-auto text-black mb-4 px-4 py-2 border rounded-full focus:outline-none" // Sesuaikan lebar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabel Data Penerbangan */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-[#C6DDF4] text-[#3E588F]">
              <tr>
                <th className="p-3 text-left w-[5%] rounded-tl-xl">No.</th>
                <th className="p-3 text-left w-[12%]">Tipe Pesawat</th>
                <th className="p-3 text-left w-[10%]">Tanggal</th>
                <th className="p-3 text-left w-[15%]">Kode Penerbangan</th>
                <th className="p-3 text-left w-[20%]">Bandara Keberangkatan</th>
                <th className="p-3 text-left w-[20%]">Bandara Tujuan</th>
                <th className="p-3 text-left w-[10%] rounded-tr-xl">Jumlah Penumpang</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((data, idx) => (
                  <tr key={idx} className="border-t border-gray-200 text-[#1E3269] even:bg-gray-50 hover:bg-blue-50 transition-colors duration-150">
                    <td className="p-3">{data.no}</td>
                    <td className="p-3">{data.tipePesawat}</td>
                    <td className="p-3">{data.tanggal}</td>
                    <td className="p-3">{data.kodePenerbangan}</td>
                    <td className="p-3">{data.bandaraKeberangkatan}</td>
                    <td className="p-3">{data.bandaraTujuan}</td>
                    <td className="p-3">{data.jumlahPenumpang}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-3 text-center text-gray-500">Tidak ada data yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}