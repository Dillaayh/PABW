import { useState } from "react";
import ToggleButton from "./ToggleButton";
import FlightSearchForm from "./FlightSearchBox";
import HotelSearchBox from "./HotelSearchBox";

export default function SearchContainer() {
  const [activeTab, setActiveTab] = useState("penerbangan"); // default tab

  return (
    <div className="flex flex-col min-h-screen w-full pt-8 pb-20 px-4 relative">
      {/* Konten utama */}
      <div className="flex-grow flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          {activeTab === "hotel" ? <HotelSearchBox /> : <FlightSearchForm />}
        </div>
      </div>

      {/* Toggle button tetap di bawah tanpa ubah styling */}
      <div className="w-full fixed bottom-0 left-0 bg-transparent flex justify-center z-50">
        <ToggleButton activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
