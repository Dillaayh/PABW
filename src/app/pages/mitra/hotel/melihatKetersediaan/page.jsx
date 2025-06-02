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
    <div className="flex min-h-screen font-montserrat">
      {/* Sidebar untuk Mitra Hotel */}
      <SidebarMitraHotel active="MelihatStatus" />

      {/* Konten Utama Halaman */}
      <main className="flex-1 p-10 bg-white font-montserrat">
        {/* Judul halaman */}
        <h2 className="text-center text-xl font-bold text-[#3D5895] bg-[#8FAADC] py-3 rounded-xl mb-6 shadow-sm font-montserrat"> Status Ketersediaan Publikasi</h2>

        {/* Daftar kamar */}
        <div className="space-y-6 font-montserrat">
          {dummyData.map((kamar, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 font-montserrat"
            >
              {/* Judul kamar */}
              <h3 className="text-2xl font-bold text-[#3E588F] mb-4 font-montserrat">
                {kamar.judul}
              </h3>

              <div className="flex flex-col md:flex-row gap-4 items-start font-montserrat">
                {/* Gambar */}
                <img
                  src={kamar.imageSrc}
                  alt={`Gambar ${kamar.judul}`}
                  className="w-full md:w-64 h-40 object-cover rounded-lg font-montserrat"
                />

                {/* Tabel */}
                <div className="flex-1 font-montserrat">
                  <table className="w-full border-collapse text-[#3E588F] border border-[#3E588F] font-montserrat">
                    <thead>
                      <tr className="bg-[#3E588F] text-white font-montserrat">
                        {/* Menambahkan border kanan untuk pemisah kolom */}
                        <th className="px-4 py-2 text-left rounded-tl-lg border-r border-[#3E588F] font-montserrat">Pilihan Ruangan</th>
                        <th className="px-4 py-2 text-right rounded-tr-lg font-montserrat">Kapasitas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kamar.pilihan.map((item, idx) => (
                        <tr key={idx} className="border-t border-[#3E588F] font-montserrat">
                          {/* Menambahkan border kanan untuk pemisah kolom */}
                          <td className="px-4 py-2 text-sm border-r border-[#3E588F] font-montserrat">
                            {item.nama}
                            {/* Menampilkan status sarapan */}
                            {item.sarapan !== undefined && (
                              <span className="block text-xs text-gray-500 font-montserrat">
                                {item.sarapan ? 'Termasuk sarapan' : 'Tidak termasuk sarapan'}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-right font-bold font-montserrat">{item.kapasitas}</td>
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