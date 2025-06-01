'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { LuNotebookPen } from 'react-icons/lu';
import { TiStarFullOutline } from 'react-icons/ti';
import { FaCog, FaPowerOff, FaBars } from 'react-icons/fa';

export default function SidebarProfile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: 'Saldo Saya',
      icon: <MdOutlineAccountBalanceWallet className="text-xl" />,
      href: '/pages/profile/saldo',
    },
    {
      label: 'Status Pesanan',
      icon: <LuNotebookPen className="text-xl" />,
      href: '/pages/profile/statusPesanan',
    },
    {
      label: 'Kumpulan Review Kamu',
      icon: <TiStarFullOutline className="text-xl" />,
      href: '/pages/profile/review',
    },
    {
      label: 'Akun Saya',
      icon: <FaCog className="text-xl" />,
      href: '/pages/profile/editProfile',
    },
    {
      label: 'Keluar',
      icon: <FaPowerOff className="text-xl" />,
      href: '/',
    },
  ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
        >
          <FaBars className="text-2xl text-gray-700" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

    <div
      className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-50 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        sm:relative sm:translate-x-0 sm:h-screen sm:w-full sm:max-w-xs sm:shadow-none sm:rounded-l-2xl sm:rounded-r-2xl sm:rounded-b-2xl sm:p-6
      `}
    >


        <h2 className="text-2xl font-semibold mb-4 text-center">Dilla Ayu Puspitasari</h2>
        <hr className="mb-6" />
        <ul className="flex flex-col gap-6">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-full transition text-base ${
                    isActive
                      ? 'bg-[#324C9B] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
