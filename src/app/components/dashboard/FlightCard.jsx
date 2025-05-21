export default function FlightCard({ route, price, discount, image, isFavorite }) {
    return (
      <div className="relative rounded-xl overflow-hidden shadow-md w-full h-64">
        <img src={image} alt={route} className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
          <h2 className="text-white text-lg font-bold">{route}</h2>
          
          <div className="mt-2 flex justify-between items-center">
            <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {discount}
            </span>
            <span className="text-white text-sm font-bold">{price}</span>
          </div>
  
          {isFavorite && (
            <div className="absolute top-3 right-3 text-white text-xl">❤️</div>
          )}
        </div>
      </div>
    );
  }
  