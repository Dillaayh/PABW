'use client';

import { useState } from 'react';
import Image from 'next/image'; // Image component is not used here, but kept if needed elsewhere
import { FaTrash, FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import data from '@/app/mitra/dataPenerbangan.json';
import SidebarPenerbangan from '@/app/components/sidebarMitra/penerbangan/page';

// -------------------- Modal Hapus Konfirmasi Component (New) --------------------
// This modal is for confirming deletion, similar to the previous example.
function ModalHapusKonfirmasi({ onClose, onConfirm, itemToDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[90%] max-w-sm rounded-2xl p-6 relative shadow-lg text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 text-2xl p-1 rounded-full hover:bg-gray-100">
          <IoClose />
        </button>

        <div className="mb-4">
          <FaTrash className="text-red-500 text-5xl mx-auto mb-3" />
          <h3 className="text-xl font-bold text-[#3D5895] mb-2">Konfirmasi Hapus</h3>
          <p className="text-gray-600">
            Apakah Anda yakin ingin menghapus penerbangan <strong className="text-[#3D5895]">{itemToDelete?.kode_penerbangan}</strong> ini? Aksi ini tidak dapat dibatalkan.
          </p>
        </div>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-[90%] max-w-2xl rounded-2xl p-6 relative shadow-lg">
                <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl p-1 rounded-full hover:bg-gray-100">
                    <IoClose />
                </button>
                <h3 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-2 rounded-xl mb-6">
                    {penerbanganToEdit ? 'Edit Penerbangan' : 'Tambah Penerbangan'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Tipe Pesawat Penerbangan & Kode Penerbangan */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-[#3D5895] mb-1">Tipe Pesawat Penerbangan</label>
                            <p className="text-xs text-gray-500 mb-1 invisible">Placeholder</p>
                            <input
                                type="text"
                                name="tipePesawat"
                                value={formData.tipePesawat}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#3D5895] mb-1">Kode Penerbangan</label>
                            <p className="text-xs text-gray-500 mb-1">Dapat berupa Huruf dan Angka (contoh: GA 1234)</p>
                            <input
                                type="text"
                                name="kodePenerbangan"
                                value={formData.kodePenerbangan}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                            />
                        </div>
                    </div>

                    {/* Bandara Asal & Bandara Tujuan */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-[#3D5895] mb-1">Bandara Asal</label>
                            <input
                                type="text"
                                name="bandaraAsal"
                                value={formData.bandaraAsal}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#3D5895] mb-1">Bandara Tujuan</label>
                            <input
                                type="text"
                                name="bandaraTujuan"
                                value={formData.bandaraTujuan}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                            />
                        </div>
                    </div>

                    {/* Waktu Keberangkatan & Waktu Tiba */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-[#3D5895] mb-1">Waktu Keberangkatan</label>
                            <input
                                type="time"
                                name="waktuKeberangkatan"
                                value={formData.waktuKeberangkatan}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#3D5895] mb-1">Waktu Tiba</label>
                            <input
                                type="time"
                                name="waktuTiba"
                                value={formData.waktuTiba}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                            />
                        </div>
                    </div>

                    {/* Tanggal Keberangkatan */}
                    <div>
                        <label className="block text-sm font-bold text-[#3D5895] mb-1">Tanggal Keberangkatan</label>
                        <input
                            type="date"
                            name="tanggalKeberangkatan"
                            value={formData.tanggalKeberangkatan}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                        />
                    </div>

                    {/* Harga Per-Pajak */}
                    <div>
                        <label className="block text-sm font-bold text-[#3D5895] mb-1">Harga Per-Pajak</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                            <input
                                type="text"
                                name="hargaPajak"
                                value={formData.hargaPajak}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl px-8 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
                            />
                        </div>
                    </div>

                    <div className="text-right pt-4">
                        <button
                            type="submit"
                            className="bg-[#96B3E3] hover:bg-[#7c9ed3] text-white px-8 py-2 rounded-xl font-semibold transition-colors duration-200"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[90%] max-w-2xl rounded-2xl p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500 text-2xl p-1 rounded-full hover:bg-gray-100">
          <IoClose />
        </button>
        <h3 className="text-center text-xl font-bold text-[#3D5895] bg-[#e6ebf5] py-2 rounded-xl mb-6">
          Tambah Pesawat
        </h3>
        <form onSubmit={handleSubmitPesawat} className="space-y-4">
          {/* Tipe Pesawat Penerbangan & Kode Penerbangan - MODIFIKASI */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Tipe Pesawat Penerbangan</label>
              <p className="text-xs text-gray-500 mb-1 invisible">Placeholder</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Kode Penerbangan</label>
              <p className="text-xs text-gray-500 mb-1">Dimulai dua misal maskapai dan 3 digit nomor maskapai</p>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Bandara Asal & Bandara Tujuan (Tidak Berubah, asumsikan tidak ada isu alignment di sini) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Bandara Asal</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Bandara Tujuan</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Kursi Pesawat & Jumlah Penumpang Pesawat (Modifikasi, asumsikan memiliki isu alignment yang sama) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Kursi Pesawat (Total)</label>
              <p className="text-xs text-gray-500 mb-1 invisible">Placeholder</p>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#3D5895] mb-1">Jumlah Penumpang Pesawat</label>
              <p className="text-xs text-gray-500 mb-1">(Jumlah penumpang yang dapat disediakan)</p>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3]"
              />
            </div>
          </div>

          {/* Kelas Penerbangan (Tidak Berubah, karena sudah sejajar dengan cara sebelumnya) */}
          <div>
            <label className="block text-sm font-bold text-[#3D5895] mb-1">Jumlah Kursi per Kelas Penerbangan</label>
            <p className="text-xs text-gray-500 mb-2">(Tentukan jumlah kursi yang tersedia untuk setiap kelas)</p>
            <div className="flex flex-nowrap items-center gap-x-4 overflow-x-auto pb-2">
              {/* Ekonomi */}
              <div className="flex-shrink-0 flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center"
                  value={kelasSeats.ekonomi}
                  onChange={(e) => handleSeatChange('ekonomi', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap">Ekonomi</span>
              </div>

              {/* Ekonomi Premium */}
              <div className="flex-shrink-0 flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center"
                  value={kelasSeats.ekonomiPremium}
                  onChange={(e) => handleSeatChange('ekonomiPremium', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap">Ekonomi Premium</span>
              </div>

              {/* Bisnis */}
              <div className="flex-shrink-0 flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center"
                  value={kelasSeats.bisnis}
                  onChange={(e) => handleSeatChange('bisnis', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap">Bisnis</span>
              </div>

              {/* First Class */}
              <div className="flex-shrink-0 flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  className="w-14 border border-gray-300 rounded-xl px-2 py-1.5 text-[#3E588F] focus:outline-none focus:ring-1 focus:ring-[#96B3E3] text-center"
                  value={kelasSeats.firstClass}
                  onChange={(e) => handleSeatChange('firstClass', e.target.value)}
                  placeholder="0"
                />
                <span className="text-sm font-semibold text-[#3D5895] whitespace-nowrap">First Class</span>
              </div>
            </div>
          </div>

          <div className="text-right pt-4">
            <button
              type="submit"
              className="bg-[#96B3E3] hover:bg-[#7c9ed3] text-white px-8 py-2 rounded-xl font-semibold transition-colors duration-200"
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
        <div className="min-h-screen flex bg-white">
            {/* Sidebar */}
            <SidebarPenerbangan active="kelola" />

            {/* Main Content */}
            <main className="flex-1 px-6 py-6">
                <div className="w-full bg-[#8FAADC] py-2 mb-6 rounded-xl">
                    <h2 className="text-center text-xl font-bold text-[#3E588F]">
                        Kelola Jadwal Penerbangan
                    </h2>
                </div>

                <div className="text-right mb-4">
                    <button
                        onClick={() => {
                            setSelectedPenerbangan(null); // Clear any selected flight for 'Add'
                            setShowAddPenerbanganModal(true);
                        }}
                        className="px-4 py-2 border border-[#3D5895] rounded-xl text-[#3D5895] font-semibold hover:bg-[#e6ebf5]"
                    >
                        Tambah Penerbangan
                    </button>
                    <button
                        onClick={() => setShowAddPesawatModal(true)}
                        className="px-4 py-2 border border-[#3D5895] rounded-xl text-[#3D5895] font-semibold hover:bg-[#e6ebf5] ml-2"
                    >
                        Tambah Pesawat
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-[#3D5895] rounded-xl overflow-hidden text-sm">
                        <thead className="bg-[#8FAADC] text-[#3E588F]">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Tipe Pesawat</th>
                                <th className="p-3 text-left">Tanggal</th>
                                <th className="p-3 text-left">Kode Penerbangan</th>
                                <th className="p-3 text-left">Bandara Keberangkatan</th>
                                <th className="p-3 text-left">Bandara Tujuan</th>
                                <th className="p-3 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPenerbangan.map((item) => (
                                <tr key={item.id} className="border-t text-[#1E3269] even:bg-gray-50 hover:bg-blue-50 transition-colors duration-150">
                                    <td className="p-3">{item.id}</td>
                                    <td className="p-3">{item.tipe_pesawat}</td>
                                    <td className="p-3">{item.tanggal}</td>
                                    <td className="p-3">{item.kode_penerbangan}</td>
                                    <td className="p-3">{item.bandara_keberangkatan}</td>
                                    <td className="p-3">{item.bandara_tujuan}</td>
                                    <td className="p-3 flex gap-3">
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => {
                                                setPenerbanganToDelete(item);
                                                setShowDeleteConfirm(true);
                                            }}
                                            className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-100 transition-colors duration-150"
                                        >
                                            <FaTrash />
                                        </button>
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => {
                                                setSelectedPenerbangan(item); // Set the flight to be edited
                                                setShowAddPenerbanganModal(true); // Open the same modal
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

                <div className="flex justify-end mt-6">
                    <button className="bg-[#96B3E3] hover:bg-[#7c9ed3] text-white font-semibold px-6 py-2 rounded-xl">
                        Simpan Perubahan
                    </button>
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