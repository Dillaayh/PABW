'use client';

import React, { useState } from "react";
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Form Tidak Lengkap',
        text: 'Email dan password tidak boleh kosong!',
      });
      return;
    }

    try {
      if (onSubmit) await onSubmit(email, password);
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: 'Anda berhasil masuk.',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: err.message || 'Terjadi kesalahan.',
      });
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
            placeholder="Isi email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border font-regular bg-white px-4 py-2 rounded-full"
            autoComplete="off"
          />
        </div>

        <div className="w-full px-6">
          <label htmlFor="password" className="block font-regular mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Isi password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border font-regular bg-white px-4 py-2 rounded-full pr-10"
              autoComplete="off"
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
          className="bg-white text-black px-6 py-2 font-bold rounded-full hover:bg-[#3E588F]"
        >
          Masuk
        </button>
      </form>

      <p className="text-center text-black text-sm font-regular mt-4">
        Belum punya akun?{" "}
        <Link href="/register" className="text-black font-regular hover:underline">
          Daftar
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
