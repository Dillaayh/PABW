export default function Navbar() {
    return (
      <nav className="flex justify-between items-center p-4 text-white absolute w-full z-10">
        <div className="flex items-center gap-2">
          <img src="images/logo.svg" alt="Logo" className="w-12 h-12" />
        </div>
        <ul className="flex gap-15 text-basic font-medium">
          <li><a href="#">Beranda</a></li>
          <li><a href="#">Tentang</a></li>
          <li><a href="#">Tiket</a></li>
          <li><a href="#">Pesan</a></li>
        </ul>
        <div className="flex gap-2 border border-white rounded-full">
          <button className="px-6 py-1 bg-white text-black border border-white rounded-full">Masuk</button>
          <button className="px-5 py-1 rounded-full">Daftar</button>
        </div>
      </nav>
    );
  }
