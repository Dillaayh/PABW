"use client";
import { useState } from "react";
import Header from "../../components/hotels/Header";
import SearchForm from "../../components/hotels/SearchForm";
import FilterSidebar from "../../components/hotels/FilterSidebar";
import HotelCard from "../../components/hotels/HotelCard";

const hotels = [
  {
    name: "Hotel Swiss-Bellin",
    rating: 4,
    score: 8.5,
    location: "Balikpapan, Kalimantan Timur",
    reviews: "8,5 (2,5Rb Ulasan)",
    price: 377_882,
    originalPrice: 405_882,
    image: "/images/swissbellin.png",
  },
  {
    name: "Hotel BenaKutai Balikpapan",
    rating: 3,
    score: 8.1,
    location: "Balikpapan, Kalimantan Timur",
    reviews: "8,1 (2Rb Ulasan)",
    price: 260_331,
    originalPrice: 279_815,
    image: "/images/benakutai.png",
  },
  {
    name: "Hotel MaxOne Balikpapan",
    rating: 4,
    score: 8.4,
    location: "Balikpapan, Kalimantan Timur",
    reviews: "8,4 (1,9Rb Ulasan)",
    price: 546_098,
    originalPrice: null,
    image: "/images/maxone.png",
  },
  {
    name: "Hotel Novotel Balikpapan",
    rating: 5,
    score: 9.5,
    location: "Balikpapan, Kalimantan Timur",
    reviews: "9,5 (4,7Rb Ulasan)",
    price: 987_776,
    originalPrice: null,
    image: "/images/novotel.png",
  },
];

export default function BookingHotel() {
  const [lokasi, setLokasi] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 6000000]);

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const handleSearch = (lokasiInput) => {
    setLokasi(lokasiInput.trim().toLowerCase()); // Trim dan ubah ke lowercase untuk pencocokan yang lebih fleksibel
  };

  const filteredHotels = hotels.filter((hotel) => {
    console.log("Lokasi yang dicari:", lokasi);
    console.log("Lokasi hotel:", hotel.location.toLowerCase());
    return (
      hotel.location.toLowerCase().includes(lokasi) &&
      (selectedRatings.length === 0 || selectedRatings.includes(hotel.rating)) &&
      hotel.price >= priceRange[0] &&
      hotel.price <= priceRange[1]
    );
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchForm onSearch={handleSearch} />
      <div className="flex p-4 gap-4">
        <FilterSidebar
          selectedRatings={selectedRatings}
          handleRatingChange={handleRatingChange}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <HotelCard hotels={filteredHotels} />
      </div>
    </div>
  );
}
