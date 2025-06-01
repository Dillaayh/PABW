'use client';

import SidebarProfile from '../../components/sidebarProfile/SidebarProfile';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    async function ambilData() {
      try {
        // Ganti nanti dengan API backend
        const data = [
          {
            id: 1,
            tanggal: '12 Maret 2025',
            deskripsi: 'Hotel ini sangat nyaman dan bersih!',
            rating: 5,
          },
          {
            id: 2,
            tanggal: '14 Maret 2025',
            deskripsi: 'Pesanannya tepat waktu, pelayanan memuaskan.',
            rating: 4,
          },
          {
            id: 3,
            tanggal: '15 Maret 2025',
            deskripsi: 'Proses pemesanan sangat mudah, namun pengiriman terlambat.',
            rating: 3,
          },
        ];

        setReviews(data);
        setMemuat(false);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    }

    ambilData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#EAF0FF] p-4 lg:p-8 text-black">
      {/* Sidebar */}
      <SidebarProfile />

      {/* Konten Utama */}
      <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8 lg:ml-8">
        <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">Kumpulan Review Kamu</h2>

        {/* Kartu Review */}
        <div className="bg-[#B3C2E8] rounded-2xl p-6 flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow">
            <FaStar className="text-3xl text-black mb-4" />
            <p className="text-sm text-black font-medium">Total Review</p>
            <p className="text-lg text-black font-semibold">
              {memuat ? 'Memuat...' : `${reviews.length} Review`}
            </p>
          </div>
        </div>

        {/* Garis Pembatas */}
        <hr className="border-t-2 border-gray-300 mb-6" />

        {/* Daftar Review */}
        <div>
          {memuat ? (
            <p>Sedang memuat review...</p>
          ) : (
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col bg-[#F5F7FB] rounded-xl px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-black">Tanggal: {review.tanggal}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-xl ${
                            index < review.rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.deskripsi}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
