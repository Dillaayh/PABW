'use client';

import { useRouter } from 'next/navigation';
import { FaPlaneDeparture, FaHotel } from 'react-icons/fa';
import Image from 'next/image';

export default function MitraPage() {
  const router = useRouter();

  const handleSelect = (type) => {
    if (type === 'hotel') {
      router.push('/mitra/hotel/registrasi');
    } else {
      alert('Halaman ini hanya untuk mitra hotel.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#1E3269] mb-2">
        Hello, Silakan Tentukan anda akan bergabung <br /> sebagai mitra apa?
      </h2>
      <p className="text-sm text-[#F27521] mb-10">
        Pemilihan kategori mitra hanya dapat dilakukan sekali, setelah login pertama kali!
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <button
          onClick={() => handleSelect('penerbangan')}
          className="bg-[#96B3E3] p-8 rounded-2xl w-56 h-56 flex flex-col items-center justify-center shadow hover:scale-105 transition"
        >
          <FaPlaneDeparture className="text-5xl text-[#324C9B] mb-4" />
          <span className="text-lg font-semibold text-[#1E3269]">PENERBANGAN</span>
        </button>

        <button
          onClick={() => handleSelect('hotel')}
          className="bg-[#96B3E3] p-8 rounded-2xl w-56 h-56 flex flex-col items-center justify-center shadow hover:scale-105 transition"
        >
          <FaHotel className="text-5xl text-[#324C9B] mb-4" />
          <span className="text-lg font-semibold text-[#1E3269]">HOTEL</span>
        </button>
      </div>
    </div>
  );
}
