import Image from 'next/image'; 
import RoomTable from './RoomTable';

export default function RoomCard({ room }) {
  return (
    <div className="bg-white border border-black shadow rounded-[30px] p-4">
      <h2 className="text-lg font-semibold mb-4">{room.name}</h2>

      <div className="flex gap-6">
        {/* Gambar di kiri */}
        <Image
          src={room.image}
          alt={room.name}
          width={192}
          height={128}
          className="object-cover rounded"
        />

        {/* Deskripsi dan tabel di kanan */}
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-wrap space-x-6">
            <div className="flex flex-col w-1/3">
              <p className="font-semibold">Informasi Ruangan:</p>
              <ul className="list-disc pl-6">
                {room.description.informasiRuangan.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col w-1/3">
              <p className="font-semibold">Fasilitas Utama:</p>
              <ul className="list-disc pl-6">
                {room.description.fasilitasUtama.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col w-1/3">
              <p className="font-semibold">Fasilitas Standar:</p>
              <ul className="list-disc pl-6">
                {room.description.fasilitasStandar.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col w-1/3">
              <p className="font-semibold">Fasilitas Ruangan:</p>
              <ul className="list-disc pl-6">
                {room.description.fasilitasRuangan.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col w-1/3">
              <p className="font-semibold">Amenities:</p>
              <ul className="list-disc pl-6">
                {room.description.amenities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <RoomTable options={room.options} />
        </div>
      </div>
    </div>
  );
}
