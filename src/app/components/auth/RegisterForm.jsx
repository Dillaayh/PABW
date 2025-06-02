'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function RegisterForm({ onSubmit }) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validasi client-side
    if (!name || !email || !password || !nomorTelepon) {
      return Swal.fire({
        icon: 'warning',
        title: 'Form Tidak Lengkap',
        text: 'Harap isi semua field yang diperlukan.',
      });
    }

    if (!email.includes('@')) {
      return Swal.fire({
        icon: 'error',
        title: 'Email Tidak Valid',
        text: 'Email harus mengandung karakter "@"!',
      });
    }

    if (password.length < 6) {
      return Swal.fire({
        icon: 'warning',
        title: 'Password Terlalu Pendek',
        text: 'Password minimal harus 6 karakter.',
      });
    }

    // Validasi nomor telepon (hanya angka dan minimal 10 digit)
    if (!/^\d{10,15}$/.test(nomorTelepon)) {
      return Swal.fire({
        icon: 'warning',
        title: 'Nomor Telepon Tidak Valid',
        text: 'Nomor telepon harus berupa angka dan memiliki 10-15 digit.',
      });
    }

    setIsLoading(true);

    try {
      // Panggil fungsi onSubmit yang melakukan fetching
      const response = await onSubmit({ name, email, password, nomorTelepon });

      // Jika sampai sini berarti registrasi berhasil
      await Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil',
        text: `Selamat datang, ${response.user.nama}! Anda akan diarahkan ke halaman login.`,
        timer: 2000,
        showConfirmButton: false
      });

      // Redirect ke halaman login
      router.push('/pages/auth/login');
    } catch (error) {
      // Tangani error dari backend
      console.error('Register error:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: error.message || 'Terjadi kesalahan saat registrasi.',
      });
    } finally {
      setIsLoading(false);
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
          autoComplete="email"
          disabled={isLoading}
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
          autoComplete="name"
          disabled={isLoading}
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
            placeholder="Isi Password Anda (min. 6 karakter)"
            className="w-full bg-white border px-4 py-2 rounded-full pr-10"
            autoComplete="new-password"
            disabled={isLoading}
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
        <label htmlFor="nomorTelepon" className="mb-1 text-black font-medium">No. Telepon</label>
        <input
          type="tel"
          id="nomorTelepon"
          value={nomorTelepon}
          onChange={(e) => setNomorTelepon(e.target.value)}
          placeholder="Isi No. Telepon (contoh: 081234567890)"
          className="w-full bg-white text-black border px-4 py-2 rounded-full"
          autoComplete="tel"
          disabled={isLoading}
        />
      </div>

      <p className="text-xs text-gray-500 text-center">
        Dengan melanjutkan, Anda menyetujui Syarat &amp; Ketentuan dan Pemberitahuan Privasi kami.
      </p>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 w-[100px] h-[40px] text-center font-bold rounded-full transition-colors ${
            isLoading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-[#3E588F] hover:text-white'
          }`}
        >
          {isLoading ? 'Proses...' : 'Daftar'}
        </button>
      </div>

      <p className="text-center text-black text-sm">
        Sudah punya akun?{' '}
        <Link href="/pages/auth/login" className="text-black font-semibold hover:underline">
          Masuk
        </Link>
      </p>
    </form>
  );
}