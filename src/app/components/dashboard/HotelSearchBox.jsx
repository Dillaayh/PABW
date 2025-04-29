import { FaSearch } from "react-icons/fa";

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
            <FaSearch />
          </button>
        </div>
      </div>
    );
  }
  