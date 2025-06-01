'use client'; // penting untuk menggunakan hook navigation

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-transparent text-white">
      {/* Logo */}
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.svg"
            alt="Plane and Hotel Icon"
            className="w-12 h-12"
          />
        </div>
      </div>

      {/* Menu */}
      <ul className="flex gap-8 text-[15px] font-light">
        <li>
          <Link
            href="/"
            className={`hover:underline cursor-pointer ${
              pathname === '/' ? 'font-semibold underline' : ''
            }`}
          >
            Beranda
          </Link>
        </li>
        <li>
          <Link
            href="/tentang"
            className={`hover:underline cursor-pointer ${
              pathname === '/tentang' ? 'font-semibold underline' : ''
            }`}
          >
            Tentang
          </Link>
        </li>
        <li>
          <Link
            href="/tiket"
            className={`hover:underline cursor-pointer ${
              pathname === '/tiket' ? 'font-semibold underline' : ''
            }`}
          >
            Tiket
          </Link>
        </li>
        <li>
          <Link
            href="/pesan"
            className={`hover:underline cursor-pointer ${
              pathname === '/pesan' ? 'font-semibold underline' : ''
            }`}
          >
            Pesan
          </Link>
        </li>
      </ul>

      {/* Tombol Masuk & Daftar */}
      <div className="flex border rounded-[20px] text-[15px] items-center gap-2">
        <Link href="/pages/auth/registrasi">
          <button
            className={`px-4 py-1 rounded-full font-semibold ${
              pathname === '/pages/auth/registrasi'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:text-black transition'
            }`}
          >
            Daftar
          </button>
        </Link>

        <Link href="/pages/auth/registrasi">
          <button
            className={`px-4 py-1 rounded-full font-semibold ${
              pathname === '/pages/auth/registrasi'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white hover:text-black transition'
            }`}
          >
            Daftar
          </button>
        </Link>
      </div>
    </nav>
  );
}
