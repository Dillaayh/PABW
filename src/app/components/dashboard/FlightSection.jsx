import FlightCard from './FlightCard';
import { flightData } from './FlightData';

export default function FlightSection() {
  return (
    <section className="px-6 py-16 text-center">
      <p className="text-lg text-[#203562]">Terlari̇s</p>
      <h2 className="text-3xl font-semibold text-[#203562] mb-2">Penawaran Terbaik Penerbangan</h2>
      <p className="text-gray-500 mb-8">Penerbangan terpilih dengan harga terbaik!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flightData.slice(0, 3).map((item) => (
          <FlightCard
            key={item.id}
            route={item.route}
            price={item.price}
            discount={item.discount}
            image={item.image}
            isFavorite={item.isFavorite}
          />
        ))}
      </div>

      <button className="mt-10 border-2 border-[#203562] text-[#203562] rounded-full px-6 py-2 hover:bg-[#203562] hover:text-white transition">
        Lihat Penerbangan Lainnya
      </button>
    </section>
  );
}
