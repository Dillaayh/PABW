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
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[458px] h-[458px] flex items-center justify-center bg-[#E3E8F8] p-8 rounded-[30px]">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 pt-10">
            <h2 className="text-4xl font-bold mb-8 text-center absolute left-[calc(100%-1250px)] top-[160px] text-black">Masuk ke akun anda!</h2>
            <form onSubmit={handleSubmit} className="absolute top-[290px] left-[calc(100%-735px)] flex flex-col items-center space-y-6 mt-2">
             
              {/* Email */}
              <div>
                <label htmlFor="email" className="absolute -top-[60px] left-[calc(100%-965px)] text-sm  items-center font-medium text-black mb-1 pl-4">Email</label>
                <div className="flex absolute -top-[30px] left-[calc(100%-975px)] flex-col place-items-center w-full">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="     isi email anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[40px] w-[380px] px-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div><label htmlFor="password" className="absolute top-[40px] left-[calc(100%-965px)] text-sm items-center font-medium text-black mb-1 pl-4">Password</label>
                <div className="flex top-[65px] left-[calc(100%-975px)] flex-col w-ful items-center relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="     isi password anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[40px] w-[380px] px-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                  />
                  <div
                    className="absolute left-[calc(100%-35px)] top-[15px] cursor-pointer text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>

                  {/* Lupa Password */}
                  <p className="absolute left-[calc(100%-410px)] top-[40px] text-right text-xs w-[430px] mt-2">
                    <Link href="" className="text-black hover:underline">
                      Lupa Password?
                    </Link>
                  </p>
                </div>
              </div>
              

              {/* Tombol Masuk */}
              <div className="absolute top-[165px] left-[calc(100%-988px)] flex justify-center items-center w-full mt-2">
                <button
                  type="submit"
                  className="bg-deepBlue text-putih w-[100px] h-[40px] rounded-[30px] hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Masuk
                </button>
              </div>

              {/* Link ke Daftar */}
              <p className="absolute top-[209px] left-[calc(100%-885px)] text-center text-sm mt-2">
                Belum punya akun?{" "}
                <Link href="" className="text-black font-bold hover:underline">
                  Daftar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  
      {/* Gambar Section - Kanan */}
      <div className="w-[1540px] h-screen flex items-center justify-center ml-auto mt-22">
        <img 
          src="/images/Login.png" 
          alt="login illustration" 
          className="w-full max-w-md object-contain"
        />
      </div>
    </div>
  );  
};

export default Login;
