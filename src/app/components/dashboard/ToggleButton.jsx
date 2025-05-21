import { FaHotel } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";

export default function ToggleButton({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center px-0 mt-6 gap-2 rounded-full border border-white">
      <div
        className={`flex items-center rounded-full p-2 px-25 transition duration-200 ${
          activeTab === 'hotel' ? 'bg-white' : ''
        }`}
      >
        <FaHotel
          className={`${
            activeTab === 'hotel' ? 'text-black' : 'text-white'
          }`}
        />
        <button
          onClick={() => setActiveTab('hotel')}
          className={`px-3 py-2 rounded-full flex items-center gap-1 transition duration-200 ${
            activeTab === 'hotel' ? 'bg-white text-black' : 'text-white'
          }`}
        >
          Hotel
        </button>
      </div>

      <div
        className={`flex items-center p-2 px-18 rounded-full transition duration-200 ${
          activeTab === 'penerbangan' ? 'bg-white' : ''
        }`}
      >
        <FaPlane
          className={`${
            activeTab === 'penerbangan' ? 'text-black' : 'text-white'
          }`}
        />
        <button
          onClick={() => setActiveTab('penerbangan')}
          className={`px-2 py-2 rounded-full flex items-center gap-1 transition duration-200 ${
            activeTab === 'penerbangan' ? 'bg-white text-black' : 'text-white'
          }`}
        >
          Penerbangan
        </button>
      </div>
     
    </div>
  );
}
