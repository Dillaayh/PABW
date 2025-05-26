import { useEffect } from 'react';

export default function AirlineList({ airlines, selectedAirlines }) {
  // Pengecekan duplikat ID (hanya untuk debug)
  useEffect(() => {
    const ids = airlines.map((a) => a.id);
    const hasDuplicate = new Set(ids).size !== ids.length;
    if (hasDuplicate) {
      console.warn('🚨 Duplikat airline.id terdeteksi di airlines array:', ids);
    }
  }, [airlines]);

  // Filter berdasarkan pilihan user
  const filteredAirlines =
    selectedAirlines.length === 0
      ? airlines
      : airlines.filter((airline) => selectedAirlines.includes(airline.id));

  return (
    <div className="bg-white p-6 rounded-2xl w-3/4">
      <div className="flex flex-col gap-4">
        {filteredAirlines.map((airline, index) => (
          <div
            key={`${airline.id}-${index}`} // Gunakan kombinasi agar unik
            className="flex items-center justify-between border border-gray-300 p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img src={airline.logo} alt={airline.name} className="w-12 h-12" />
              <div>
                <p className="text-lg font-bold text-[#203562]">{airline.name}</p>
                <p className="text-sm text-gray-500">09:40 - 12:35</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-orange-500 font-bold text-lg">Rp 1.805.236/pax</p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full mt-2">
                Pesan Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
