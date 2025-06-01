'use client';

import React, { useEffect, useState } from 'react';
import dataJson from '../../../mitra/data.json';
import SidebarMitraHotel from '../../../../components/sidebarMitra/hotel/page';

const statusDummy = ['Check Out', 'Check In', 'Dibatalkan', 'Menunggu'];
const warnaStatus = {
  'Check Out': 'bg-[#2E4374] text-white',
  'Check In': 'bg-[#5588C3] text-white',
  'Dibatalkan': 'bg-[#F32424] text-white',
  'Menunggu': 'bg-[#FFD93D] text-black',
};

export default function MelihatStatus() {
  const [kamar, setKamar] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State baru untuk pencarian
  const [showModal, setShowModal] = useState(false);
  const [selectedKamarDetail, setSelectedKamarDetail] = useState(null);
  const [originalKamarData, setOriginalKamarData] = useState([]); // State untuk menyimpan data asli sebelum filter

  useEffect(() => {
    // Dummy data untuk Check In, Check Out, Harga, dan Date Time
    const dummyCheckInOut = ['12.00', '14.00', '10.00', '16.00'];
    const dummyHarga = ['Rp 424.565', 'Rp 350.000', 'Rp 500.000', 'Rp 280.000'];
    const dummyDateTime = ['17/04/2025 11:58', '18/04/2025 10:30', '16/04/2025 09:00', '19/04/2025 15:00'];

    const kamarWithStatus = dataJson.kamarHotel.map((item, index) => ({
      ...item,
      identitas: ['Alifah Nur Aisyah', 'Dilla Ayu', 'Desti Nur Irawati', 'Syifa Maulida'][index % 4] || 'Tamu',
      status: statusDummy[index % statusDummy.length],
      checkIn: dummyCheckInOut[index % dummyCheckInOut.length],
      checkOut: dummyCheckInOut[(index + 1) % dummyCheckInOut.length],
      harga: dummyHarga[index % dummyHarga.length],
      dateTime: dummyDateTime[index % dummyDateTime.length],
    }));
    setOriginalKamarData(kamarWithStatus); // Simpan data asli
    setKamar(kamarWithStatus); // Inisialisasi data yang akan ditampilkan
  }, []);

  // Effect untuk melakukan filter saat searchTerm berubah
  useEffect(() => {
    if (searchTerm === '') {
      setKamar(originalKamarData); // Jika pencarian kosong, tampilkan semua data asli
      return;
    }

    const filteredKamar = originalKamarData.filter((item) =>
      item.tipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.identitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setKamar(filteredKamar);
  }, [searchTerm, originalKamarData]); // Dependensi: searchTerm dan originalKamarData

  const handleDetailClick = (kamarItem) => {
    setSelectedKamarDetail(kamarItem);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedKamarDetail(null);
  };

  return (
    <div className="flex min-h-screen font-sans text-[#3E588F]">
      <SidebarMitraHotel active="status" />

      <main className="flex-1 p-10 bg-white">
        <h2 className="text-xl text-center font-semibold mb-4 bg-[#C6DDF4] px-4 py-2 rounded-xl w-full text-[#3E588F]">
          Status Ketersediaan Kamar Hotel
        </h2>

        {/* Input pencarian dengan onChange handler */}
        <input
          type="text"
          placeholder="Pencarian"
          className="w-1/3 mb-4 px-4 py-2 border rounded-full focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-[#3E588F] text-white rounded-xl">
                <th className="px-4 py-2 text-left rounded-l-xl">No</th>
                <th className="px-4 py-2 text-left">Tipe Ruangan</th>
                <th className="px-4 py-2 text-left">Nomor Kamar</th>
                <th className="px-4 py-2 text-left">Identitas Pemesan</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left rounded-r-xl"> </th>
              </tr>
            </thead>
            <tbody>
              {kamar.length > 0 ? ( // Tambahkan kondisi jika tidak ada data
                kamar.map((item, index) => (
                  <tr key={index} className="bg-white shadow rounded-xl">
                    <td className="px-4 py-3 rounded-l-xl">{index + 1}</td>
                    <td className="px-4 py-3">{item.tipe}</td>
                    <td className="px-4 py-3">{item.nomor}</td>
                    <td className="px-4 py-3">{item.identitas}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${warnaStatus[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-blue-500 font-semibold hover:underline cursor-pointer rounded-r-xl"
                      onClick={() => handleDetailClick(item)}
                    >
                      Detail
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal untuk detail pemesanan */}
      {showModal && selectedKamarDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[450px] mx-auto">
            {/* Tombol Close */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-3xl font-bold leading-none"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-6 text-center text-[#3E588F]">
              Kartu Detail Identitas Pemesan Hotel
            </h3>
            <div className="space-y-4">
              {[
                ["Nama Lengkap", selectedKamarDetail.identitas],
                ["Check In", selectedKamarDetail.checkIn],
                ["Check Out", selectedKamarDetail.checkOut],
                ["Status", selectedKamarDetail.status],
                ["Harga", selectedKamarDetail.harga],
                ["Date Time", selectedKamarDetail.dateTime],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center">
                  <label className="w-2/5 text-[#3E588F] text-sm font-semibold">{label}</label>
                  <div className="flex-1 px-4 py-2 bg-[#C6DDF4] text-[#3E588F] font-normal rounded-full">
                    {value || "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}