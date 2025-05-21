import HotelCard from "./HotelCard";
import { hotelData } from "./Hoteldata";

export default function RekomendasiHotel() {
  return (
    <section className="px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold  text-blue-900 mb-2">Hotel Terbaik</h1>
      <p className="text-sm text-gray-500 mb-8">Harga terendah Hotel di destinasi utama!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotelData.slice(0, 6).map((hotel) => (
            <HotelCard
              key={hotel.id}
              city={hotel.city}
              image={hotel.image}
              isPopular={hotel.isPopular}
            />
          ))}
      </div>

      <button className="mt-10 border-2 border-[#203562] text-[#203562] rounded-full px-6 py-2 hover:bg-[#203562] hover:text-white transition">
        Cari Lebih Banyak Hotel
      </button>
    </section>
  );
}
