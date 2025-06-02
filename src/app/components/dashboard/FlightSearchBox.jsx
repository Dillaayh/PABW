import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaWheelchair } from 'react-icons/fa';

export default function FlightSearchForm() {
  return (
    
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-xl w-full max-w-4xl shadow-lg py-[30px]">
        <h2 className="text-white text-lg md:text-xl font-semibold mb-6 text-center">
          Silakan tetapkan lokasi dan tanggal yang Anda inginkan!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-1">Dari</label>
            <div className="flex items-center bg-white rounded-full px-4 py-2">
              <FaPlaneDeparture className="text-[#3E588F] mr-2" />
              <input type="text" placeholder="Kota asal" className="flex-1 outline-none bg-transparent text-[#3E588F]" />
            </div>
          </div>
          <div>
            <label className="block text-white mb-1">Ke</label>
            <div className="flex items-center bg-white rounded-full px-4 py-2">
              <FaPlaneArrival className="text-[#3E588F] mr-2" />
              <input type="text" placeholder="Kota tujuan" className="flex-1 outline-none bg-transparent text-[#3E588F]" />
            </div>
          </div>
          <div>
            <label className="block text-white mb-1">Tanggal Pergi</label>
            <div className="flex items-center bg-white rounded-full px-4 py-2">
              <FaCalendarAlt className="text-[#3E588F] mr-2" />
              <input type="date" className="flex-1 outline-none bg-transparent text-[#3E588F]" />
            </div>
          </div>
          <div>
            <label className="block text-white mb-1">Kelas Penerbangan</label>
            <div className="flex items-center bg-white rounded-full px-4 py-2">
              <FaWheelchair className="text-[#3E588F] mr-2" />
              <input type="text" placeholder="Ekonomi / Bisnis" className="flex-1 outline-none bg-transparent text-[#3E588F]" />
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="bg-white text-[#3E588F] font-semibold px-6 py-2 rounded-full hover:bg-blue-100 transition">
            Cari
          </button>
        </div>
     
    </div>
  );
}
