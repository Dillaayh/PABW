import { FaHotel, FaPlane } from "react-icons/fa";

export default function ToggleButton({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center px-0  mt-6 gap-2 rounded-full bg-white ">
      {/* Hotel Button */}
      <div
        onClick={() => setActiveTab('hotel')}
        className={`flex items-center rounded-full p-2 px-30 cursor-pointer transition duration-200 
          ${activeTab === 'hotel' ? 'bg-[#3E588F] text-white' : 'hover:bg-[#3E588F] hover:text-white text-[#3E588F]'}`}
      >
        <FaHotel />
        <span className="px-3 py-2 rounded-full flex items-center gap-1">
          Hotel
        </span>
      </div>

      {/* Penerbangan Button */}
      <div
        onClick={() => setActiveTab('penerbangan')}
        className={`flex items-center rounded-full p-2 px-20 cursor-pointer transition duration-200
          ${activeTab === 'penerbangan' ? 'bg-[#3E588F] text-white' : 'hover:bg-[#3E588F] hover:text-white text-[#3E588F]'}`}
      >
        <FaPlane />
        <span className="px-3 py-2 rounded-full flex items-center gap-1">
          Penerbangan
        </span>
      </div>
    </div>
  );
}
