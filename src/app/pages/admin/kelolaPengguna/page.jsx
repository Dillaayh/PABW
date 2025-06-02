'use client';

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Sidebar from "../../../components/admin/Sidebar";
import SearchBar from "../../../components/admin/SearchbarPengguna";
import TablePengguna from "../../../components/admin/TabelPengguna";
import PageTitle from '../../../components/admin/PageTitle'; 
import Swal from 'sweetalert2';

export default function KelolaPenggunaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataPengguna, setDataPengguna] = useState([
    { 
      username: "User123", 
      nama: "Alifah Nur Aisyah", 
      email: "ayi@gmail.com", 
      nomorTelepon: "081234567890" 
    },
    { 
      username: "User456", 
      nama: "Dilla Ayu", 
      email: "dilla@gmail.com", 
      nomorTelepon: "081234567891" 
    },
    { 
      username: "User789", 
      nama: "Nabila Chairunnisa", 
      email: "bili@gmail.com", 
      nomorTelepon: "081234567892" 
    },
  ]);

  // State untuk form edit
  const [showEditForm, setShowEditForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    username: '',
    nama: '',
    email: '',
    nomorTelepon: '',
    password: ''
  });
  const [editErrors, setEditErrors] = useState({});
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);

  // Fungsi untuk menampilkan SweetAlert konfirmasi hapus
  const handleDelete = async (index) => {
    const user = dataPengguna[index];
    
    const result = await Swal.fire({
      title: 'Hapus Pengguna',
      html: `Apakah Anda yakin ingin menghapus pengguna <strong>${user.nama}</strong>?<br/>Tindakan ini tidak dapat dibatalkan.`,
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
      // Hapus pengguna dari array
      const newData = dataPengguna.filter((_, i) => i !== index);
      setDataPengguna(newData);
      
      // Tampilkan pesan sukses
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Pengguna telah berhasil dihapus.',
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

  // Fungsi untuk menampilkan form edit modal
  const handleEdit = (index, user) => {
    setEditIndex(index);
    setEditData({
      username: user.username || '',
      nama: user.nama || '',
      email: user.email || '',
      nomorTelepon: user.nomorTelepon || '',
      password: '' // Password selalu kosong saat edit
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
    
    // Hanya izinkan angka
    value = value.replace(/[^0-9]/g, '');
    
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
    
    if (!editData.username.trim()) {
      errors.username = 'Username harus diisi';
    }
    
    if (!editData.nama.trim()) {
      errors.nama = 'Nama harus diisi';
    }
    
    if (!editData.email.trim()) {
      errors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      errors.email = 'Format email tidak valid';
    }
    
    if (!editData.nomorTelepon.trim()) {
      errors.nomorTelepon = 'Nomor telepon harus diisi';
    } else if (!/^[0-9]{10,15}$/.test(editData.nomorTelepon)) {
      errors.nomorTelepon = 'Nomor telepon harus berupa angka dengan minimal 10 digit';
    }

    // Validasi password jika diisi
    if (editData.password && editData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
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
      // Update data pengguna
      const newData = [...dataPengguna];
      const updatedUser = {
        username: editData.username,
        nama: editData.nama,
        email: editData.email,
        nomorTelepon: editData.nomorTelepon
      };
      
      // Tambahkan password baru jika diisi
      if (editData.password) {
        updatedUser.password = editData.password;
      }
      
      newData[editIndex] = updatedUser;
      setDataPengguna(newData);
      
      // Close form
      setShowEditForm(false);
      setEditData({
        username: '',
        nama: '',
        email: '',
        nomorTelepon: '',
        password: ''
      });
      setEditErrors({});
      setEditIndex(null);
      
      // Tampilkan pesan sukses
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Data pengguna telah berhasil diperbarui.',
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
      console.error('Error updating pengguna:', error);
    } finally {
      setIsEditSubmitting(false);
    }
  };

  // Handle close form edit
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setEditData({
      username: '',
      nama: '',
      email: '',
      nomorTelepon: '',
      password: ''
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

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-full">
          <div className="px-6 py-4 rounded-t-lg">
             <PageTitle title="Halaman Pengelolaan Admin - Pengguna" />
          </div>
         
          {/* SearchBar */}
          <div className="bg-white px-6 py-4">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
              // onAddMitra prop dihapus karena tidak relevan untuk pengguna
            />
          </div>

          <div className="bg-white rounded-[10px] overflow-hidden">
            <TablePengguna 
              searchTerm={searchTerm} 
              dataPengguna={dataPengguna}
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
                <h2 className="text-[25px] text-[#3E588F] font-bold mb-1">Edit Pengguna</h2>
                <p className="text-[12px] text-[#F36614] mb-4">
                  Untuk mengedit pengguna, tolong perhatikan detail data yang akan diisi telah sesuai dan benar dengan data pengguna.
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
                <label className="block text-[#3E588F] text-sm font-bold">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={editData.nama}
                  onChange={handleEditChange}
                  className={`w-full text-black border rounded-[30px] px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.nama 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Masukkan nama pengguna"
                  disabled={isEditSubmitting}
                />
                {editErrors.nama && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.nama}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-bold">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  className={`w-full text-black border rounded-[30px] px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Masukkan Email Anda"
                  disabled={isEditSubmitting}
                />
                {editErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-bold">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={editData.username}
                  onChange={handleEditChange}
                  className={`w-full text-black border rounded-[30px] px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.username 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Masukkan username"
                  disabled={isEditSubmitting}
                />
                {editErrors.username && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-bold">
                  No. Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="nomorTelepon"
                  value={editData.nomorTelepon}
                  onChange={handleEditPhoneChange}
                  className={`w-full text-black border rounded-[30px] px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.nomorTelepon 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Isi No.Telepon"
                  disabled={isEditSubmitting}
                />
                {editErrors.nomorTelepon && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.nomorTelepon}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[#3E588F] text-sm font-bold">
                  Password Baru <span className="text-gray-400">(Kosongkan jika tidak ingin mengubah)</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={editData.password}
                  onChange={handleEditChange}
                  className={`w-full text-black border rounded-[30px] px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                    editErrors.password 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-[#3E588F]/20 focus:border-[#3E588F]'
                  }`}
                  placeholder="Masukkan Password Baru (Opsional)"
                  disabled={isEditSubmitting}
                />
                {editErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{editErrors.password}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseEditForm}
                  className="bg-[#3E588F] hover:bg-[#7A9BD1] text-white px-6 py-2 rounded-[30px] transition-colors font-medium"
                  disabled={isEditSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#3E588F] hover:bg-[#7A9BD1] text-white px-6 py-2 rounded-[30px] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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