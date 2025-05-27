'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import data from '@/app/mitra/data.json'; // Assuming this path is correct for your project
import SidebarMitraHotel from '@/app/components/sidebarMitra/hotel/page'; // Assuming this path is correct

function ModalTambahKamar({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[90%] max-w-xl rounded-2xl p-4 relative shadow-lg"> {/* Padding diubah dari p-6 ke p-4 */}
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl p-1 rounded-full hover:bg-gray-100">
          <IoClose />
        </button>

        {/* Header */}
        <h3 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-2 rounded-xl mb-4"> {/* mb-6 ke mb-4 */}
          Tambah Kamar Hotel
        </h3>

        {/* Form */}
        <form className="space-y-3"> {/* space-y-4 ke space-y-3 */}
          <div className="grid grid-cols-3 gap-x-4">
            {/* Foto Upload */}
            <div className="col-span-1">
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Foto</label>
              <div className="border border-gray-300 rounded-xl flex items-center justify-center h-36 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"> {/* h-48 ke h-36 */}
                <span className="text-gray-400 flex items-center gap-2">
                  <span className="text-2xl">📤</span> Upload
                </span>
              </div>
            </div>

            {/* Tipe Ruangan dan Nomor Kamar */}
            <div className="col-span-2 space-y-3"> {/* space-y-4 ke space-y-3 */}
              <div>
                <label className="block text-sm font-bold text-[#3D5895] mb-1">Tipe Ruangan</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#3D5895] mb-1">Nomor Kamar</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]" />
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold text-[#3D5895] mb-1">Deskripsi Fasilitas</label>
            <textarea rows={2} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] resize-y focus:outline-none focus:ring-1 focus:ring-[#96B3E3]" /> {/* rows={3} ke rows={2} */}
          </div>

          {/* Harga */}
          <div>
            <label className="block text-sm font-bold text-[#3D5895] mb-1">Harga Per-Malam</label>
            <input type="text" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]" />
          </div>

          {/* Ukuran, Jumlah Kasur, Jenis Kasur */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Ukuran</label>
              <div className="relative">
                <input type="text" className="w-full border border-gray-300 rounded-xl px-3 py-2 pr-10 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">m²</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Jumlah Kasur</label>
              <input type="text" className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Jenis Kasur</label>
              <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] appearance-none bg-white pr-8 focus:outline-none focus:ring-1 focus:ring-[#96B3E3]">
                <option value="">Pilih</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="TwinBed">TwinBed</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
              </select>
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="text-right pt-4">
            <button
              type="submit"
              className="bg-[#96B3E3] hover:bg-[#7c9ed3] text-white px-8 py-2 rounded-xl font-semibold transition-colors duration-200"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// The KelolaKamar component remains the same as its changes were purely aesthetic and general
export default function KelolaKamar() {
  const [dataKamar, setDataKamar] = useState(data.kamarHotel);
  const [showModal, setShowModal] = useState(false); // Modal state

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarMitraHotel active="kelola" />

      <main className="flex-1 px-8 py-8">
        {/* Judul */}
        <h2 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-3 rounded-xl mb-6 shadow-sm">
          Kelola Kapasitas Kamar Swiss-Bellin Hotel
        </h2>

        {/* Tombol Tambah */}
        <div className="text-right mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex justify-start px-6 py-2 border border-[#3D5895] rounded-xl text-[#3D5895] font-semibold bg-[#e6ebf5] hover:bg-[#d6e0f0] transition-colors duration-200 shadow-sm"
          >
            Tambah Kamar
          </button>
        </div>

        {/* Tabel Data Kamar */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-[#3D5895] text-white">
              <tr>
                <th className="p-3 text-left w-[5%] rounded-tl-xl">No</th>
                <th className="p-3 text-left w-[20%]">Tipe Ruangan</th>
                <th className="p-3 text-left w-[15%]">Nomor Kamar</th>
                <th className="p-3 text-left w-[15%]">Jenis Kasur</th>
                <th className="p-3 text-left w-[10%]">Ukuran</th>
                <th className="p-3 text-left w-[15%]">Harga</th>
                <th className="p-3 text-left w-[10%] rounded-tr-xl">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataKamar.map((kamar, idx) => (
                <tr key={idx} className="border-t border-gray-200 text-[#1E3269] even:bg-gray-50 hover:bg-blue-50 transition-colors duration-150">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{kamar.tipe}</td>
                  <td className="p-3">{kamar.nomor}</td>
                  <td className="p-3">{kamar.kasur}</td>
                  <td className="p-3">{kamar.ukuran.toFixed(1)}</td>
                  <td className="p-3">Rp {kamar.harga.toLocaleString('id-ID')}</td>
                  <td className="p-3 flex items-center gap-3">
                    <button className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-100 transition-colors duration-150">
                      <FaTrash />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 p-1 rounded-md hover:bg-blue-100 transition-colors duration-150">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Ensure there are at least 6 rows for consistent look if data is less */}
              {Array.from({ length: Math.max(0, 6 - dataKamar.length) }).map((_, i) => (
                <tr key={`empty-${i}`} className="h-12 border-t border-gray-200 even:bg-gray-50">
                  <td colSpan="7"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal Tambah */}
        {showModal && <ModalTambahKamar onClose={() => setShowModal(false)} />}
      </main>
    </div>
  );
}