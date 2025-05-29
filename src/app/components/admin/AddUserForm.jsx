'use client';

import { useState, useEffect, useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectRole = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
    setDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nama' && value.includes('@')) {
      // Tolak input '@' di nama pengguna
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

 const [showPassword, setShowPassword] = useState(false);
 const [nomorTelepon, setNomorTelepon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data pengguna:', formData);
  };

  // Close dropdown kalau klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-start text-left p-6 rounded-lg w-full max-w-3xl mx-auto">
      <h2 className="text-[25px] font-bold mb-1">Menambahkan Pengguna</h2>
      <p className="text-[12px] text-[#F36614] mb-4 ">
        Untuk menambahkan pengguna, tolong perhatikan detail data yang akan diisi telah sesuai dan benar dengan data pengguna.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border rounded-[30px] px-3 py-2"
            placeholder="Masukkan nama pengguna"
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
            className="bg-[#8FAADC] text-black px-6 py-2 rounded-[30px] hover:bg-[#8FAADC]"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
