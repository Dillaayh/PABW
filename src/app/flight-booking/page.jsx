"use client";

import Navbar from "../components/flight/Navbar";
import FlightForm from "../components/flight/FlightForm";
import AirlineFilter from "../components/flight/AirlineFilter";
import AirlineList from "../components/flight/AirlineList";
import { useState } from "react";

export default function FlightBookingPage() {
  const airlines = [
    { id: "garuda", name: "Garuda Indonesia", logo: "/images/garuda.png", departure: "08:00", arrival: "10:45", price: 1805236 },
    { id: "garuda", name: "Garuda Indonesia", logo: "/images/garuda.png", departure: "14:20", arrival: "17:15", price: 1880000 },
    { id: "transnusa", name: "TransNusa", logo: "/images/transnusa.png", departure: "09:40", arrival: "12:35", price: 1805236 },
    { id: "transnusa", name: "TransNusa", logo: "/images/transnusa.png", departure: "19:00", arrival: "21:45", price: 1750000 },
    { id: "airasia", name: "AirAsia Indonesia", logo: "/images/airasia.png", departure: "07:30", arrival: "09:55", price: 1805236 },
    { id: "airasia", name: "AirAsia Indonesia", logo: "/images/airasia.png", departure: "16:15", arrival: "18:40", price: 1780000 },
    { id: "citilink", name: "Citilink", logo: "/images/citilink.png", departure: "10:00", arrival: "12:25", price: 1690000 },
    { id: "citilink", name: "Citilink", logo: "/images/citilink.png", departure: "20:30", arrival: "22:55", price: 1740000 },
    { id: "batikair", name: "Batik Air", logo: "/images/batikair.png", departure: "06:45", arrival: "09:30", price: 1830000 },
    { id: "batikair", name: "Batik Air", logo: "/images/batikair.png", departure: "18:10", arrival: "20:55", price: 1855000 },
  ];

  // Tambahkan state untuk FlightForm
  const [from, setFrom] = useState("Jakarta (CGK)");
  const [to, setTo] = useState("Bali (DPS)");
  const [date, setDate] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [seatClass, setSeatClass] = useState("Ekonomi");

  // State untuk filter maskapai
  const [selectedAirlines, setSelectedAirlines] = useState([]);

  const handleFilterChange = (airlineId) => {
    setSelectedAirlines((prevSelected) =>
      prevSelected.includes(airlineId)
        ? prevSelected.filter((id) => id !== airlineId)
        : [...prevSelected, airlineId]
    );
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar />
      <div className="h-5" />
      <div className="bg-[#cfd7eb] p-8 rounded-[2rem] w-full max-w-7xl mx-auto mt-14">
        <FlightForm
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          date={date}
          setDate={setDate}
          adultCount={adultCount}
          setAdultCount={setAdultCount}
          childCount={childCount}
          setChildCount={setChildCount}
          seatClass={seatClass}
          setSeatClass={setSeatClass}
        />
        <div className="flex flex-row gap-6 mt-6">
          <AirlineFilter
            airlines={airlines}
            selectedAirlines={selectedAirlines}
            onFilterChange={handleFilterChange}
          />
          <AirlineList
            airlines={airlines}
            selectedAirlines={selectedAirlines}
          />
        </div>
      </div>
    </div>
  );
}
