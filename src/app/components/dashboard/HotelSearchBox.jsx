import { FaSearch } from "react-icons/fa";

<<<<<<< HEAD
export default function HotelSearchBox() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border backdrop-blur-sm border-white p-10 rounded-xl w-full max-w-8xl">
        <p className="text-white font-semibold text-sm mb-1">
          Silakan tetapkan lokasi yang Anda inginkan!
        </p>
        <label className="block text-white font-bold mb-1">Lokasi</label>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Masukkan lokasi"
            className="flex-1 px-25 py-15 rounded-full focus:outline-none"
          />
          <button className="w-14 h-14 rounded-full bg-slate-300 text-black flex items-center justify-center">
=======
export default function SearchBox() {
    return (
      <div className="border border-white absolute p-6 rounded-xl w-full max-w-3xl mx-auto mt-20">
        <p className="text-white font-semibold text-sm mb-1">Silakan tetapkan lokasi yang Anda inginkan!</p>
        <label className="block text-white font-bold mb-1">Lokasi</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Masukkan lokasi"
            className="flex-1 px-4 py-2 rounded-full focus:outline-none"
          />
          <button className="w-10 h-10 rounded-full bg-slate-300 text-black flex items-center justify-center">
>>>>>>> 5393b4b (feat(ui): desain tampilan awal dashboard dengan Tailwind CSS)
            <FaSearch />
          </button>
        </div>
      </div>
<<<<<<< HEAD
    </div>
  );
}
=======
    );
  }
  
>>>>>>> 5393b4b (feat(ui): desain tampilan awal dashboard dengan Tailwind CSS)
