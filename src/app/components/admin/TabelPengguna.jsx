'use client';

import { FaTrash, FaEdit } from "react-icons/fa";

export default function TablePengguna({ searchTerm, dataPengguna, onDelete, onEdit }) {
  // Filter data berdasarkan pencarian
  const filteredData = dataPengguna.filter((user) =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk handle delete - langsung panggil onDelete dari parent
  const handleDeleteClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    // Panggil fungsi onDelete yang sudah ada SweetAlert di parent component
    onDelete(index);
  };

  // Fungsi untuk handle edit - panggil onEdit dari parent yang sudah ada popup form
  const handleEditClick = (e, index, user) => {
    e.preventDefault();
    e.stopPropagation();
    // Panggil fungsi onEdit yang sudah ada popup form di parent component
    if (onEdit && typeof onEdit === 'function') {
      onEdit(index, user);
    }
  };

  return (
    <div className="bg-white ml-[80px] overflow-hidden">
      <table className="w-full max-w-[1020px] min-w-[600px]">
        <thead className="bg-[#8FAADC]">
          <tr>
            <th className="py-2 px-4 text-center text-white font-bold text-base border-r border-gray-300">Username</th>
            <th className="py-2 px-4 text-center text-white font-bold text-base border-r border-gray-300">Nama</th>
            <th className="py-2 px-4 text-center text-white font-bold text-base border-r border-gray-300">Email</th>
            <th className="py-2 px-4 text-center text-white  font-bold text-base">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredData.length > 0 ? (
            filteredData.map((user, index) => (
              <tr key={index} className="border-t border-gray-300 ml-[40px] text-center hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{user.username}</td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{user.nama}</td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{user.email}</td>
                <td className="py-4 px-4 flex justify-center items-center gap-3">
                  <button 
                    onClick={(e) => handleDeleteClick(e, index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 p-0"
                    title="Hapus Pengguna"
                    type="button"
                  >
                    <FaTrash />
                  </button>
                  <button 
                    onClick={(e) => handleEditClick(e, index, user)}
                    className="text-[#3E588F] hover:text-[#3E588F] transition-colors duration-200 p-0"
                    title="Edit Pengguna"
                    type="button"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-8 text-center text-gray-500">
                Tidak ada data yang ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}