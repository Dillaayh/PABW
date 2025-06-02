'use client';

import { useState } from "react";
import { FaSearch, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

export default function SearchBar({ searchTerm, onSearchChange, onAddMitra }) {
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    namaPerusahaan: '',
    namaMitra: '',
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
    
    if (!formData.namaPerusahaan.trim()) {
      newErrors.namaPerusahaan = 'Nama perusahaan wajib diisi';
    }
    
    if (!formData.namaMitra.trim()) {
      newErrors.namaMitra = 'Nama mitra wajib diisi';
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
      
      // Call parent callback if provided
      if (onAddMitra) {
        onAddMitra(formData);
      }
      
      console.log('Form Data:', formData);
      alert('Data mitra berhasil disimpan!');
      handleCloseForm();
    } catch (error) {
      console.error('Error saving mitra:', error);
      alert('Terjadi kesalahan saat menyimpan data mitra');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      namaPerusahaan: '',
      namaMitra: '',
      email: '',
      nomorTelepon: ''
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
            placeholder="Mencari mitra..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 border rounded-[30px] mr-[100px] px-6 py-2 text-gray-400 font-medium hover:bg-[#e1e7f5] transition max-w-full sm:max-w-[35%]"
         >
          <span className="text-sm font-semibold">+ Tambah Mitra</span>
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleModalClick}
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl text-[#3E588F] font-bold mb-2">Menambahkan Mitra</h2>
                <p className="text-sm text-[#F36614] leading-relaxed">
                  Untuk menambahkan mitra, pastikan semua data yang diisi telah sesuai dan benar.
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-semibold">
                  Nama Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="namaPerusahaan"
                  value={formData.namaPerusahaan}
                  onChange={handleChange}
                  className={`w-full text-[#3E588F] border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    errors.namaPerusahaan 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Contoh: PT. Geriya Teknologi"
                  disabled={isSubmitting}
                />
                {errors.namaPerusahaan && (
                  <p className="text-red-500 text-xs mt-1">{errors.namaPerusahaan}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-semibold">
                  Nama Mitra <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="namaMitra"
                  value={formData.namaMitra}
                  onChange={handleChange}
                  className={`w-full text-[#3E588F] border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    errors.namaMitra 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Contoh: Garuda Indonesia"
                  disabled={isSubmitting}
                />
                {errors.namaMitra && (
                  <p className="text-red-500 text-xs mt-1">{errors.namaMitra}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-semibold">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full text-[#3E588F] border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="contoh@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-semibold">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handlePhoneChange}
                  className={`w-full text-[#3E588F] border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    errors.nomorTelepon 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Contoh: +62812345678"
                  disabled={isSubmitting}
                />
                {errors.nomorTelepon && (
                  <p className="text-red-500 text-xs mt-1">{errors.nomorTelepon}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="bg-[#3E588F] hover:bg-[#7A9BD1] text-white px-6 py-2 rounded-full transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#3E588F] hover:bg-[#7A9BD1] text-white px-6 py-2 rounded-full transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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