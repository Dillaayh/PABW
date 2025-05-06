"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUser,
  FaExchangeAlt,
  FaChair,
} from "react-icons/fa";

export default function Home() {
  const [from, setFrom] = useState("Jakarta (CGK)");
  const [to, setTo] = useState("Bali (DPS)");
  const [date, setDate] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [seatClass, setSeatClass] = useState("Ekonomi");
  const dropdownRef = useRef(null);

  const [selectedAirlines, setSelectedAirlines] = useState([]);

  const airlines = [
    { id: "garuda", name: "Garuda Indonesia", logo: "/garuda.png" },
    { id: "transnusa", name: "TransNusa", logo: "/transnusa.png" },
    { id: "airasia", name: "AirAsia Indonesia", logo: "/airasia.png" },
  ];

  const handleAirlineCheckbox = (id) => {
    setSelectedAirlines((prev) =>
      prev.includes(id)
        ? prev.filter((airline) => airline !== id)
        : [...prev, id]
    );
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
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
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-[#cfd7eb] p-6 md:p-8 lg:p-10 rounded-[2rem] w-full max-w-7xl mx-auto mt-14">
        <div className="bg-white p-8 rounded-2xl flex flex-col gap-6">
          {/* Baris 1: Dari - Tukar - Ke */}
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
                  <option>Jakarta (CGK)</option>
                  <option>Surabaya (SUB)</option>
                  <option>Medan (KNO)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 md:mt-8">
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
                  <option>Bali (DPS)</option>
                  <option>Yogyakarta (YIA)</option>
                  <option>Lombok (LOP)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex flex-col w-full md:w-auto">
              <label className="text-sm font-semibold text-[#203562] mb-1">Tanggal</label>
              <div className="flex items-center border border-[#203562] rounded-full px-4 py-2 text-[#203562] font-medium w-64">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent outline-none w-full text-lg "
                />
              </div>
            </div>

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
                        className="w-6 h-6 text-white bg-[#203562] rounded-full flex items-center justify-center"
                        onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      >
                        -
                      </button>
                      <span>{adultCount}</span>
                      <button
                        className="w-6 h-6 text-white bg-[#203562] rounded-full flex items-center justify-center"
                        onClick={() => setAdultCount(adultCount + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#203562]">Anak</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-6 h-6 text-white bg-[#203562] rounded-full flex items-center justify-center"
                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      >
                        -
                      </button>
                      <span>{childCount}</span>
                      <button
                        className="w-6 h-6 text-white bg-[#203562] rounded-full flex items-center justify-center"
                        onClick={() => setChildCount(childCount + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

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

            <button className="bg-orange-500 text-white font-semibold rounded-full px-6 py-3 hover:bg-orange-600 transition-all mt-6 md:mt-8 ml-auto">
              Cari
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-6 mt-6">
          <div className="bg-white p-6 rounded-2xl w-1/4">
            <h2 className="text-xl font-bold text-[#203562] mb-4">Maskapai</h2>
            <div className="flex flex-col gap-2">
              {airlines.map((airline) => (
                <div key={airline.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={airline.id}
                    checked={selectedAirlines.includes(airline.id)}
                    onChange={() => handleAirlineCheckbox(airline.id)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <label htmlFor={airline.id} className="text-[#203562]">
                    {airline.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl w-3/4">
            <div className="flex flex-col gap-4">
              {airlines
                .filter((airline) =>
                  selectedAirlines.length === 0 || selectedAirlines.includes(airline.id)
                )
                .map((airline) => (
                  <div
                    key={airline.id}
                    className="flex items-center justify-between border border-gray-300 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={airline.logo}
                        alt={airline.name}
                        className="w-12 h-12"
                      />
                      <div>
                        <p className="text-lg font-bold text-[#203562]">
                          {airline.name}
                        </p>
                        <p className="text-sm text-gray-500">09:40 - 12:35</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-500 font-bold text-lg">
                        Rp 1.805.236/pax
                      </p>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-full mt-2">
                        Pesan Sekarang
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
