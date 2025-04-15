'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Form Tidak Lengkap',
        text: 'Email dan password tidak boleh kosong!',
      });
      return;
    }
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Kosong',
        text: 'Silakan masukkan email Anda.',
      });
      return;
    }
    if (!password) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Kosong',
        text: 'Silakan masukkan password Anda.',
      });
      return;
    }

    try {
      const data = await response.json();

      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: 'Anda berhasil masuk ke akun Anda.',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: err.message,
      });
    }
  };

  return (
    <div className="flex h-screen w-screen">
      
      {/* Form Section - Kiri */}
      <div className="w-1/2 flex items-center justify-center bg-[#E3E8F8] p-8 around[30px">
        <div className="w-full h-full p-6 flex items-center justify-center">
          <div className="w-full max-w-md bg-white  rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">Masuk ke akun anda!</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col items-center w-full">
                <label htmlFor="email" className="block text-sm font-medium text-black mt-8">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-1/2 px-4 py-2 border border-gray-300 rounded-1xl shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="flex flex-col items-center w-full">
                <label htmlFor="password" className="block text-sm font-medium text-black">
                  Kata Sandi
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-1/2 px-4 py-2 border border-gray-300 rounded-1xl shadow-sm focus:outline-none sm:text-sm"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                </span>
                <p className="text-right mt-2 text-xs">
                  <Link href="" className="text-black hover:underline">
                    Lupa Password?
                  </Link>
                </p>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-1/2 bg-deepBlue text-putih py-2 rounded-2xl hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Masuk
                </button>
              </div>
              <p className="text-center text-sm">
                Belum punya akun?{" "}
                <Link href="" className="text-white font-bold hover:underline">
                  Masuk
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  
      {/* Gambar Section - Kanan */}
      <div className="w-[720px] flex items-center justify-center">
        <img 
          src="/images/login.png" 
          alt="login illustration" 
          className="w-full max-w-md object-contain"
        />
      </div>
    </div>
  );  
};

export default Login;
