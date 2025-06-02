'use client';

import { FaTrash, FaEdit } from "react-icons/fa";

export default function TabelMitra({ searchTerm = "", dataMitra = [], onDelete, onEdit }) {
  // PERBAIKAN 1: Tambah safety check untuk dataMitra
  const safeDataMitra = Array.isArray(dataMitra) ? dataMitra : [];

  const filteredData = searchTerm ? 
    safeDataMitra.filter((mitra) =>
      mitra.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mitra.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mitra.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mitra.peran?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : safeDataMitra;

  // Fungsi untuk handle delete - langsung panggil onDelete dari parent
  const handleDeleteClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    // Panggil fungsi onDelete yang sudah ada SweetAlert di parent component
    if (onDelete && typeof onDelete === 'function') {
      onDelete(index);
    }
  };

  // Fungsi untuk handle edit - panggil onEdit dari parent yang sudah ada popup form
  const handleEditClick = (e, index, mitra) => {
    e.preventDefault();
    e.stopPropagation();
    // Panggil fungsi onEdit yang sudah ada popup form di parent component
    if (onEdit && typeof onEdit === 'function') {
      onEdit(index, mitra);
    }
  };

  return (
    <div className="bg-white  ml-[80px] overflow-hidden">
      <table className="w-full max-w-[1020px] min-w-[600px]">
        <thead className="bg-[#8FAADC]">
          <tr>
            <th className="py-2 px-4 text-center text-white font-bold text-base border-r border-gray-300">Nama Perusahaan</th>
            <th className="py-2 px-4 text-center text-white  font-bold text-base border-r border-gray-300">Nama Mitra</th>
            <th className="py-2 px-4 text-center text-white  font-bold text-base border-r border-gray-300">Email</th>
            <th className="py-2 px-4 text-center text-white  font-bold text-base border-r border-gray-300">Nomor Telepon</th>
            <th className="py-2 px-4 text-center text-white  font-bold text-base">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredData.length > 0 ? (
            filteredData.map((mitra, index) => (
              <tr key={index} className="border-t border-gray-300 ml-[40px] text-center hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{mitra.namaPerusahaan}</td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{mitra.namaMitra}</td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{mitra.email}</td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{mitra.nomorTelepon}</td>
                <td className="py-4 px-4 flex justify-center items-center gap-3">
                  <button 
                    onClick={(e) => handleDeleteClick(e, index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 p-0"
                    title="Hapus mitra"
                    type="button"
                  >
                    <FaTrash />
                  </button>
                  <button 
                    onClick={(e) => handleEditClick(e, index, mitra)}
                    className="text-[#3E588F] hover:text-[#3E588F] transition-colors duration-200 p-0"
                     title="Edit mitra"
                    type="button"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-8 text-center text-gray-500">
                Tidak ada data mitra yang ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}