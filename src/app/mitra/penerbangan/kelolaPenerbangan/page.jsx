'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import data from '@/app/mitra/dataPenerbangan.json';
import SidebarPenerbangan from '@/app/components/sidebarMitra/penerbangan/page';

// -------------------- Modal Tambah Penerbangan Component (Modifikasi) --------------------
function ModalTambahPenerbangan({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[90%] max-w-2xl rounded-2xl p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl p-1 rounded-full hover:bg-gray-100">
          <IoClose />
        </button>
        <h3 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-2 rounded-xl mb-6">
          Tambah Penerbangan
        </h3>
        <form className="space-y-4">
          {/* Tipe Pesawat Penerbangan & Kode Penerbangan - MODIFIKASI */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Tipe Pesawat Penerbangan</label>
              {/* Tambahkan placeholder tak terlihat untuk menyelaraskan */}
              <p className="text-xs text-gray-500 mb-1 invisible">Placeholder</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Kode Penerbangan</label>
              <p className="text-xs text-gray-500 mb-1">Dapat berupa Huruf dan Angka (contoh: GA 1234)</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Bandara Asal & Bandara Tujuan (Tidak Berubah, asumsikan tidak ada isu alignment di sini) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Bandara Asal</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Bandara Tujuan</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Waktu Keberangkatan & Waktu Tiba (Tidak Berubah) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Waktu Keberangkatan</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Waktu Tiba</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Tanggal Keberangkatan (Tidak Berubah) */}
          <div>
            <label className="block text-sm font-bold text-[#3D5895] mb-1">Tanggal Keberangkatan</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
            />
          </div>

          {/* Harga Per-Pajak (Tidak Berubah) */}
          <div>
            <label className="block text-sm font-bold text-[#3D5895] mb-1">Harga Per-Pajak</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-8 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

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
// -------------------- End Modal Tambah Penerbangan Component --------------------

// -------------------- Modal Tambah Pesawat Component (Modifikasi) --------------------
function ModalTambahPesawat({ onClose }) {
  const [kelasSeats, setKelasSeats] = useState({
    ekonomi: '',
    ekonomiPremium: '',
    bisnis: '',
    firstClass: '',
  });

  const handleSeatChange = (kelas, value) => {
    setKelasSeats((prev) => ({
      ...prev,
      [kelas]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[90%] max-w-2xl rounded-2xl p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl p-1 rounded-full hover:bg-gray-100">
          <IoClose />
        </button>
        <h3 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-2 rounded-xl mb-6">
          Tambah Pesawat
        </h3>
        <form className="space-y-4">
          {/* Tipe Pesawat Penerbangan & Kode Penerbangan - MODIFIKASI */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Tipe Pesawat Penerbangan</label>
              {/* Tambahkan placeholder tak terlihat untuk menyelaraskan */}
              <p className="text-xs text-gray-500 mb-1 invisible">Placeholder</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Kode Penerbangan</label>
              <p className="text-xs text-gray-500 mb-1">Dimulai dua misal maskapai dan 3 digit nomor maskapai</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Bandara Asal & Bandara Tujuan (Tidak Berubah, asumsikan tidak ada isu alignment di sini) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Bandara Asal</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Bandara Tujuan</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Kursi Pesawat & Jumlah Penumpang Pesawat (Modifikasi, asumsikan memiliki isu alignment yang sama) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Kursi Pesawat (Total)</label>
              {/* Tambahkan placeholder tak terlihat untuk menyelaraskan */}
              <p className="text-xs text-gray-500 mb-1 invisible">Placeholder</p>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Jumlah Penumpang Pesawat</label>
              <p className="text-xs text-gray-500 mb-1">(Jumlah penumpang yang dapat disediakan)</p>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Kelas Penerbangan (Tidak Berubah, karena sudah sejajar dengan cara sebelumnya) */}
          <div>
            <label className="block text-sm font-bold text-[#3D5895] mb-1">Jumlah Kursi per Kelas Penerbangan</label>
            <p className="text-xs text-gray-500 mb-2">(Tentukan jumlah kursi yang tersedia untuk setiap kelas)</p>
            <div className="flex flex-nowrap items-center gap-x-4 overflow-x-auto pb-2">
              {/* Ekonomi */}
              <div className="flex-shrink-0 flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center"
                  value={kelasSeats.ekonomi}
                  onChange={(e) => handleSeatChange('ekonomi', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap">Ekonomi</span>
              </div>

              {/* Ekonomi Premium */}
              <div className="flex-shrink-0 flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center"
                  value={kelasSeats.ekonomiPremium}
                  onChange={(e) => handleSeatChange('ekonomiPremium', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap">Ekonomi Premium</span>
              </div>

              {/* Bisnis */}
              <div className="flex-shrink-0 flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center"
                  value={kelasSeats.bisnis}
                  onChange={(e) => handleSeatChange('bisnis', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap">Bisnis</span>
              </div>

              {/* First Class */}
              <div className="flex-shrink-0 flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center"
                  value={kelasSeats.firstClass}
                  onChange={(e) => handleSeatChange('firstClass', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap">First Class</span>
              </div>
            </div>
          </div>

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
// -------------------- End Modal Tambah Pesawat Component --------------------


export default function KelolaPenerbangan() {
  const [dataPenerbangan, setDataPenerbangan] = useState(data.penerbangan);
  const [showAddPenerbanganModal, setShowAddPenerbanganModal] = useState(false);
  const [showAddPesawatModal, setShowAddPesawatModal] = useState(false);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <SidebarPenerbangan active="kelola" />

      {/* Main Content */}
      <main className="flex-1 px-6 py-6">
        <div className="w-full bg-[#8FAADC] py-2 mb-6 rounded-xl">
          <h2 className="text-center text-xl font-bold text-[#3E588F]">
            Kelola Jadwal Penerbangan
          </h2>
        </div>

        <div className="text-right mb-4">
          <button
            onClick={() => setShowAddPenerbanganModal(true)}
            className="px-4 py-2 border border-[#3D5895] rounded-xl text-[#3D5895] font-semibold hover:bg-[#e6ebf5]"
          >
            Tambah Penerbangan
          </button>
          <button
            onClick={() => setShowAddPesawatModal(true)}
            className="px-4 py-2 border border-[#3D5895] rounded-xl text-[#3D5895] font-semibold hover:bg-[#e6ebf5] ml-2"
          >
            Tambah Pesawat
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-[#3D5895] rounded-xl overflow-hidden text-sm">
            <thead className="bg-[#8FAADC] text-[#3E588F]">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Tipe Pesawat</th>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Kode Penerbangan</th>
                <th className="p-3 text-left">Bandara Keberangkatan</th>
                <th className="p-3 text-left">Bandara Tujuan</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataPenerbangan.map((item) => (
                <tr key={item.id} className="border-t text-[#1E3269] even:bg-gray-50 hover:bg-blue-50 transition-colors duration-150">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.tipe_pesawat}</td>
                  <td className="p-3">{item.tanggal}</td>
                  <td className="p-3">{item.kode_penerbangan}</td>
                  <td className="p-3">{item.bandara_keberangkatan}</td>
                  <td className="p-3">{item.bandara_tujuan}</td>
                  <td className="p-3 flex gap-3">
                    <button className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-100 transition-colors duration-150">
                      <FaTrash />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 p-1 rounded-md hover:bg-blue-100 transition-colors duration-150">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-[#96B3E3] hover:bg-[#7c9ed3] text-white font-semibold px-6 py-2 rounded-xl">
            Simpan
          </button>
        </div>
      </main>

      {/* Render Modal Tambah Penerbangan jika showAddPenerbanganModal true */}
      {showAddPenerbanganModal && <ModalTambahPenerbangan onClose={() => setShowAddPenerbanganModal(false)} />}

      {/* Render Modal Tambah Pesawat jika showAddPesawatModal true */}
      {showAddPesawatModal && <ModalTambahPesawat onClose={() => setShowAddPesawatModal(false)} />}
    </div>
  );
}