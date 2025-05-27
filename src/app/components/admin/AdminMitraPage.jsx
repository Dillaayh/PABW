'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminMitraPage() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/data/mitra.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Gagal memuat data:', err));
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const linkClass = (path) =>
    pathname === path ? 'text-blue-700 font-bold' : 'text-blue-500 hover:text-blue-700';

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
                  <Link href="/admin/kelolasaldo">
                    <button className="text-[20px] text-blue-500 hover:text-blue-700">
                      <FiEdit />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
