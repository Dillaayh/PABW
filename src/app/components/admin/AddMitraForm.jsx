'use client';

import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function AddMitraForm() {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [nomorTelepon, setNomorTelepon] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Mitra:', formData);
    alert('Data mitra berhasil ditambahkan!');
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-full max-w-3xl mx-auto">
      <h2 className="text-[25px] font-bold mb-1">Menambahkan Mitra</h2>
      <p className="text-[12px] text-[#F36614] mb-4">
        Untuk menambahkan mitra, tolong perhatikan detail data yang akan diisi telah sesuai dan benar dengan data mitra.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Nama Perusahaan</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border rounded-[30px] px-3 py-2"
            placeholder="Contoh PT. Geriya"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nama Mitra</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border rounded-[30px] px-3 py-2"
            placeholder="Contoh Garuda Indonesia"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-[30px] px-3 py-2"
            placeholder="Masukkan Email Anda"
          />
        </div>

         <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-black font-medium">No.Telepon</label>
          <input
            type="tel"
            id="nomorTelepon"
            value={nomorTelepon}
            onChange={(e) => setNomorTelepon(e.target.value)}
            placeholder="Isi No.Telepon"
            className="w-full bg-white text-black border px-4 py-2 rounded-full"/>
        </div>

        <div className="space-y-2 relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-[30px] px-3 py-2 pr-10"
            placeholder="Masukkan Password Anda"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-7 top-[40px] text-[15px]"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#8FAADC] text-black px-6 py-2  rounded-[30px] hover:bg-[#8FAADC]"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
