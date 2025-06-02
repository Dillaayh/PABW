'use client';

import { useState } from 'react';
import Image from 'next/image'; // Image component is not used here, but kept if needed elsewhere
import { FaTrash, FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import data from '../../../mitra/dataPenerbangan.json';
import SidebarPenerbangan from '@/app/components/sidebarMitra/penerbangan/page';

// -------------------- Modal Hapus Konfirmasi Component (New) --------------------
// This modal is for confirming deletion, similar to the previous example.
function ModalHapusKonfirmasi({ onClose, onConfirm, itemToDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-montserrat">
      <div className="bg-white w-[90%] max-w-sm rounded-2xl p-6 relative shadow-lg text-center font-montserrat">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 text-2xl p-1 rounded-full hover:bg-gray-100 font-montserrat">
          <IoClose />
        </button>

        <div className="mb-4 font-montserrat">
          <FaTrash className="text-red-500 text-5xl mx-auto mb-3 font-montserrat" />
          <h3 className="text-xl font-bold text-[#3D5895] mb-2 font-montserrat">Konfirmasi Hapus</h3>
          <p className="text-gray-600 font-montserrat">
            Apakah Anda yakin ingin menghapus penerbangan <strong className="text-[#3D5895] font-montserrat">{itemToDelete?.kode_penerbangan}</strong> ini? Aksi ini tidak dapat dibatalkan.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6 font-montserrat">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-100 transition-colors duration-200 font-montserrat"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200 font-montserrat"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}


// -------------------- Modal Tambah/Edit Penerbangan Component (Modifikasi Besar) --------------------
function ModalTambahPenerbangan({ onClose, penerbanganToEdit }) {
    // State untuk form data
    const [formData, setFormData] = useState({
      tipePesawat: penerbanganToEdit?.tipe_pesawat || '',
      kodePenerbangan: penerbanganToEdit?.kode_penerbangan || '',
      bandaraAsal: penerbanganToEdit?.bandara_keberangkatan || '',
      bandaraTujuan: penerbanganToEdit?.bandara_tujuan || '',
      waktuKeberangkatan: penerbanganToEdit?.waktu_keberangkatan || '',
      waktuTiba: penerbanganToEdit?.waktu_tiba || '',
      tanggalKeberangkatan: penerbanganToEdit?.tanggal || '',
      hargaPajak: penerbanganToEdit?.harga_perpajak || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Logika untuk menyimpan data (tambah baru atau update)
        // Di sini Anda akan memanggil fungsi dari parent component (KelolaPenerbangan)
        // untuk menambah atau mengupdate data di dataPenerbangan state.
        // Contoh:
        // if (penerbanganToEdit) {
        //   onUpdate(formData); // Call update function
        // } else {
        //   onAdd(formData); // Call add function
        // }
        onClose(); // Tutup modal setelah submit
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-montserrat">
            <div className="bg-white w-[90%] max-w-2xl rounded-2xl p-6 relative shadow-lg font-montserrat">
                <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl p-1 rounded-full hover:bg-gray-100 font-montserrat">
                    <IoClose />
                </button>
                <h3 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-2 rounded-xl mb-6 font-montserrat">
                    {penerbanganToEdit ? 'Edit Penerbangan' : 'Tambah Penerbangan'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 font-montserrat">
                    {/* Tipe Pesawat Penerbangan & Kode Penerbangan */}
                    <div className="grid grid-cols-2 gap-4 font-montserrat">
                        <div className="font-montserrat">
                            <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Tipe Pesawat Penerbangan</label>
                            <p className="text-xs text-gray-500 mb-1 invisible font-montserrat">Placeholder</p>
                            <input
                                type="text"
                                name="tipePesawat"
                                value={formData.tipePesawat}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
                            />
                        </div>
                        <div className="font-montserrat">
                            <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Kode Penerbangan</label>
                            <p className="text-xs text-gray-500 mb-1 font-montserrat">Dapat berupa Huruf dan Angka (contoh: GA 1234)</p>
                            <input
                                type="text"
                                name="kodePenerbangan"
                                value={formData.kodePenerbangan}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
                            />
                        </div>
                    </div>

                    {/* Bandara Asal & Bandara Tujuan */}
                    <div className="grid grid-cols-2 gap-4 font-montserrat">
                        <div className="font-montserrat">
                            <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Bandara Asal</label>
                            <input
                                type="text"
                                name="bandaraAsal"
                                value={formData.bandaraAsal}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
                            />
                        </div>
                        <div className="font-montserrat">
                            <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Bandara Tujuan</label>
                            <input
                                type="text"
                                name="bandaraTujuan"
                                value={formData.bandaraTujuan}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
                            />
                        </div>
                    </div>

                    {/* Waktu Keberangkatan & Waktu Tiba */}
                    <div className="grid grid-cols-2 gap-4 font-montserrat">
                        <div className="font-montserrat">
                            <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Waktu Keberangkatan</label>
                            <input
                                type="time"
                                name="waktuKeberangkatan"
                                value={formData.waktuKeberangkatan}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
                            />
                        </div>
                        <div className="font-montserrat">
                            <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Waktu Tiba</label>
                            <input
                                type="time"
                                name="waktuTiba"
                                value={formData.waktuTiba}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
                            />
                        </div>
                    </div>

                    {/* Tanggal Keberangkatan */}
                    <div className="font-montserrat">
                        <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Tanggal Keberangkatan</label>
                        <input
                            type="date"
                            name="tanggalKeberangkatan"
                            value={formData.tanggalKeberangkatan}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
                        />
                    </div>

                    {/* Harga Per-Pajak */}
                    <div className="font-montserrat">
                        <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Harga Per-Pajak</label>
                        <div className="relative font-montserrat">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-montserrat">Rp</span>
                            <input
                                type="text"
                                name="hargaPajak"
                                value={formData.hargaPajak}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-8 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
                            />
                        </div>
                    </div>

                    <div className="text-right pt-4 font-montserrat">
                        <button
                            type="submit"
                            className="bg-[#96B3E3] hover:bg-[#7c9ed3] text-white px-8 py-2 rounded-xl font-semibold transition-colors duration-200 font-montserrat"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
// -------------------- End Modal Tambah/Edit Penerbangan Component --------------------

// -------------------- Modal Tambah Pesawat Component (Tidak Berubah) --------------------
function ModalTambahPesawat({ onClose }) {
  const [kelasSeats, setKelasSeats] = useState({
    ekonomi: '',
    ekonomiPremium: '',
    bisnis: '',
    firstClass: '',
  });

  const handleSeatChange = (kelas, value) => {
    setKelasSeats((prev) => ({
      ...prev,
      [kelas]: value,
    }));
  };

  const handleSubmitPesawat = (e) => {
    e.preventDefault();
    console.log("Pesawat data submitted:", {
      // Add your form data fields here
      kelasSeats
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-montserrat">
      <div className="bg-white w-[90%] max-w-2xl rounded-2xl p-6 relative shadow-lg font-montserrat">
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl p-1 rounded-full hover:bg-gray-100 font-montserrat">
          <IoClose />
        </button>
        <h3 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-2 rounded-xl mb-6 font-montserrat">
          Tambah Pesawat
        </h3>
        <form onSubmit={handleSubmitPesawat} className="space-y-4 font-montserrat">
          {/* Tipe Pesawat Penerbangan & Kode Penerbangan - MODIFIKASI */}
          <div className="grid grid-cols-2 gap-4 font-montserrat">
            <div className="font-montserrat">
              <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Tipe Pesawat Penerbangan</label>
              <p className="text-xs text-gray-500 mb-1 invisible font-montserrat">Placeholder</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
              />
            </div>
            <div className="font-montserrat">
              <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Kode Penerbangan</label>
              <p className="text-xs text-gray-500 mb-1 font-montserrat">Dimulai dua misal maskapai dan 3 digit nomor maskapai</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
              />
            </div>
          </div>

          {/* Bandara Asal & Bandara Tujuan (Tidak Berubah, asumsikan tidak ada isu alignment di sini) */}
          <div className="grid grid-cols-2 gap-4 font-montserrat">
            <div className="font-montserrat">
              <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Bandara Asal</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
              />
            </div>
            <div className="font-montserrat">
              <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Bandara Tujuan</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
              />
            </div>
          </div>

          {/* Kursi Pesawat & Jumlah Penumpang Pesawat (Modifikasi, asumsikan memiliki isu alignment yang sama) */}
          <div className="grid grid-cols-2 gap-4 font-montserrat">
            <div className="font-montserrat">
              <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Kursi Pesawat (Total)</label>
              <p className="text-xs text-gray-500 mb-1 invisible font-montserrat">Placeholder</p>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
              />
            </div>
            <div className="font-montserrat">
              <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Jumlah Penumpang Pesawat</label>
              <p className="text-xs text-gray-500 mb-1 font-montserrat">(Jumlah penumpang yang dapat disediakan)</p>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] font-montserrat"
              />
            </div>
          </div>

          {/* Kelas Penerbangan (Tidak Berubah, karena sudah sejajar dengan cara sebelumnya) */}
          <div className="font-montserrat">
            <label className="block text-sm font-bold text-[#3D5895] mb-1 font-montserrat">Jumlah Kursi per Kelas Penerbangan</label>
            <p className="text-xs text-gray-500 mb-2 font-montserrat">(Tentukan jumlah kursi yang tersedia untuk setiap kelas)</p>
            <div className="flex flex-nowrap items-center gap-x-4 overflow-x-auto pb-2 font-montserrat">
              {/* Ekonomi */}
              <div className="flex-shrink-0 flex items-center gap-1 font-montserrat">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center font-montserrat"
                  value={kelasSeats.ekonomi}
                  onChange={(e) => handleSeatChange('ekonomi', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap font-montserrat">Ekonomi</span>
              </div>

              {/* Ekonomi Premium */}
              <div className="flex-shrink-0 flex items-center gap-1 font-montserrat">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center font-montserrat"
                  value={kelasSeats.ekonomiPremium}
                  onChange={(e) => handleSeatChange('ekonomiPremium', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap font-montserrat">Ekonomi Premium</span>
              </div>

              {/* Bisnis */}
              <div className="flex-shrink-0 flex items-center gap-1 font-montserrat">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center font-montserrat"
                  value={kelasSeats.bisnis}
                  onChange={(e) => handleSeatChange('bisnis', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap font-montserrat">Bisnis</span>
              </div>

              {/* First Class */}
              <div className="flex-shrink-0 flex items-center gap-1 font-montserrat">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center font-montserrat"
                  value={kelasSeats.firstClass}
                  onChange={(e) => handleSeatChange('firstClass', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap font-montserrat">First Class</span>
              </div>
            </div>
          </div>

          <div className="text-right pt-4 font-montserrat">
            <button
              type="submit"
              className="bg-[#96B3E3] hover:bg-[#7c9ed3] text-white px-8 py-2 rounded-xl font-semibold transition-colors duration-200 font-montserrat"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
// -------------------- End Modal Tambah Pesawat Component --------------------


export default function KelolaPenerbangan() {
    const [dataPenerbangan, setDataPenerbangan] = useState(data.penerbangan);
    const [showAddPenerbanganModal, setShowAddPenerbanganModal] = useState(false);
    const [selectedPenerbangan, setSelectedPenerbangan] = useState(null); // New state for editing
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation
    const [penerbanganToDelete, setPenerbanganToDelete] = useState(null); // Stores flight to delete
    const [showAddPesawatModal, setShowAddPesawatModal] = useState(false); // Existing state for Tambah Pesawat modal

    // Function to handle flight deletion
    const handleDeletePenerbangan = () => {
        if (penerbanganToDelete) {
            // Filter out the flight to be deleted. Assuming 'id' is unique for identification.
            const updatedData = dataPenerbangan.filter(penerbangan => penerbangan.id !== penerbanganToDelete.id);
            setDataPenerbangan(updatedData);
            setShowDeleteConfirm(false); // Close the confirmation modal
            setPenerbanganToDelete(null); // Clear the flight to delete
            console.log('Penerbangan deleted:', penerbanganToDelete);
            // In a real application, you would also make an API call here to delete from the database.
        }
    };

    // Function to handle adding a new flight (placeholder)
    const handleAddPenerbangan = (newFlightData) => {
        // In a real app, you'd get an ID from the backend
        const newId = dataPenerbangan.length > 0 ? Math.max(...dataPenerbangan.map(p => p.id)) + 1 : 1;
        const newFlight = { id: newId, ...newFlightData };
        setDataPenerbangan(prev => [...prev, newFlight]);
        console.log("Added new flight:", newFlight);
    };

    // Function to handle updating an existing flight (placeholder)
    const handleUpdatePenerbangan = (updatedFlightData) => {
        const updatedList = dataPenerbangan.map(penerbangan =>
            penerbangan.id === selectedPenerbangan.id ? { ...penerbangan, ...updatedFlightData } : penerbangan
        );
        setDataPenerbangan(updatedList);
        console.log("Updated flight:", updatedFlightData);
    };

    return (
        <div className="min-h-screen flex bg-white font-montserrat">
            {/* Sidebar */}
            <SidebarPenerbangan active="kelola" />

            {/* Main Content */}
            <main className="flex-1 px-6 py-6 font-montserrat">
                <h2 className="text-center text-xl font-bold text-[#3D5895] bg-[#8FAADC] py-3 rounded-xl mb-6 shadow-sm font-montserrat">
                    Kelola Data Penerbangan
                </h2>

                <div className="text-right mb-4 font-montserrat">
                    <button
                        onClick={() => {
                            setSelectedPenerbangan(null); // Clear any selected flight for 'Add'
                            setShowAddPenerbanganModal(true);
                        }}
                        className="px-4 py-2 border border-[#3D5895] rounded-xl text-[#3D5895] font-semibold hover:bg-[#e6ebf5] font-montserrat"
                    >
                        Tambah Penerbangan
                    </button>
                    <button
                        onClick={() => setShowAddPesawatModal(true)}
                        className="px-4 py-2 border border-[#3D5895] rounded-xl text-[#3D5895] font-semibold hover:bg-[#e6ebf5] ml-2 font-montserrat"
                    >
                        Tambah Pesawat
                    </button>
                </div>

                <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200 font-montserrat">
                    <table className="w-full text-sm font-montserrat">
                        <thead className="bg-[#3D5895] text-white font-montserrat">
                            <tr>
                                <th className="p-3 text-left font-montserrat">ID</th>
                                <th className="p-3 text-left font-montserrat">Tipe Pesawat</th>
                                <th className="p-3 text-left font-montserrat">Tanggal</th>
                                <th className="p-3 text-left font-montserrat">Kode Penerbangan</th>
                                <th className="p-3 text-left font-montserrat">Bandara Keberangkatan</th>
                                <th className="p-3 text-left font-montserrat">Bandara Tujuan</th>
                                <th className="p-3 text-left font-montserrat">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPenerbangan.map((item) => (
                                <tr key={item.id} className="border-t border-gray-200 text-[#1E3269] even:bg-gray-50 hover:bg-blue-50 transition-colors duration-150 font-montserrat">
                                    <td className="p-3 font-montserrat">{item.id}</td>
                                    <td className="p-3 font-montserrat">{item.tipe_pesawat}</td>
                                    <td className="p-3 font-montserrat">{item.tanggal}</td>
                                    <td className="p-3 font-montserrat">{item.kode_penerbangan}</td>
                                    <td className="p-3 font-montserrat">{item.bandara_keberangkatan}</td>
                                    <td className="p-3 font-montserrat">{item.bandara_tujuan}</td>
                                    <td className="p-3 flex gap-3 font-montserrat">
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => {
                                                setPenerbanganToDelete(item);
                                                setShowDeleteConfirm(true);
                                            }}
                                            className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-100 transition-colors duration-150 font-montserrat"
                                        >
                                            <FaTrash />
                                        </button>
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => {
                                                setSelectedPenerbangan(item); // Set the flight to be edited
                                                setShowAddPenerbanganModal(true); // Open the same modal
                                            }}
                                            className="text-blue-500 hover:text-blue-700 p-1 rounded-md hover:bg-blue-100 transition-colors duration-150 font-montserrat"
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Render Modal Tambah/Edit Penerbangan */}
            {showAddPenerbanganModal && (
                <ModalTambahPenerbangan
                    onClose={() => {
                        setShowAddPenerbanganModal(false);
                        setSelectedPenerbangan(null); // Reset selected flight on close
                    }}
                    penerbanganToEdit={selectedPenerbangan} // Pass the flight data for editing
                    // onAdd={handleAddPenerbangan} // Pass add function (uncomment when implemented)
                    // onUpdate={handleUpdatePenerbangan} // Pass update function (uncomment when implemented)
                />
            )}

            {/* Render Modal Tambah Pesawat */}
            {showAddPesawatModal && <ModalTambahPesawat onClose={() => setShowAddPesawatModal(false)} />}

            {/* Render Modal Hapus Konfirmasi */}
            {showDeleteConfirm && (
                <ModalHapusKonfirmasi
                    onClose={() => {
                        setShowDeleteConfirm(false);
                        setPenerbanganToDelete(null);
                    }}
                    onConfirm={handleDeletePenerbangan}
                    itemToDelete={penerbanganToDelete}
                />
            )}
        </div>
    );
}