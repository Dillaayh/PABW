import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-10 py-6 shadow-sm">
      <div className="flex items-center gap-4">
        <img src="/images/logo.png" alt="Logo" className="w-14 h-10" />
        <nav className="flex gap-6 text-lg">
          <a href="#" className="hover:underline">
            Beranda
          </a>
          <a href="#" className="hover:underline">
            Penerbangan
          </a>
          <a href="#" className="font-bold border-b-2 border-[#1C2C56]">
            Hotel
          </a>
          <a href="#" className="hover:underline">
            Pesan
          </a>
        </nav>
      </div>
      <div className="flex gap-4">
        <button className="border border-[#1C2C56] rounded-full px-4 py-1">
          Masuk
        </button>
        <button className="border border-[#1C2C56] bg-[#F2F5FB] rounded-full px-4 py-1">
          Daftar
        </button>
      </div>
    </header>
  );
};

export default Header;
