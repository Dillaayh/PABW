import React from "react";

const HotelCard = ({ hotels }) => {
  return (
    <div className="w-3/4 space-y-4">
      {hotels.map((hotel, idx) => (
        <div key={idx} className="flex border rounded-xl overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="object-cover w-40 h-40"
          />
          <div className="flex flex-col justify-between p-4 w-full">
            <div>
              <h2 className="text-lg font-semibold text-blue-700">
                {hotel.name}
              </h2>
              <p className="flex items-center text-gray-500 text-sm">
                {hotel.location}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(hotel.rating)].map((_, i) => (
                  <span key={i} className="w-4 h-4 text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-500">Pilihan Promo Terbaik</p>
                {hotel.originalPrice && (
                  <p className="text-xs line-through text-gray-400">
                    Rp {hotel.originalPrice.toLocaleString("id-ID")}
                  </p>
                )}
                <p className="text-orange-600 text-lg font-semibold">
                  Rp {hotel.price.toLocaleString("id-ID")}
                </p>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full">
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelCard;
