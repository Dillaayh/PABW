'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarHotel() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#3D5895] text-white p-6 flex flex-col justify-between">
      <div>
       <div className="flex items-center gap-3 text-3xl font-bold mb-18">
        <img
          src="/images/logo.svg"
          alt="Plane and Hotel Icon"
          className="w-12 h-12"
        />
        Gebookin
      </div>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2"></div>
          <p className="font-semibold">Swiss-Bellin Hotel</p>
        </div>

        <nav className="space-y-4 text-sm" aria-label="Sidebar menu hotel">
          <Link
            href="/pages/mitra/hotel/kelolaKamar"
            className={`block rounded-full px-4 py-2 w-full text-left font-semibold ${
              pathname === '/pages/mitra/hotel/kelolaKamar'
                ? 'bg-white text-[#3D5895]'
                : 'text-gray-300 hover:text-white hover:underline transition'
            }`}
          >
            Kelola Kamar Hotel
          </Link>
          <Link
            href="/pages/mitra/hotel/melihatStatus"
            className={`block rounded-full px-4 py-2 w-full text-left font-semibold ${
              pathname === '/pages/mitra/hotel/melihatStatus'
                ? 'bg-white text-[#3D5895]'
                : 'text-gray-300 hover:text-white hover:underline transition'
            }`}
          >
            Melihat Status
          </Link>
          <Link
            href="/pages/mitra/hotel/melihatKetersediaan"
            className={`block rounded-full px-4 py-2 w-full text-left font-semibold ${
              pathname === '/pages/mitra/hotel/melihatKetersediaan'
                ? 'bg-white text-[#3D5895]'
                : 'text-gray-300 hover:text-white hover:underline transition'
            }`}
          >
            Melihat Ketersediaan
          </Link>
        </nav>
      </div>
    </aside>
  );
}
