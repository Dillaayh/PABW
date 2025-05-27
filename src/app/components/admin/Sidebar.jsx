'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-[30px] ${
      pathname === path
        ? 'bg-white text-black'
        : 'hover:bg-white hover:text-black text-white'
    }`;

  return (
    <aside className="w-[300px] bg-[#3E588F] text-white flex flex-col p-6">
      <div className="flex items-center gap-3 text-3xl font-bold mb-8">
        <img
          src="/images/logo.svg"
          alt="Plane and Hotel Icon"
          className="w-12 h-12"
        />
        Gebookin
      </div>

      <nav className="space-y-4">
        <Link href="/admin/kelolaPengguna" className={linkClass('/admin/kelolaPengguna')}>
          Tata Kelola Pengguna
        </Link>
        <Link href="/admin/kelolamitra" className={linkClass('/admin/kelolamitra')}>
          Tata Kelola Mitra
        </Link>
        <Link href="/admin/status" className={linkClass('/admin/status')}>
          Melihat Status
        </Link>
        <Link href="/admin/kelolasaldo" className={linkClass('/admin/kelolasaldo')}>
          Kelola Saldo
        </Link>
      </nav>
    </aside>
  );
}
