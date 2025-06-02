'use client';

import { useState } from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TabelStatus({ searchTerm = "", dataStatus = [], onDelete, onEdit }) {
  const safeDataStatus = Array.isArray(dataStatus) ? dataStatus : [];

  const filteredData = searchTerm ? 
    safeDataStatus.filter((status) =>
      status.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.jenis?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : safeDataStatus;

  // Fungsi untuk handle delete - langsung panggil onDelete dari parent
  const handleDeleteClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    // Panggil fungsi onDelete yang sudah ada SweetAlert di parent component
    onDelete(index);
  };

  // Fungsi untuk handle edit - panggil onEdit dari parent
  const handleEdit = (e, index, status) => {
    e.preventDefault();
    e.stopPropagation();
    // Panggil fungsi onEdit yang sudah ada SweetAlert di parent component
    onEdit(index, status);
  };

  const handleDetail = (status) => {
    alert(`Melihat detail untuk: ${status.nama}`);
    // TODO: Implement proper detail view
  };

  return (
    <div className=" ml-[80px]">
      <table className="w-full max-w-[1020px] min-w-[600px]">
        <thead className="bg-[#8FAADC]">
          <tr>
            <th className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">Nama</th>
            <th className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">Email</th>
            <th className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">Jenis</th>
            <th className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">Jumlah Penerbangan</th>
            <th className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">Jumlah Ruangan</th>
            <th className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">Informasi</th>
            <th className="p-4 text-center text-gray-800  font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredData.length > 0 ? (
            filteredData.map((status, index) => (
              <tr key={index} className="border-t border-gray-300 hover:bg-gray-50">
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{status.nama}</td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{status.email}</td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm border-r border-gray-300">{status.jenis}</td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm text-center border-r border-gray-300">
                  {status.jumlahPenerbangan || '-'}
                </td>
                <td className="py-4 px-4 text-gray-800 font-medium text-sm text-center border-r border-gray-300">
                  {status.jumlahRuangan || '-'}
                </td>
                <td className="py-4 px-4 text-center border-r border-gray-300">
                  <button 
                    onClick={() => handleDetail(status)}
                    className="px-3 py-1 bg-[#3E588F] text-white text-xs rounded-[30px] hover:bg-blue-600 transition-colors"
                    title="Lihat detail"
                  >
                    Detail
                  </button>
                </td>
                <td className="p-4 flex justify-center items-center gap-3">
                  <button 
                    onClick={(e) => handleDeleteClick(e, index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 p-0"
                    title="Hapus status"
                    type="button"
                  >
                    <FaTrash />
                  </button>
                  <button 
                    onClick={(e) => handleEdit(e, index, status)}
                    className="text-[#3E588F] hover:text-[#3E588F] transition-colors duration-200 p-0"
                    title="Edit status"
                  >
                    <FaEdit />
                  </button>
                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-8 text-center text-gray-500">
                Tidak ada data status yang ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}