'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarPenerbangan() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#3D5895] text-white p-6 flex flex-col justify-between rounded-r-3xl">
      <div>
        <div className="flex items-center gap-2 mb-10">
          <Image src="/images/logo.svg" alt="Logo" width={32} height={32} />
          <h1 className="font-bold text-lg">Gebookin</h1>
        </div>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2"></div>
          <p className="font-semibold">Bandara Hj. Syifa Maulida</p>
        </div>

        <nav className="space-y-4 text-sm" aria-label="Sidebar menu hotel">
          <Link
            href="/mitra/penerbangan/kelolaPenerbangan"
            className={`block rounded-full px-4 py-2 w-full text-left font-semibold ${
              pathname === '/mitra/penerbangan/kelolaPenerbangan'
                ? 'bg-white text-[#3D5895]'
                : 'text-gray-300 hover:text-white hover:underline transition'
            }`}
          >
            Kelola Penerbangan
          </Link>
          <Link
            href="/mitra/penerbangan/melihatStatus"
            className={`block rounded-full px-4 py-2 w-full text-left font-semibold ${
              pathname === '/mitra/penerbangan/melihatStatus'
                ? 'bg-white text-[#3D5895]'
                : 'text-gray-300 hover:text-white hover:underline transition'
            }`}
          >
            Melihat Status
          </Link>
          <Link
            href="/mitra/penerbangan/melihatKetersediaan"
            className={`block rounded-full px-4 py-2 w-full text-left font-semibold ${
              pathname === '/mitra/penerbangan/melihatKetersediaan'
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
