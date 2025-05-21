// components/AirlineFilter.jsx
export default function AirlineFilter({ airlines, selectedAirlines, onFilterChange }) {
  // Ambil maskapai unik berdasarkan ID
  const uniqueAirlines = [...new Map(airlines.map(item => [item.id, item])).values()];

  return (
    <div className="my-4 text-black">
      <h2 className="text-lg font-semibold mb-2">Filter Maskapai</h2>
      {uniqueAirlines.map((airline, index) => (
        <div key={index} className="flex items-center mb-1">
          <input
            type="checkbox"
            id={`airline-${index}`}
            checked={selectedAirlines.includes(airline.id)}
            onChange={() => onFilterChange(airline.id)}
            className="mr-2"
          />
          <label htmlFor={`airline-${index}`}>{airline.name}</label>
        </div>
      ))}
    </div>
  );
}
