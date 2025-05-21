import { useState, useRef, useEffect } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaExchangeAlt,
  FaCalendarAlt,
  FaUser,
  FaChair,
} from "react-icons/fa";

export default function FlightForm({
  from,
  to,
  setFrom,
  setTo,
  date,
  setDate,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  seatClass,
  setSeatClass,
}) {
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Daftar bandara gabungan
  const airports = [
    "Jakarta (CGK)",
    "Surabaya (SUB)",
    "Medan (KNO)",
    "Bali (DPS)",
    "Yogyakarta (YIA)",
    "Lombok (LOP)",
    "Bandung (BDO)",
    "Makassar (UPG)",
    "Semarang (SRG)",
    "Balikpapan (BPN)",
    "Palembang (PLM)",
  ];

  const handleSwap = () => {
    if (from === to) return;
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPassengerDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPassenger = `${adultCount} Dewasa${
    childCount > 0 ? `, ${childCount} Anak` : ""
  }`;

  return (
    <div className="bg-white p-8 rounded-2xl flex flex-col gap-6">
      {/* Bandara Asal - Tukar - Bandara Tujuan */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold text-[#203562] mb-1">Dari</label>
          <div className="flex items-center border border-[#203562] rounded-full px-4 py-2 text-[#203562] font-medium">
            <FaPlaneDeparture className="mr-2" />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-transparent outline-none w-full"
            >
              {airports.map((airport) => (
                <option key={airport} value={airport}>
                  {airport}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="self-center mt-6 md:mt-8 relative z-50">
          <button
            onClick={handleSwap}
            className="p-2 rounded-full bg-white border border-[#203562] text-[#203562] hover:bg-gray-100"
          >
            <FaExchangeAlt />
          </button>
        </div>

        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold text-[#203562] mb-1">Ke</label>
          <div className="flex items-center border border-[#203562] rounded-full px-4 py-2 text-[#203562] font-medium">
            <FaPlaneArrival className="mr-2" />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-transparent outline-none w-full"
            >
              {airports.map((airport) => (
                <option key={airport} value={airport}>
                  {airport}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tanggal, Penumpang, Kelas, Tombol Cari */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Tanggal */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-semibold text-[#203562] mb-1">Tanggal</label>
          <div className="flex items-center border border-[#203562] rounded-full px-4 py-2 text-[#203562] font-medium w-64">
            <FaCalendarAlt className="mr-2" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* Jumlah Penumpang */}
        <div className="relative flex flex-col w-full md:w-auto" ref={dropdownRef}>
          <label className="text-sm font-semibold text-[#203562] mb-1">Jumlah Penumpang</label>
          <button
            onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
            className="w-64 border border-[#203562] rounded-full px-4 py-2 text-[#203562] font-medium text-left flex items-center"
          >
            <FaUser className="mr-2" /> {totalPassenger}
          </button>

          {showPassengerDropdown && (
            <div className="absolute z-10 bg-white border rounded-xl shadow-lg mt-2 p-4 w-64 top-full">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-[#203562]">Dewasa</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                    className="w-6 h-6 text-white bg-[#203562] rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{adultCount}</span>
                  <button
                    onClick={() => setAdultCount(adultCount + 1)}
                    className="w-6 h-6 text-white bg-[#203562] rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-[#203562]">Anak</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChildCount(Math.max(0, childCount - 1))}
                    className="w-6 h-6 text-white bg-[#203562] rounded-full flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{childCount}</span>
                  <button
                    onClick={() => setChildCount(childCount + 1)}
                    className="w-6 h-6 text-white bg-[#203562] rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Kelas */}
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-sm font-semibold text-[#203562] mb-1">Kelas</label>
          <div className="flex items-center border border-[#203562] rounded-full px-4 py-2 text-[#203562] font-medium w-64">
            <FaChair className="mr-2" />
            <select
              value={seatClass}
              onChange={(e) => setSeatClass(e.target.value)}
              className="bg-transparent outline-none w-full"
            >
              <option>Ekonomi</option>
              <option>Bisnis</option>
              <option>First Class</option>
            </select>
          </div>
        </div>

        {/* Tombol Cari */}
        <button className="bg-orange-500 text-white font-semibold rounded-full px-6 py-3 hover:bg-orange-600 transition-all mt-6 md:mt-8 ml-auto">
          Cari
        </button>
      </div>
    </div>
  );
}
