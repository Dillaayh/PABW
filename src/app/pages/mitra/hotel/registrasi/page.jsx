'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ⬅️ Tambahkan ini

export default function RegistrasiHotel() {
  const [form, setForm] = useState({
    namaHotel: '',
    kotaHotel: '',
    lokasiHotel: ''
  });

  const router = useRouter(); // ⬅️ Gunakan ini

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Data berhasil disimpan!');
    
    // Navigasi ke halaman kelola kamar
    router.push('/pages/mitra/hotel/kelolaKamar'); // ⬅️ Navigasi ke halaman kelola kamar
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Header full width */}
      <div className="bg-[#3D5895] px-6 py-4 flex items-center gap-4 w-full">
        <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
        <h1 className="text-white font-bold text-xl">Gebookin</h1>
      </div>

      <div className="px-4 md:px-20">
        <div className="mt-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#3D5895] mb-2">Informasi Lengkap Hotel</h2>
          <p className="text-sm text-[#F27521] mb-8">
            Silakan mengisi data lengkap hotel anda dengan benar dan sesuai!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-6">
          <div>
            <label className="block text-[#1E3269] font-semibold mb-1">Nama Hotel</label>
            <input
              type="text"
              name="namaHotel"
              value={form.namaHotel}
              onChange={handleChange}
              className="w-full bg-[#DCE3F3] p-4 rounded-xl outline-none text-black"
              placeholder="Contoh: Hotel Mawar"
              required
            />
          </div>

          <div>
            <label className="block text-[#1E3269] font-semibold mb-1">Kota Hotel</label>
            <input
              type="text"
              name="kotaHotel"
              value={form.kotaHotel}
              onChange={handleChange}
              className="w-full bg-[#DCE3F3] p-4 rounded-xl outline-none text-black"
              placeholder="Contoh: Jakarta"
              required
            />
          </div>

          <div>
            <label className="block text-[#1E3269] font-semibold mb-1">Lokasi Hotel</label>
            <input
              type="text"
              name="lokasiHotel"
              value={form.lokasiHotel}
              onChange={handleChange}
              className="w-full bg-[#DCE3F3] p-4 rounded-xl outline-none text-black"
              placeholder="Contoh: Jl. Merdeka No. 123"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#96B3E3] hover:bg-[#7c9ed3] text-[#1E3269] font-semibold px-6 py-2 rounded-xl"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
