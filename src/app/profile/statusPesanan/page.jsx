'use client';

import SidebarProfile from "../../components/sidebarProfile/SidebarProfile";
import dataPesanan from '../../profile/statusPesanan/pesanan.json';
import Link from 'next/link';
import { FaHotel, FaPlaneDeparture } from 'react-icons/fa';

export default function StatusPesanan() {
  const pesanan = dataPesanan;

  return (
    <div className="flex flex-row min-h-screen bg-[#EAF0FF] p-4 lg:p-8 text-black">
      <SidebarProfile />

      {/* Status Pesanan */}
      <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8 lg:ml-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Status Pesanan</h2>
        {pesanan.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada pesanan.</p>
        ) : (
          <div className="space-y-4">
            {pesanan.map((item) => (
              <Link
                key={item.id}
                href={`/profile/statusPesanan/${item.id}`}
                className="block"
              >
                <div className="flex justify-between items-start bg-[#D4DCF1] rounded-2xl p-4 hover:shadow-md hover:scale-[1.01] transition duration-200">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl text-[#324C9B]">
                      {item.type === 'hotel' ? <FaHotel /> : <FaPlaneDeparture />}
                    </div>
                    <div className="text-sm space-y-1">
                      <h3 className="font-semibold text-base">{item.nama}</h3>

                      {item.type === 'hotel' ? (
                        <>
                          <p>Check-in <span className='p-8'>{item.checkin}</span></p>
                          <p>Check-out <span className='p-6'>{item.checkout}</span></p>
                          <p className="text-gray-600">{item.catatan}</p>
                        </>
                      ) : (
                        <>
                          <p>Berangkat <span className='p-8'>{item.berangkat}</span></p>
                          <p>Tiba <span className='p-17'>{item.tiba}</span></p>
                          <p className="text-gray-600">Durasi: {item.durasi}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="mb-1">{item.tanggal}</p>
                    <span
                      className={`font-semibold px-3 py-1 rounded-full ${
                        item.status === 'Berhasil'
                          ? 'bg-[#E3E8F8] text-black'
                          : item.status === 'Dibatalkan'
                          ? 'bg-[#E3E8F8] text-black'
                          : 'bg-[#E3E8F8] text-black'
                      }`}
                    >
                      <span className='inline-block py-5'>{item.status}</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
