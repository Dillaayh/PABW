'use client';

import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdCalendarToday } from 'react-icons/md';
import SidebarProfile from '../../components/sidebarProfile/SidebarProfile';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: 'Dilla Ayu Puspitasari',
    gender: 'Perempuan', 
    birthDate: '2001-06-12',
    email: 'dilla@example.com',
    password: '********',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('Data disimpan:', formData);
    setIsEditing(false);
    setShowPassword(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#EAF0FF] p-4 lg:p-8 text-black">
      <SidebarProfile />

      <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8 lg:ml-8 relative">
        <h2 className="text-2xl font-semibold mb-6">Profil Saya</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold">{formData.name}</h3>
        </div>

        <div className="space-y-4">
          {/* Nama */}
          <div>
            <label className="text-sm font-medium">Nama Lengkap</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full text-black disabled:bg-gray-100"
              />
              <FaUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="text-sm font-medium">Jenis Kelamin</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full text-black disabled:bg-gray-100"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Perempuan">Perempuan</option>
              <option value="Laki-laki">Laki-laki</option>
            </select>
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="text-sm font-medium">Tanggal Lahir</label>
            <div className="relative">
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full text-black disabled:bg-gray-100"
              />
              {!isEditing && (
                <MdCalendarToday className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full text-gray-500 bg-gray-100 cursor-not-allowed"
              />
              <HiOutlineMail className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Kata Sandi */}
          <div>
            <label className="text-sm font-medium">Kata Sandi</label>
            <div className="relative">
              <input
                type={isEditing && showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Masukkan kata sandi baru"
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full text-black pr-12 disabled:bg-gray-100"
              />

              {/* Jika sedang tidak diedit → tampilkan ikon gembok */}
              {!isEditing && (
                <RiLockPasswordLine className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
              )}

              {/* Jika sedang diedit → tampilkan ikon mata */}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end mt-8">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-[#324C9B] text-white px-6 py-2 rounded-full hover:bg-[#1d3478]"
            >
              Simpan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
