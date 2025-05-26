'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiEdit } from 'react-icons/fi';

export default function AdminMitraPage() {
  const [search, setSearch] = useState('');
  const data = [
    { username: 'User123', name: 'Ayi Alana', email: 'ayigmail', saldo: 'Rp 2.000.000' },
    { username: 'User123', name: 'Dilla Ayu', email: 'Dilladilgmail', saldo: 'Rp 600.700' },
    { username: 'User123', name: 'Nabilia Chairunnisa', email: 'Nabsgmail', saldo: 'Rp 1.500.060' },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6"> 
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2 border rounded-full px-4 py-2 w-1/2">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Mencari"
            className="outline-none w-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 border rounded-[30px] px-4 py-2 text-[#1A3A64] font-medium">
          <FiPlus /> Tambah Saldo
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border text-sm">
          <thead className="bg-white text-[#1A3A64]">
            <tr className="border">
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Nama</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Sisa Saldo</th>
              <th className="py-2 px-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx} className="border hover:bg-gray-50">
                <td className="py-2 px-4">{item.username}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.saldo}</td>
                <td className="py-2 px-4">
                  <button className=" text-[502px] text-blue-500 hover:text-blue-700">
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
