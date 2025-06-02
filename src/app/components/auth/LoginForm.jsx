'use client';

import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = ({ onSubmit }) => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi client-side
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Form Tidak Lengkap',
        text: 'Email dan password tidak boleh kosong!',
      });
      return;
    }

    if (!email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Email Tidak Valid',
        text: 'Email harus mengandung karakter "@"!',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Panggil fungsi onSubmit yang melakukan fetching
      const response = await onSubmit(email, password);
      
      // Jika sampai sini berarti login berhasil
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: `Selamat datang, ${response.user.nama}!`,
        showConfirmButton: false,
        timer: 1500
      });

      // Redirect setelah SweetAlert selesai
      setTimeout(() => {
        router.push('/pages/landingpage');
      }, 1600);

    } catch (error) {
      // Tangani error dari backend
      console.error('Login error:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error.message || 'Terjadi kesalahan saat login.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center text-black space-y-6 mt-2">
        <div className="w-full px-6">
          <label htmlFor="email" className="block font-regular mb-2">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Isi Email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border font-regular bg-white px-4 py-2 rounded-full"
            autoComplete="email"
            disabled={isLoading}
          />
        </div>

        <div className="w-full px-6">
          <label htmlFor="password" className="block font-regular mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Isi Password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border font-regular bg-white px-4 py-2 rounded-full pr-10"
              autoComplete="current-password"
              disabled={isLoading}
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-2 font-bold rounded-full transition-colors ${
            isLoading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-[#3E588F] hover:text-white'
          }`}
        >
          {isLoading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <p className="text-center text-black text-sm font-regular mt-4">
        Belum punya akun?{" "}
        <Link href="/pages/auth/registrasi" className="text-black font-regular hover:underline">
          Daftar
        </Link>
      </p>
    </>
  );
};

export default LoginForm;