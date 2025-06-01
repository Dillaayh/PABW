import { FaSearch } from "react-icons/fa";
import { IoPaperPlaneSharp } from "react-icons/io5";

export default function SearchBox() {
    return (
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl w-full max-w-4xl shadow-lg px-[120px] py-[100px]">
        <p className="text-white font-semibold text-sm mb-1">Silakan tetapkan lokasi yang Anda inginkan!</p>
        <label className="block text-white font-bold mb-1">Lokasi</label>
        <div className="flex gap-4 p-4">
          <div className="flex gap-2 items-center bg-white rounded-full">
            <IoPaperPlaneSharp className="text-[#3E588F] ml-5" />
            <input
              type="text"
              placeholder="Masukkan lokasi"
              className="flex-1  text-[#3E588F] px-4 py-2 rounded-full focus:outline-none"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-white text-[#3E588F]  hover:bg-blue-100 transition flex items-center justify-center">
              <FaSearch />
          </button>
        </div>
        
      </div>
    );
  }
  