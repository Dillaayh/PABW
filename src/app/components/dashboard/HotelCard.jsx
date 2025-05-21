export default function HotelCard({ city, image, isPopular }) {
    return (
      <div className="relative rounded-xl overflow-hidden shadow-md">
        <img src={image} alt={city} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
          <h2 className="text-white text-lg font-bold">Hotels di {city}</h2>
          {isPopular && (
            <button className="mt-2 bg-orange-500 text-white text-sm font-semibold py-1 px-4 rounded-full w-fit">
              Terlaris
            </button>
          )}
        </div>
      </div>
    );
  }
  