'use client';

import React from 'react';
import SidebarMitraHotel from '../../../../components/sidebarMitra/hotel/page';

const dummyData = [
  {
    judul: 'Deluxe Twin City View',
    imageSrc: '/images/hotel.svg',
    pilihan: [
      {
        nama: 'Deluxe Double',
        sarapan: false, 
        kapasitas: 10
      },
      {
        nama: 'Deluxe Double',
        sarapan: true, 
        kapasitas: 10
      },
    ],
  },
  {
    judul: 'Deluxe Double',
    imageSrc: '/images/hotel.svg', 
    pilihan: [
      {
        nama: 'Deluxe Double',
        sarapan: false,
        kapasitas: 8
      },
      {
        nama: 'Deluxe Double',
        sarapan: true,
        kapasitas: 8
      },
    ],
  },
  {
    judul: 'Superior Deluxe',
    imageSrc: '/images/hotel.svg',
    pilihan: [
      {
        nama: 'Superior',
        sarapan: false,
        kapasitas: 5
      },
      {
        nama: 'Superior',
        sarapan: true,
        kapasitas: 6
      },
    ],
  },
];

export default function MelihatKetersediaan() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar untuk Mitra Hotel */}
      <SidebarMitraHotel active="MelihatStatus" />

      {/* Konten Utama Halaman */}
      <main className="flex-1 p-10 bg-[#EEF5FF]">
        {/* Judul halaman */}
        <div className="bg-[#C6DDF4] rounded-xl px-6 py-4 mb-8 w-full text-center">
  <h2 className="text-2xl font-semibold text-[#3E588F]">
    Status Ketersediaan Publikasi
  </h2>
</div>

        {/* Daftar kamar */}
        <div className="space-y-6">
          {dummyData.map((kamar, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
            >
              {/* Judul kamar */}
              <h3 className="text-2xl font-bold text-[#3E588F] mb-4">
                {kamar.judul}
              </h3>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                {/* Gambar */}
                <img
                  src={kamar.imageSrc}
                  alt={`Gambar ${kamar.judul}`}
                  className="w-full md:w-64 h-40 object-cover rounded-lg"
                />

                {/* Tabel */}
                <div className="flex-1">
                  <table className="w-full border-collapse text-[#3E588F] border border-[#3E588F]">
                    <thead>
                      <tr className="bg-[#3E588F] text-white">
                        {/* Menambahkan border kanan untuk pemisah kolom */}
                        <th className="px-4 py-2 text-left rounded-tl-lg border-r border-[#3E588F]">Pilihan Ruangan</th>
                        <th className="px-4 py-2 text-right rounded-tr-lg">Kapasitas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kamar.pilihan.map((item, idx) => (
                        <tr key={idx} className="border-t border-[#3E588F]">
                          {/* Menambahkan border kanan untuk pemisah kolom */}
                          <td className="px-4 py-2 text-sm border-r border-[#3E588F]">
                            {item.nama}
                            {/* Menampilkan status sarapan */}
                            {item.sarapan !== undefined && (
                              <span className="block text-xs text-gray-500">
                                {item.sarapan ? 'Termasuk sarapan' : 'Tidak termasuk sarapan'}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-right font-bold">{item.kapasitas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
