'use client';

import { useState } from "react";
import { FaSearch, FaRegEye, FaRegEyeSlash, FaTimes } from "react-icons/fa";

export default function SearchBarPengguna({ searchTerm, onSearchChange, onAddUser }) {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    nomorTelepon: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.nomorTelepon.trim()) {
      newErrors.nomorTelepon = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.nomorTelepon)) {
      newErrors.nomorTelepon = 'Format nomor telepon tidak valid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user data
      const newUser = {
        username: `User${Date.now()}`, // Generate unique username
        nama: formData.nama,
        email: formData.email,
        nomorTelepon: formData.nomorTelepon,
        password: formData.password
      };
      
      // Call parent callback if provided
      if (onAddUser) {
        onAddUser(newUser);
      }
      
      console.log('Form Data:', newUser);
      alert('Data pengguna berhasil disimpan!');
      handleCloseForm();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Terjadi kesalahan saat menyimpan data pengguna');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      nama: '',
      email: '',
      nomorTelepon: '',
      password: ''
    });
    setErrors({});
    setShowPassword(false);
    setIsSubmitting(false);
  };

  const handleModalClick = (e) => {
    // Close modal if clicking on backdrop
    if (e.target === e.currentTarget) {
      handleCloseForm();
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove non-numeric characters except + and -
    const cleaned = value.replace(/[^\d+\-]/g, '');
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      nomorTelepon: formatted
    }));
    
    if (errors.nomorTelepon) {
      setErrors(prev => ({
        ...prev,
        nomorTelepon: ''
      }));
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between mt-[10px] mb-8 gap-2">
        <div className="flex items-center gap-2 border rounded-full px-4 py-2 w-[302px] ml-[70px] text-[#1A3A64] font-medium ">
          <FaSearch className="text-gray-400 mr-3" size={16} />
          <input
            type="text"
            placeholder="Mencari pengguna..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 border rounded-[30px] mr-[100px] px-6 py-2 text-gray-400 font-medium hover:bg-[#e1e7f5] transition max-w-full sm:max-w-[35%]"
        >
          <span className="text-sm font-semibold">+ Tambah Pengguna</span>
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleModalClick}
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-[25px] text-[#3E588F] font-bold mb-1">Menambahkan Pengguna</h2>
                <p className="text-[12px] text-[#F36614] mb-4">
                  Untuk menambahkan pengguna, tolong perhatikan detail data yang akan diisi telah sesuai dan benar dengan data pengguna.
                </p>
              </div>
              <button 
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-bold">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className={`w-full text-black border rounded-[30px] px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                    errors.nama 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Masukkan nama pengguna"
                  disabled={isSubmitting}
                />
                {errors.nama && (
                  <p className="text-red-500 text-xs mt-1">{errors.nama}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-bold">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full text-black border rounded-[30px] px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Masukkan Email Anda"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2 relative">
                <label className="block text-[#3E588F] text-sm font-bold">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full text-black border rounded-[30px] px-3 py-2 pr-10 focus:outline-none focus:ring-2 transition-colors ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Masukkan Password Anda"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-7 top-[40px] text-[15px] text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

               <div className="flex flex-col">
                <label htmlFor="nomorTelepon" className="mb-1 text-[#3E588F] font-bold">
                  No.Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="nomorTelepon"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handlePhoneChange}
                  placeholder="Isi No.Telepon"
                  className={`w-full bg-white text-black border px-4 py-2 rounded-full focus:outline-none focus:ring-2 transition-colors ${
                    errors.nomorTelepon 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.nomorTelepon && (
                  <p className="text-red-500 text-xs mt-1">{errors.nomorTelepon}</p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="bg-[#3E588F] hover:bg-[#7A9BD1] text-white px-6 py-2 rounded-[30px] transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#3E588F] hover:bg-[#7A9BD1] text-white px-6 py-2 rounded-[30px] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}