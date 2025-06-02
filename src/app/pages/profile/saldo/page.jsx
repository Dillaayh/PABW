'use client';

import { useEffect, useState } from 'react';
import {
  FaMoneyBillWave,
} from 'react-icons/fa6';
import { HiUserAdd, HiUserRemove } from 'react-icons/hi';
import SidebarProfile from '../../components/sidebarProfile/SidebarProfile';

export default function SaldoPage() {
  const [saldo, setSaldo] = useState(null);
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function ambilData() {
      try {
        setMemuat(true);
        setError(null);

        // Ambil data transaksi dari backend
        const response = await fetch('http://localhost:5000/api/my-transaksi', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const transaksiData = result.data || [];

        // Hitung saldo berdasarkan transaksi yang sukses
        let totalSaldo = 0;
        const riwayatFormatted = transaksiData
          .filter(transaksi => transaksi.status === 'success') // Hanya transaksi yang sukses
          .map(transaksi => {
            const isIncoming = transaksi.tipe === 'masuk';
            const amount = isIncoming ? transaksi.jumlah : -transaksi.jumlah;
            totalSaldo += amount;

            return {
              id: transaksi.id_transaksi,
              tanggal: new Date(transaksi.createdAt || Date.now()).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              deskripsi: getDeskripsiTransaksi(transaksi),
              jumlah: isIncoming ? `+${transaksi.jumlah}` : `-${transaksi.jumlah}`,
              tipe: transaksi.tipe,
              status: transaksi.status
            };
          });

        setSaldo(totalSaldo);
        setRiwayatTransaksi(riwayatFormatted);
        setMemuat(false);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
        setError('Gagal memuat data saldo. Silakan coba lagi.');
        setMemuat(false);
      }
    }

    ambilData();
  }, []);

  // Fungsi untuk menentukan deskripsi transaksi
  function getDeskripsiTransaksi(transaksi) {
    if (transaksi.tipe === 'masuk') {
      // Jika id_detail null berarti top up/tarik
      if (!transaksi.id_detail || transaksi.id_detail === null) {
        return 'Tambah Saldo';
      } else {
        // Jika ada id_detail berarti ada relasi dengan booking
        return 'Refund Booking';
      }
    } else {
      // Untuk transaksi keluar
      if (!transaksi.id_detail || transaksi.id_detail === null) {
        return 'Tarik Saldo';
      } else {
        return 'Pembayaran Booking';
      }
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#EAF0FF] p-4 lg:p-8 text-black">
      {/* Sidebar */}
      <SidebarProfile />

      {/* Konten Utama */}
      <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8 lg:ml-8">
        <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">Saldo Saya</h2>

        {/* Kartu Saldo */}
        <div className="bg-[#B3C2E8] rounded-2xl p-6 flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow">
            <FaMoneyBillWave className="text-3xl text-black mb-4" />
            <p className="text-sm text-black font-medium">Saldo Tersedia</p>
            <p className="text-lg text-black font-semibold">
              {memuat ? 'Memuat...' : 
                error ? 'Error' :
                saldo !== null
                ? saldo.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : 'Rp 0'}
            </p>
          </div>
        </div>

        {/* Riwayat Transaksi */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Riwayat Transaksi</h3>
          {memuat ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-600">Sedang memuat riwayat transaksi...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : riwayatTransaksi.length === 0 ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-500">Belum ada transaksi yang tersedia.</p>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
              {riwayatTransaksi.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#F5F7FB] rounded-xl px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-white rounded-full p-2 shadow">
                      {item.tipe === 'masuk' ? (
                        <HiUserAdd className="text-green-500 text-xl" />
                      ) : (
                        <HiUserRemove className="text-red-500 text-xl" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">{item.deskripsi}</p>
                      <p className="text-xs text-gray-500">{item.tanggal}</p>
                      {item.status && (
                        <p className={`text-xs font-medium ${
                          item.status === 'success' ? 'text-green-600' : 
                          item.status === 'pending' ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {item.status === 'success' ? 'Berhasil' : 
                           item.status === 'pending' ? 'Pending' : 
                           'Gagal'}
                        </p>
                      )}
                    </div>
                  </div>
                  <p
                    className={`text-sm font-bold ${
                      item.jumlah.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {parseInt(item.jumlah).toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}