'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import data from '../../../mitra/data.json';
import SidebarMitraHotel from '../../../../components/sidebarMitra/hotel/page';

// --- ModalHapusKonfirmasi Component ---
function ModalHapusKonfirmasi({ onClose, onConfirm, itemToDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[90%] max-w-sm rounded-2xl p-6 relative shadow-lg text-center">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 text-2xl p-1 rounded-full hover:bg-gray-100">
          <IoClose />
        </button>

        {/* Icon and Message */}
        <div className="mb-4">
          <FaTrash className="text-red-500 text-5xl mx-auto mb-3" />
          <h3 className="text-xl font-bold text-[#3D5895] mb-2">Konfirmasi Hapus</h3>
          <p className="text-gray-600">
            Apakah Anda yakin ingin menghapus kamar <strong className="text-[#3D5895]">{itemToDelete?.tipe} - {itemToDelete?.nomor}</strong> ini? Aksi ini tidak dapat dibatalkan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// --- ModalTambahKamar Component ---
function ModalTambahKamar({ onClose, kamar }) {
  const [formData, setFormData] = useState({
    foto: kamar?.foto || '', // Store the image URL/base64 string
    tipe: kamar?.tipe || '',
    nomor: kamar?.nomor || '',
    deskripsi: kamar?.deskripsi || '',
    harga: kamar?.harga || '',
    ukuran: kamar?.ukuran || '',
    jumlahKasur: kamar?.jumlahKasur || '',
    kasur: kamar?.kasur || '',
  });

  const [imagePreview, setImagePreview] = useState(kamar?.foto || null); // State for image preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview to base64 string
        setFormData({ ...formData, foto: reader.result }); // Store base64 in formData
      };
      reader.readAsDataURL(file); // Read file as data URL (base64)
    } else {
      setImagePreview(null);
      setFormData({ ...formData, foto: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // In a real application, you'd send this data to an API.
    // For image upload, you might send the base64 string or make a separate upload call
    // to your backend, which then stores the image and returns a URL.
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[90%] max-w-xl rounded-2xl p-4 relative shadow-lg">
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl p-1 rounded-full hover:bg-gray-100">
          <IoClose />
        </button>

        {/* Header */}
        <h3 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-2 rounded-xl mb-4">
          {kamar ? 'Edit Kamar Hotel' : 'Tambah Kamar Hotel'}
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-3 gap-x-4">
            {/* Foto Upload */}
            <div className="col-span-1">
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Foto</label>
              <div className="relative border border-gray-300 rounded-xl flex items-center justify-center h-36 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    layout="fill" // Makes the image fill the container
                    objectFit="cover" // Covers the area without distortion
                    className="rounded-xl"
                  />
                ) : (
                  <span className="text-gray-400 flex items-center gap-2">
                    <span className="text-2xl">📤</span> Upload
                  </span>
                )}
              </div>
            </div>

            {/* Tipe Ruangan dan Nomor Kamar */}
            <div className="col-span-2 space-y-3">
              <div>
                <label className="block text-sm font-bold text-[#3D5895] mb-1">Tipe Ruangan</label>
                <input
                  type="text"
                  value={formData.tipe}
                  onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#3D5895] mb-1">Nomor Kamar</label>
                <input
                  type="text"
                  value={formData.nomor}
                  onChange={(e) => setFormData({ ...formData, nomor: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                />
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold text-[#3D5895] mb-1">Deskripsi Fasilitas</label>
            <textarea
              rows={2}
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] resize-y focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
            />
          </div>

          {/* Harga */}
          <div>
            <label className="block text-sm font-bold text-[#3D5895] mb-1">Harga Per-Malam</label>
            <input
              type="text"
              value={formData.harga}
              onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
            />
          </div>

          {/* Ukuran, Jumlah Kasur, Jenis Kasur */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Ukuran</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.ukuran}
                  onChange={(e) => setFormData({ ...formData, ukuran: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">m²</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Jumlah Kasur</label>
              <input
                type="text"
                value={formData.jumlahKasur}
                onChange={(e) => setFormData({ ...formData, jumlahKasur: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Jenis Kasur</label>
              <select
                value={formData.kasur}
                onChange={(e) => setFormData({ ...formData, kasur: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] appearance-none bg-white pr-8 focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              >
                <option value="">Pilih</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="TwinBed">TwinBed</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
              </select>
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="text-right pt-4">
            <button
              type="submit"
              className="bg-[#3D5895] hover:bg-[#7c9ed3] text-white px-8 py-2 rounded-xl font-semibold transition-colors duration-200"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- KelolaKamar Main Component ---
export default function KelolaKamar() {
  const [dataKamar, setDataKamar] = useState(data.kamarHotel);
  const [showModal, setShowModal] = useState(false); // Modal state for Add/Edit
  const [selectedKamar, setSelectedKamar] = useState(null); // Stores room for editing
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation modal
  const [kamarToDelete, setKamarToDelete] = useState(null); // Stores room to delete

  // Function to handle room deletion
  const handleDeleteKamar = () => {
    if (kamarToDelete) {
      const updatedData = dataKamar.filter(kamar =>
        kamar.tipe !== kamarToDelete.tipe || kamar.nomor !== kamarToDelete.nomor
      );
      setDataKamar(updatedData);
      setShowDeleteConfirm(false);
      setKamarToDelete(null);
      console.log('Room deleted:', kamarToDelete);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarMitraHotel active="kelola" />

      <main className="flex-1 px-8 py-8">
        {/* Judul */}
        <h2 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-3 rounded-xl mb-6 shadow-sm">
          Kelola Kapasitas Kamar Swiss-Bellin Hotel
        </h2>

        {/* Tombol Tambah */}
        <div className="text-right mb-6">
          <button
            onClick={() => {
              setSelectedKamar(null);
              setShowModal(true);
            }}
            className="flex justify-start px-6 py-2 border border-[#3D5895] rounded-xl text-[#3D5895] font-semibold bg-[#e6ebf5] hover:bg-[#d6e0f0] transition-colors duration-200 shadow-sm"
          >
            Tambah Kamar
          </button>
        </div>

        {/* Tabel Data Kamar */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-[#3D5895] text-white">
              <tr>
                <th className="p-3 text-left w-[5%] rounded-tl-xl">No</th>
                <th className="p-3 text-left w-[20%]">Tipe Ruangan</th>
                <th className="p-3 text-left w-[15%]">Nomor Kamar</th>
                <th className="p-3 text-left w-[15%]">Jenis Kasur</th>
                <th className="p-3 text-left w-[10%]">Ukuran</th>
                <th className="p-3 text-left w-[15%]">Harga</th>
                <th className="p-3 text-left w-[10%] rounded-tr-xl">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataKamar.map((kamar, idx) => (
                <tr key={`${kamar.tipe}-${kamar.nomor}`} className="border-t border-gray-200 text-[#1E3269] even:bg-gray-50 hover:bg-blue-50 transition-colors duration-150">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{kamar.tipe}</td>
                  <td className="p-3">{kamar.nomor}</td>
                  <td className="p-3">{kamar.kasur}</td>
                  <td className="p-3">{kamar.ukuran.toFixed(1)}</td>
                  <td className="p-3">Rp {kamar.harga.toLocaleString('id-ID')}</td>
                  <td className="p-3 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setKamarToDelete(kamar);
                        setShowDeleteConfirm(true);
                      }}
                      className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-100 transition-colors duration-150"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedKamar(kamar);
                        setShowModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 p-1 rounded-md hover:bg-blue-100 transition-colors duration-150"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah/Edit Kamar */}
        {showModal && (
          <ModalTambahKamar
            onClose={() => {
              setShowModal(false);
              setSelectedKamar(null);
            }}
            kamar={selectedKamar}
          />
        )}

        {/* Modal Hapus Konfirmasi */}
        {showDeleteConfirm && (
          <ModalHapusKonfirmasi
            onClose={() => {
              setShowDeleteConfirm(false);
              setKamarToDelete(null);
            }}
            onConfirm={handleDeleteKamar}
            itemToDelete={kamarToDelete}
          />
        )}
      </main>
    </div>
  );
}