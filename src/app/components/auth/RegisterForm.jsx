'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export default function RegisterForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      Swal.fire({ icon: 'success', title: 'Registrasi Berhasil', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Registrasi Gagal', text: err.message });
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
          placeholder="Isi email Anda"
          className="w-full bg-white text-black border px-4 py-2 rounded-full"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-black font-medium">Username</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Contoh: Dilla Ayu"
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
            placeholder="Isi password Anda"
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

      <div className="flex flex-col relative">
        <label className="mb-1 text-black font-medium">Role</label>
        <div
          className="w-full bg-white border px-4 text-black py-2 rounded-full flex justify-between items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <span>{role || 'Pilih Role'}</span>
          <MdOutlineKeyboardArrowDown />
        </div>
        {dropdownOpen && (
          <div className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-10">
            {['Mitra', 'Pengguna'].map(r => (
              <div
                key={r}
                onClick={() => handleSelectRole(r)}
                className="px-4 py-2 text-black cursor-pointer hover:bg-[#E3E8F8]"
              >
                {r}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center">
        Dengan melanjutkan, Anda menyetujui Syarat &amp; Ketentuan dan Pemberitahuan Privasi kami.
      </p>

      <div className="flex justify-center items-center ">
  <button
    type="submit"
    className="bg-white text-black px-6 py-2 w-[100px] h-[40px] text-center font-bold rounded-full hover:bg-[#3E588F]"
  >
    Daftar
  </button>
</div>


      <p className="text-center text-black text-sm">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-black font-semibold hover:underline">
          Masuk
        </Link>
      </p>
    </form>
  );
}
