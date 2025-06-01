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

  useEffect(() => {
    async function ambilData() {
      try {
        // Ganti dengan API backend
        const data = {
          saldo: 50000000,
          riwayat: [
            {
              id: 1,
              tanggal: '06 Maret 2025 13:00',
              deskripsi: 'Hotel Platinum',
              jumlah: '-200000',
              tipe: 'keluar', // transaksi uang keluar
            },
            {
              id: 2,
              tanggal: '14 Maret 2025 12:00',
              deskripsi: 'Top up',
              jumlah: '+500000',
              tipe: 'masuk', // transaksi uang masuk
            },
            {
              id: 3,
              tanggal: '14 Maret 2025 13:00',
              deskripsi: 'Top up',
              jumlah: '+200000',
              tipe: 'masuk', // transaksi uang masuk
            },
            {
              id: 4,
              tanggal: '15 Maret 2025 10:00',
              deskripsi: 'Top up',
              jumlah: '+200000',
              tipe: 'masuk', // transaksi uang masuk
            },
          ],
        };

        setSaldo(data.saldo);
        setRiwayatTransaksi(data.riwayat);
        setMemuat(false);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    }

    ambilData();
  }, []);

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
              {saldo !== null
                ? saldo.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                : 'Memuat...'}
            </p>
          </div>
          
        </div>

        {/* Riwayat Transaksi */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Riwayat Transaksi</h3>
          {memuat ? (
            <p>Sedang memuat riwayat transaksi...</p>
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
