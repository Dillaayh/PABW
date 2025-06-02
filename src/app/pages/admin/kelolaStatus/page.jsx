'use client';

import { useState } from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import TabelStatus from '../../../components/admin/TabelStatus';
import SearchBar from '../../../components/admin/SearchbarStatus';
import PageTitle from '../../../components/admin/PageTitle'; 
import Swal from 'sweetalert2';

export default function HalamanStatus() {
  const [searchTerm, setSearchTerm] = useState('');

  // Data dummy untuk status
  const [dataStatus, setDataStatus] = useState([
    {
      nama: 'Hotel Swiss-Belinn',
      email: 'swiss@gmail.com',
      jenis: 'Hotel',
      jumlahPenerbangan: '',
      jumlahRuangan: '45'
    },
    {
      nama: 'Garuda Indonesia',
      email: 'garuda@gmail.com',
      jenis: 'Penerbangan',
      jumlahPenerbangan: '1000',
      jumlahRuangan: ''
    },
    {
      nama: 'Platinum Hotels Indonesia',
      email: 'plathotels@gmail.com',
      jenis: 'Hotel',
      jumlahPenerbangan: '',
      jumlahRuangan: '100'
    }
  ]);

  // Fungsi untuk menangani pencarian
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Filter data berdasarkan search term
  const filteredData = dataStatus.filter(status => 
    status.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    status.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    status.jenis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk menampilkan SweetAlert konfirmasi hapus
  const handleDeleteStatus = async (index) => {
    const status = dataStatus[index];
    
    const result = await Swal.fire({
      title: 'Hapus Status',
      html: `Apakah Anda yakin ingin menghapus status <strong>${status.nama}</strong>?<br/>Tindakan ini tidak dapat dibatalkan.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3E588F',
      cancelButtonColor: '#3E588F',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-[30px]',
        title: 'text-xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-[30px] font-medium',
        cancelButton: 'px-6 py-2 rounded-[30px] font-medium'
      }
    });

    if (result.isConfirmed) {
      // Hapus status dari array
      const newData = dataStatus.filter((_, i) => i !== index);
      setDataStatus(newData);
      
      // Tampilkan pesan sukses
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Status telah berhasil dihapus.',
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

  // Fungsi untuk menampilkan SweetAlert form edit
  const handleEditStatus = async (index, status) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Status',
      html: `
        <div class="space-y-4 text-left">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input id="swal-nama" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="${status.nama}" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="swal-email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="${status.email}" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
            <select id="swal-jenis" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Hotel" ${status.jenis === 'Hotel' ? 'selected' : ''}>Hotel</option>
              <option value="Penerbangan" ${status.jenis === 'Penerbangan' ? 'selected' : ''}>Penerbangan</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Penerbangan</label>
            <input id="swal-penerbangan" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="${status.jumlahPenerbangan || ''}" placeholder="Kosongkan jika tidak berlaku" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Ruangan</label>
            <input id="swal-ruangan" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="${status.jumlahRuangan || ''}" placeholder="Kosongkan jika tidak berlaku" />
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#3E588F',
      cancelButtonColor: '#3E588F',
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'rounded-[30px] w-96',
        title: 'text-xl font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-2 rounded-[30px] font-medium',
        cancelButton: 'px-6 py-2 rounded-[30px] font-medium'
      },
      preConfirm: () => {
        const nama = document.getElementById('swal-nama').value;
        const email = document.getElementById('swal-email').value;
        const jenis = document.getElementById('swal-jenis').value;
        const jumlahPenerbangan = document.getElementById('swal-penerbangan').value;
        const jumlahRuangan = document.getElementById('swal-ruangan').value;

        // Validasi input
        if (!nama.trim()) {
          Swal.showValidationMessage('Nama tidak boleh kosong');
          return false;
        }

        if (!email.trim()) {
          Swal.showValidationMessage('Email tidak boleh kosong');
          return false;
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Swal.showValidationMessage('Format email tidak valid');
          return false;
        }

        // Validasi berdasarkan jenis
        if (jenis === 'Penerbangan' && !jumlahPenerbangan.trim()) {
          Swal.showValidationMessage('Jumlah penerbangan harus diisi untuk jenis Penerbangan');
          return false;
        }

        if (jenis === 'Hotel' && !jumlahRuangan.trim()) {
          Swal.showValidationMessage('Jumlah ruangan harus diisi untuk jenis Hotel');
          return false;
        }

        return {
          nama: nama.trim(),
          email: email.trim(),
          jenis: jenis,
          jumlahPenerbangan: jenis === 'Penerbangan' ? jumlahPenerbangan.trim() : '',
          jumlahRuangan: jenis === 'Hotel' ? jumlahRuangan.trim() : ''
        };
      }
    });

    if (formValues) {
      // Update data status
      const newData = [...dataStatus];
      newData[index] = formValues;
      setDataStatus(newData);

      // Tampilkan pesan sukses
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Status telah berhasil diperbarui.',
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

  // Fungsi untuk menangani perubahan menu sidebar
  const handleMenuChange = (menuItem) => {
    console.log('Menu changed to:', menuItem);
    // TODO: Implement navigation logic
    // router.push(`/admin/${menuItem.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar 
        activeMenu="Melihat Status"
        onMenuChange={handleMenuChange}
      />
      
      {/* Main Content */}
      <div className="flex- flex flex-col">
        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-full">
            {/* Header */}
            <div className=" px-6 py-4 rounded-t-lg">
              <PageTitle title="Halaman Status" />
            </div>

            {/* SearchBar */}
            <div className="bg-white px-8 border-gray-400 py-6">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                placeholder="Mencari..."
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-[10px] overflow-hidden">
              <TabelStatus 
                dataStatus={filteredData}
                onDelete={handleDeleteStatus}
                onEdit={handleEditStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}