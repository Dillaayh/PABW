'use client';

import SidebarMitraPenerbangan from '@/app/components/sidebarMitra/penerbangan/page';
import dataJson from '@/app/mitra/dataPenerbangan.json';
import { useEffect, useState } from 'react';

export default function MelihatStatus() {
  const [penerbangan, setPenerbangan] = useState([]);
  const [selectedPenerbangan, setSelectedPenerbangan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State baru untuk modal detail penumpang
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [selectedPassengerData, setSelectedPassengerData] = useState(null); 

  useEffect(() => {
    const penerbanganWithStatus = dataJson.penerbangan.map((item) => ({
      ...item,
      passengers: item.passengers || [
        { nama_penumpang: "Asiyah", no_kursi: "12A", status_penumpang: "Confirmed" },
        { nama_penumpang: "Dilla", no_kursi: "12B", status_penumpang: "Confirmed" },
        { nama_penumpang: "Desti", no_kursi: "13A", status_penumpang: "Confirmed" },
      ]
    }));
    setPenerbangan(penerbanganWithStatus);
  }, []);

  const handleDetailClick = (item) => {
    setSelectedPenerbangan(item);
    setShowModal(true);
  };

  // Fungsi baru untuk menampilkan modal detail penumpang
  const handlePassengerDetailClick = (item) => {
    setSelectedPassengerData(item.passengers); // Ambil array penumpang dari item penerbangan
    setShowPassengerModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPenerbangan(null);
  };

  // Fungsi baru untuk menutup modal detail penumpang
  const closePassengerModal = () => {
    setShowPassengerModal(false);
    setSelectedPassengerData(null);
  };

  return (
    <div className="flex min-h-screen font-sans">
      <SidebarMitraPenerbangan active="status" />

      <main className="flex-1 p-10 bg-white flex flex-col">
        <h2 className="text-center text-xl w-full font-semibold mb-4 bg-[#C6DDF4] px-4 py-2 rounded-xl text-[#2E4374]">
          Status Penerbangan
        </h2>

        <input
          type="text"
          placeholder="Pencarian"
          className="w-fit mr-auto text-black mb-4 px-4 py-2 border rounded-full focus:outline-none"
        />

        <div className="mr-auto overflow-x-auto w-full">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-[#8FAADC] text-white rounded-xl">
                <th className="px-4 py-2 text-left rounded-l-xl">No</th>
                <th className="px-4 py-2 text-left">Tipe Pesawat</th>
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">kode penerbangan</th>
                <th className="px-4 py-2 text-left">Detail Penerbangan</th>
                <th className="px-4 py-2 text-left rounded-r-xl">Detail Penumpang</th>
              </tr>
            </thead>
            <tbody>
              {penerbangan.map((item, index) => (
                <tr key={index} className="bg-white text-[#203562] shadow rounded-xl">
                  <td className="px-4 py-3 rounded-l-xl">{index + 1}</td>
                  <td className="px-4 py-3">{item.tipe_pesawat}</td>
                  <td className="px-4 py-3">{item.tanggal}</td>
                  <td className="px-4 py-3">{item.kode_penerbangan}</td>
                  <td
                    onClick={() => handleDetailClick(item)}
                    className="px-4 py-3 text-blue-500 font-semibold hover:underline cursor-pointer" // Removed rounded-r-xl here
                  >
                    Detail
                  </td>
                  <td
                    onClick={() => handlePassengerDetailClick(item)} // Menambahkan onClick untuk modal penumpang
                    className="px-4 py-3 text-blue-500 font-semibold hover:underline cursor-pointer rounded-r-xl" // Added rounded-r-xl here
                  >
                    Detail
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal Detail Penerbangan yang sudah ada */}
          {showModal && selectedPenerbangan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white w-[90%] md:w-[700px] rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <button onClick={closeModal} className="absolute top-4 right-4 text-red-500 text-xl font-bold">
                  ✕
                </button>
                <h2 className="text-lg text-[#3E588F] font-semibold text-center mb-4 bg-blue-200 py-2 rounded-xl">Detail Penerbangan</h2>

                <div className="flex flex-col gap-2 text-[#3E588F] text-sm bg-[#8FAADC] p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Maskapai Penerbangan</strong>
                    <input readOnly value={selectedPenerbangan.maskapai_penerbangan} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Tipe Pesawat</strong>
                    <input readOnly value={selectedPenerbangan.tipe_pesawat_penerbangan} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Kode Penerbangan</strong>
                    <input readOnly value={selectedPenerbangan.kode_penerbangan_detail} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Tanggal Penerbangan</strong>
                    <input readOnly value={selectedPenerbangan.tanggal_penerbangan} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Bandara Asal</strong>
                    <input readOnly value={selectedPenerbangan.bandara_asal} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Bandara Tujuan</strong>
                    <input readOnly value={selectedPenerbangan.bandara_tujuan_detail} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Waktu Keberangkatan</strong>
                    <input readOnly value={selectedPenerbangan.waktu_keberangkatan} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Waktu Tiba</strong>
                    <input readOnly value={selectedPenerbangan.waktu_tiba} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Harga</strong>
                    <input readOnly value={selectedPenerbangan.harga_penerbangan} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                </div>

                <div className="mt-4 pt-2 flex flex-col space-y-2 bg-[#8FAADC] rounded-lg p-4 text-sm text-[#3E588F]">
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Jumlah Penumpang Pesawat:</strong>
                    <input readOnly value={selectedPenerbangan.jumlah_penumpang_pesawat} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Jumlah kursi:</strong>
                    <input readOnly value={selectedPenerbangan.jumlah_kursi_penerbangan} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
                  <div className="flex justify-between items-center">
                    <strong className="w-2/5 text-[#3E588F]">Jumlah Penumpang Penerbangan:</strong>
                    <input readOnly value={selectedPenerbangan.jumlah_penumpang_penerbangan} className="bg-white w-3/5 px-1 py-0.5 border rounded text-xs" />
                  </div>
  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1"> {/* Mengatur jarak antar setiap pasangan kelas */}
    {Object.entries(selectedPenerbangan.kelas_penerbangan || {}).map(([kelas, jumlah], i) => (
      <div key={i} className="flex items-center gap-1"> {/* Container untuk angka dan nama kelas */}
        <span className="bg-white text-blue-800 px-2 py-0.5 rounded-full text-xs font-semibold">
          {jumlah}
        </span>
        <span className="text-sm font-medium text-[#3E588F]"> {/* Styling untuk teks nama kelas */}
          {kelas.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
        </span>
      </div>
    ))}
  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Detail Penumpang BARU */}
          {showPassengerModal && selectedPassengerData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white w-[90%] md:w-[700px] rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <button onClick={closePassengerModal} className="absolute top-4 right-4 text-red-500 text-xl font-bold">
                  ✕
                </button>
                <h2 className="text-lg text-[#3E588F] font-semibold text-center mb-4 bg-blue-200 py-2 rounded-xl">Informasi Penumpang</h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr className="bg-white text-[#203562] shadow rounded-xl">
                        <th className="px-4 py-2 text-left rounded-l-xl">No</th>
                        <th className="px-4 py-2 text-left">Nama Penumpang</th>
                        <th className="px-4 py-2 text-left">No. Kursi</th>
                        <th className="px-4 py-2 text-left rounded-r-xl">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPassengerData.map((passenger, pIndex) => (
                        <tr key={pIndex} className="bg-[#8FAADC] text-white shadow rounded-xl">
                          <td className="px-4 py-3 rounded-l-xl">{pIndex + 1}</td>
                          <td className="px-4 py-3">{passenger.nama_penumpang}</td>
                          <td className="px-4 py-3">{passenger.no_kursi}</td>
                          <td className="px-4 py-3 rounded-r-xl">{passenger.status_penumpang}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}