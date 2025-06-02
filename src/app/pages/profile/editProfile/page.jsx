'use client';

import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdCalendarToday } from 'react-icons/md';
import SidebarProfile from '../../components/sidebarProfile/SidebarProfile';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Swal from 'sweetalert2';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    no_tlp: '',
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch user data saat komponen dimount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Untuk menyertakan cookies token
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data profil');
      }

      const data = await response.json();
      const userData = {
        nama: data.user.nama,
        email: data.user.email,
        password: '', // Kosongkan password untuk keamanan
        no_tlp: data.user.no_tlp,
      };

      setFormData(userData);
      setOriginalData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Data',
        text: error.message || 'Terjadi kesalahan saat memuat data profil.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Reset password field ketika mulai edit
    setFormData(prev => ({
      ...prev,
      password: ''
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowPassword(false);
    // Reset ke data original
    setFormData(originalData);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Validasi client-side
      if (!formData.nama.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Nama Tidak Boleh Kosong',
          text: 'Harap isi nama lengkap.',
        });
        return;
      }

      if (!formData.no_tlp.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Nomor Telepon Tidak Boleh Kosong',
          text: 'Harap isi nomor telepon.',
        });
        return;
      }

      // Validasi nomor telepon
      if (!/^\d{10,15}$/.test(formData.no_tlp)) {
        Swal.fire({
          icon: 'warning',
          title: 'Nomor Telepon Tidak Valid',
          text: 'Nomor telepon harus berupa angka dan memiliki 10-15 digit.',
        });
        return;
      }

      // Siapkan data untuk dikirim
      const updateData = {
        nama: formData.nama,
        no_tlp: formData.no_tlp,
      };

      // Jika password diisi, tambahkan ke data update
      if (formData.password && formData.password.trim()) {
        if (formData.password.length < 6) {
          Swal.fire({
            icon: 'warning',
            title: 'Password Terlalu Pendek',
            text: 'Password minimal harus 6 karakter.',
          });
          return;
        }
        updateData.password = formData.password;
      }

      const response = await fetch('http://localhost:5000/api/auth/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Untuk menyertakan cookies token
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Gagal memperbarui profil');
      }

      // Update data lokal dengan data yang berhasil disimpan
      const updatedUserData = {
        nama: result.updated.nama,
        email: result.updated.email,
        password: '',
        no_tlp: result.updated.no_tlp,
      };

      setFormData(updatedUserData);
      setOriginalData(updatedUserData);
      setIsEditing(false);
      setShowPassword(false);

      Swal.fire({
        icon: 'success',
        title: 'Profil Berhasil Diperbarui',
        text: 'Data profil Anda telah berhasil disimpan.',
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memperbarui Profil',
        text: error.message || 'Terjadi kesalahan saat memperbarui profil.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#EAF0FF] p-4 lg:p-8 text-black">
        <SidebarProfile />
        <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8 lg:ml-8 relative flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#324C9B] mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data profil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#EAF0FF] p-4 lg:p-8 text-black">
      <SidebarProfile />

      <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8 lg:ml-8 relative">
        <h2 className="text-2xl font-semibold mb-6">Profil Saya</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold">{formData.nama}</h3>
        </div>

        <div className="space-y-4">
          {/* Nama */}
          <div>
            <label className="text-sm font-medium">Nama Lengkap</label>
            <div className="relative">
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full text-black disabled:bg-gray-100"
              />
              <FaUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="text-sm font-medium">Nomor Telepon</label>
            <div className="relative">
              <input
                type="tel"
                name="no_tlp"
                placeholder="Masukkan nomor telepon"
                value={formData.no_tlp}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full text-black disabled:bg-gray-100"
              />
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
            <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
          </div>

          {/* Kata Sandi */}
          <div>
            <label className="text-sm font-medium">Kata Sandi</label>
            <div className="relative">
              <input
                type={isEditing && showPassword ? 'text' : 'password'}
                name="password"
                placeholder={isEditing ? "Kosongkan jika tidak ingin mengubah password" : "********"}
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
            {isEditing && (
              <p className="text-xs text-gray-500 mt-1">
                Kosongkan jika tidak ingin mengubah password. Minimal 6 karakter jika diisi.
              </p>
            )}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end mt-8 gap-3">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-colors"
                disabled={isSaving}
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 rounded-full transition-colors ${
                  isSaving 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-[#324C9B] text-white hover:bg-[#1d3478]'
                }`}
              >
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}