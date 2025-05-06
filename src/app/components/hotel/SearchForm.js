import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [lokasi, setLokasi] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [tanggalKeluar, setTanggalKeluar] = useState("");
  const [durasi, setDurasi] = useState("");
  const [dewasa, setDewasa] = useState(0);
  const [anak, setAnak] = useState(0);
  const [bayi, setBayi] = useState(0);

  const hitungDurasi = (masuk, keluar) => {
    const dateMasuk = new Date(masuk);
    const dateKeluar = new Date(keluar);
    const selisih = dateKeluar - dateMasuk;
    return Math.max(0, Math.ceil(selisih / (1000 * 60 * 60 * 24)));
  };

  const handleSearch = () => {
    const lokasiTrimmed = lokasi.trim(); // Menghapus spasi ekstra
    if (lokasiTrimmed) {
      console.log("Lokasi yang dicari:", lokasiTrimmed); // Debug log
      onSearch(lokasiTrimmed); // Mengirimkan nilai lokasi yang sudah di-trim ke parent (BookingHotel)
    } else {
      console.log("Lokasi tidak diisi!");
    }
  };

  return (
    <div className="relative px-10 py-20 overflow-hidden">
      <div
        className="absolute inset-1 bg-no-repeat bg-contain bg-top"
        style={{ backgroundImage: "url(img/bg.png)" }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Detail Hotel</h2>

        <div className="space-y-4">
          {/* Lokasi Input */}
          <div>
            <label className="block text-sm font-semibold">Lokasi Hotel</label>
            <input
              type="text"
              value={lokasi}
              placeholder="Balikpapan"
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Tanggal Input */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold">Tanggal Masuk</label>
              <input
                type="date"
                value={tanggalMasuk}
                onChange={(e) => {
                  const masuk = e.target.value;
                  setTanggalMasuk(masuk);
                  if (tanggalKeluar) {
                    setDurasi(hitungDurasi(masuk, tanggalKeluar));
                  }
                }}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Tanggal Keluar</label>
              <input
                type="date"
                value={tanggalKeluar}
                onChange={(e) => {
                  const keluar = e.target.value;
                  setTanggalKeluar(keluar);
                  if (tanggalMasuk) {
                    setDurasi(hitungDurasi(tanggalMasuk, keluar));
                  }
                }}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Durasi (malam)</label>
              <input
                type="number"
                value={durasi}
                readOnly
                className="w-full border rounded-md p-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Jumlah Tamu Input */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold">Dewasa</label>
              <input
                type="number"
                value={dewasa}
                min="0"
                onChange={(e) => setDewasa(Math.max(0, Number(e.target.value)))}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Anak</label>
              <input
                type="number"
                value={anak}
                min="0"
                onChange={(e) => setAnak(Math.max(0, Number(e.target.value)))}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Bayi</label>
              <input
                type="number"
                value={bayi}
                min="0"
                onChange={(e) => setBayi(Math.max(0, Number(e.target.value)))}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          {/* Tombol Cari */}
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full w-full mt-4 hover:bg-orange-600 transition"
          >
            Cari Hotel
          </button>
        </div>
      </div>
    </div>
  );
}
