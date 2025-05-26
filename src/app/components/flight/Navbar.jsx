export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 p-4 text-black bg-white fixed top-0 left-0 w-full z-50 shadow-md h-20">
      <div className="flex items-center gap-2">
        <img src="/images/logo.svg" alt="Logo" className="w-19 h-16" />
      </div>
      <ul className="flex gap-8 font-medium">
        <li><a href="#">Beranda</a></li>
        <li><a href="#">Tentang</a></li>
        <li><a href="#">Tiket</a></li>
        <li><a href="#">Pesan</a></li>
      </ul>
      <div className="flex gap-2">
        <button className="px-6 py-1 bg-black text-white rounded-full">Masuk</button>
        <button className="px-5 py-1 border border-black rounded-full">Daftar</button>
      </div>
    </nav>
  );
}
