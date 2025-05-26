'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function RegisterForm({ onSubmit }) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nomorTelepon, setNomorTelepon] = useState('');

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const handleSelectRole = role => {
    setRole(role);
    setDropdownOpen(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      return Swal.fire({
        icon: 'warning',
        title: 'Form Tidak Lengkap',
        text: 'Harap isi semua field termasuk role.',
      });
    }
    try {
      if (onSubmit) await onSubmit({ name, email, password, role });

      await Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil',
        text: 'Anda akan diarahkan ke halaman login',
        timer: 1500,
        showConfirmButton: false
      });

      router.push('/auth/login');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: err.message || 'Terjadi kesalahan saat registrasi.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#E3E8F8] rounded-2xl shadow-lg p-8 flex flex-col gap-6 w-full max-w-md">
      <h2 className="text-center text-2xl font-bold">Daftarkan akun anda!</h2>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-black font-medium">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Isi Email Anda"
          className="w-full bg-white text-black border px-4 py-2 rounded-full"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-black font-medium">Nama</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Isi Nama Anda"
          className="w-full bg-white text-black border px-4 py-2 rounded-full"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-black font-medium">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Isi Password Anda"
            className="w-full bg-white border px-4 py-2 rounded-full pr-10"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
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

      <p className="text-xs text-gray-500 text-center">
        Dengan melanjutkan, Anda menyetujui Syarat &amp; Ketentuan dan Pemberitahuan Privasi kami.
      </p>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-white text-black px-6 py-2 w-[100px] h-[40px] text-center font-bold rounded-full hover:bg-[#3E588F]"
        >
          Daftar
        </button>
      </div>

      <p className="text-center text-black text-sm">
        Sudah punya akun?{' '}
        <Link href="/auth/login" className="text-black font-semibold hover:underline">
          Masuk
        </Link>
      </p>
    </form>
  );
}
