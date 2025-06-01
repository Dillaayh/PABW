// src/app/components/hotel/FilterSidebar.js

export default function FilterSidebar({
    selectedRatings,
    handleRatingChange,
    priceRange,
    setPriceRange,
  }) {
    return (
      <aside className="w-1/4 space-y-6">
        <div className="p-4 bg-[#F2F5FB] rounded-xl shadow">
          <h3 className="font-semibold text-black text-lg mb-2">Filter</h3>
  
          {/* Rating */}
          <div className="p-4 bg-[#F2F5FB] rounded-xl shadow">
            <h3 className="font-semibold text-black text-lg mb-2">Rating</h3>
            <div className="text-black space-y-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="mr-2"
                  />
                  <span>{"★".repeat(rating)}</span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Harga */}
          <div className="p-4 bg-[#F2F5FB] rounded-xl shadow">
            <h3 className="font-semibold text-black text-lg mb-2">Harga</h3>
            <div className="flex text-black items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([+e.target.value, priceRange[1]])
                }
                className="w-1/2 border rounded-md p-2"
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], +e.target.value])
                }
                className="w-1/2 border rounded-md p-2"
              />
            </div>
          </div>
        </div>
      </aside>
    );
  }
  