'use client';

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Sidebar from "../../../components/admin/Sidebar";
import SearchBar from "../../../components/admin/SearchbarMitra";
import TabelMitra from "../../../components/admin/TabelMitra";
import PageTitle from '../../../components/admin/PageTitle'; 
import Swal from 'sweetalert2';

export default function KelolaMitraPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataMitra, setDataMitra] = useState([
    { 
      namaPerusahaan: "PT. Swiss-Belinn Indonesia", 
      namaMitra: "Hotel Swiss-Belinn", 
      email: "swiss@gmail.com", 
      nomorTelepon: "+62811234567",
      peran: "Hotel",
      saldo: "Rp 2.500.000"
    },
    { 
      namaPerusahaan: "PT. Garuda Indonesia", 
      namaMitra: "Garuda Indonesia", 
      email: "garuda@gmail.com", 
      nomorTelepon: "+62812345678",
      peran: "Penerbangan",
      saldo: "Rp 5.200.000"
    },
    { 
      namaPerusahaan: "PT. Platinum Hotels", 
      namaMitra: "Platinum Hotels Indonesia", 
      email: "plathotels@gmail.com", 
      nomorTelepon: "+62813456789",
      peran: "Hotel",
      saldo: "Rp 1.800.000"
    },
  ]);

  // State untuk form edit
  const [showEditForm, setShowEditForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    namaPerusahaan: '',
    namaMitra: '',
    email: '',
    nomorTelepon: '',
    peran: '',
    saldo: ''
  });
  const [editErrors, setEditErrors] = useState({});
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  // Fungsi untuk menambah mitra baru
  const handleAddMitra = (newMitraData) => {
    const newMitra = {
      ...newMitraData,
    };
    setDataMitra(prev => [...prev, newMitra]);
  };

  // Fungsi untuk menampilkan SweetAlert konfirmasi hapus
  const handleDelete = async (index) => {
    const mitra = dataMitra[index];
    
    const result = await Swal.fire({
      title: 'Hapus Mitra',
      html: `Apakah Anda yakin ingin menghapus mitra <strong>${mitra.namaMitra}</strong>?<br/>Tindakan ini tidak dapat dibatalkan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-lg',
        title: 'text-xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-md font-medium',
        cancelButton: 'px-6 py-2 rounded-md font-medium'
      }
    });

    if (result.isConfirmed) {
      // Hapus mitra dari array
      const newData = dataMitra.filter((_, i) => i !== index);
      setDataMitra(newData);
      
      // Tampilkan pesan sukses
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Mitra telah berhasil dihapus.',
        icon: 'success',
        confirmButtonColor: '#3E588F',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'rounded-lg',
          title: 'text-xl font-bold text-gray-800',
          content: 'text-gray-600',
          confirmButton: 'px-6 py-2 rounded-md font-medium'
        }
      });
    }
  };

  // Fungsi untuk menampilkan popup form edit
  const handleEdit = (index, mitra) => {
    setEditIndex(index);
    setEditData({
      namaPerusahaan: mitra.namaPerusahaan || '',
      namaMitra: mitra.namaMitra || '',
      email: mitra.email || '',
      nomorTelepon: mitra.nomorTelepon || ''
    });
    setEditErrors({});
    setShowEditForm(true);
  };

  // Handle perubahan input form edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error untuk field yang sedang diubah
    if (editErrors[name]) {
      setEditErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle perubahan nomor telepon
  const handleEditPhoneChange = (e) => {
    let value = e.target.value;
    
    // Hanya izinkan angka, +, -, spasi, dan tanda kurung
    value = value.replace(/[^0-9+\-\s()]/g, '');
    
    setEditData(prev => ({
      ...prev,
      nomorTelepon: value
    }));
    
    // Clear error
    if (editErrors.nomorTelepon) {
      setEditErrors(prev => ({
        ...prev,
        nomorTelepon: ''
      }));
    }
  };

  // Validasi form edit
  const validateEditForm = () => {
    const errors = {};
    
    if (!editData.namaPerusahaan.trim()) {
      errors.namaPerusahaan = 'Nama perusahaan harus diisi';
    }
    
    if (!editData.namaMitra.trim()) {
      errors.namaMitra = 'Nama mitra harus diisi';
    }
    
    if (!editData.email.trim()) {
      errors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      errors.email = 'Format email tidak valid';
    }
    
    if (!editData.nomorTelepon.trim()) {
      errors.nomorTelepon = 'Nomor telepon harus diisi';
    } else if (!/^[0-9+\-\s()]+$/.test(editData.nomorTelepon)) {
      errors.nomorTelepon = 'Format nomor telepon tidak valid';
    }
    
    return errors;
  };

  // Handle submit form edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    
    setIsEditSubmitting(true);
    
    try {
      // Update data mitra
      const newData = [...dataMitra];
      newData[editIndex] = editData;
      setDataMitra(newData);
      
      // Close form
      setShowEditForm(false);
      setEditData({
        namaPerusahaan: '',
        namaMitra: '',
        email: '',
        nomorTelepon: ''
      });
      setEditErrors({});
      setEditIndex(null);
      
      // Tampilkan pesan sukses
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Data mitra telah berhasil diperbarui.',
        icon: 'success',
        confirmButtonColor: '#3E588F',
        confirmButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'rounded-lg',
          title: 'text-xl font-bold text-gray-800',
          content: 'text-gray-600',
          confirmButton: 'px-6 py-2 rounded-md font-medium'
        }
      });
      
    } catch (error) {
      console.error('Error updating mitra:', error);
    } finally {
      setIsEditSubmitting(false);
    }
  };

  // Handle close form edit
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setEditData({
      namaPerusahaan: '',
      namaMitra: '',
      email: '',
      nomorTelepon: ''
    });
    setEditErrors({});
    setEditIndex(null);
  };

  // Handle click modal backdrop
  const handleEditModalClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseEditForm();
    }
  };

  // Filter data berdasarkan search term
  const filteredData = dataMitra.filter(mitra => 
    mitra.namaPerusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mitra.namaMitra.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mitra.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (mitra.peran && mitra.peran.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-full">
          {/* Header */}
          <div className="px-6 py-4 rounded-t-lg">
            <PageTitle title="Halaman Pengelolaan Admin - Mitra" />
          </div>
       
          {/* SearchBar */}
          <div className="bg-white px-6 py-4">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
              onAddMitra={handleAddMitra}
            />
          </div>

          {/* TabelMitra */}
          <div className="bg-white rounded-[10px] overflow-hidden">
            <TabelMitra
              dataMitra={filteredData}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </main>

      {/* Form Edit Modal */}
      {showEditForm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleEditModalClick}
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl text-[#3E588F] font-bold mb-2">Edit Mitra</h2>
                <p className="text-sm text-[#F36614] leading-relaxed">
                  Untuk mengedit mitra, pastikan semua data yang diisi telah sesuai dan benar.
                </p>
              </div>
              <button 
                onClick={handleCloseEditForm}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                disabled={isEditSubmitting}
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-semibold">
                  Nama Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="namaPerusahaan"
                  value={editData.namaPerusahaan}
                  onChange={handleEditChange}
                  className={`w-full text-[#3E588F] border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.namaPerusahaan 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Contoh: PT. Geriya Teknologi"
                  disabled={isEditSubmitting}
                />
                {editErrors.namaPerusahaan && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.namaPerusahaan}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-semibold">
                  Nama Mitra <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="namaMitra"
                  value={editData.namaMitra}
                  onChange={handleEditChange}
                  className={`w-full text-[#3E588F] border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.namaMitra 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Contoh: Garuda Indonesia"
                  disabled={isEditSubmitting}
                />
                {editErrors.namaMitra && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.namaMitra}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-semibold">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className={`w-full text-[#3E588F] border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="contoh@email.com"
                  disabled={isEditSubmitting}
                />
                {editErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-semibold">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="nomorTelepon"
                  value={editData.nomorTelepon}
                  onChange={handleEditPhoneChange}
                  className={`w-full text-[#3E588F] border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.nomorTelepon 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Contoh: +62812345678"
                  disabled={isEditSubmitting}
                />
                {editErrors.nomorTelepon && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.nomorTelepon}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseEditForm}
                  className="bg-[#3E588F] hover:bg-[#7A9BD1] text-white px-6 py-2 rounded-full transition-colors font-medium"
                  disabled={isEditSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#3E588F] hover:bg-[#7A9BD1] text-white px-6 py-2 rounded-full transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isEditSubmitting}
                >
                  {isEditSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}