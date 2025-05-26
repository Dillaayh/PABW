"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function HotelBooking() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hotel = searchParams.get("hotel") || "Nimora Grand Hotel";
  const checkin = searchParams.get("checkin") || "2025-05-10T14:00";
  const checkout = searchParams.get("checkout") || "2025-05-12T12:00";
  const tipeKamar = searchParams.get("tipeKamar") || "Deluxe King";
  const harga = searchParams.get("harga") || "1250000";

  const [formData, setFormData] = useState({
    kontakDepan: "",
    kontakBelakang: "",
    kontakTelepon: "",
    kontakEmail: "",
    metodePembayaran: "GeBookPay",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const isEmpty = Object.values(formData).some((val) => val.trim() === "");
    if (isEmpty) {
      Swal.fire({
        icon: "error",
        title: "Data Belum Lengkap",
        text: "Silakan lengkapi semua data sebelum melanjutkan!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Data Lengkap",
      text: "Menuju halaman pembayaran...",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      router.push("/payment");
    });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 font-[Montserrat]">
          <img src="/images/logo.svg" alt="logo" className="w-20" />
          <h1 className="text-2xl font-bold text-[#1E3A8A]">
            Pemesanan Hotel
          </h1>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[Montserrat]">
          {/* Detail Kontak */}
          <div className="border rounded-2xl shadow border-[#3E588F]">
            <div className="bg-[#3E588F] text-white px-4 py-2 rounded-t-2xl">
              <h2 className="text-lg font-semibold">
                Detail Kontak (E-Voucher)
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A]">
                  Nama Depan
                </label>
                <input
                  name="kontakDepan"
                  value={formData.kontakDepan}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="Nama Depan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A]">
                  Nama Belakang
                </label>
                <input
                  name="kontakBelakang"
                  value={formData.kontakBelakang}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="Nama Belakang"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A]">
                  Nomor Telepon
                </label>
                <input
                  name="kontakTelepon"
                  value={formData.kontakTelepon}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="08123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A]">
                  Email
                </label>
                <input
                  name="kontakEmail"
                  value={formData.kontakEmail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="example@email.com"
                />
              </div>
            </div>
          </div>

          {/* Detail Hotel */}
          <div className="border rounded-2xl shadow border-[#3E588F] font-[Montserrat]">
            <div className="bg-[#3E588F] text-white px-4 py-2 rounded-t-2xl">
              <h2 className="text-lg font-semibold">Detail Hotel</h2>
            </div>
            <div className="p-4 space-y-4 text-[#203562] text-sm">
              <div>
                <p className="font-medium">Nama Hotel:</p>
                <p>{hotel}</p>
              </div>
              <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Check-in</p>
                <p>{new Date(checkin).toLocaleString("id-ID")}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Check-out</p>
                <p>{new Date(checkout).toLocaleString("id-ID")}</p>
              </div>
              </div>
              <div>
                <p className="font-medium">Tipe Kamar:</p>
                <p>{tipeKamar}</p>
              </div>
              <div className="flex justify-between items-center">
                <label className="font-medium">Metode Pembayaran:</label>
                <select className="p-2 border border-[#3E588F] rounded text-[#203562]">
                  <option>GeBookPay</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label className="font-medium">Total:</label>
                <p className="font-bold text-red-600">
                  Rp {Number(harga).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Selanjutnya */}
        <div className="text-right mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-900 text-white font-[Montserrat] px-6 py-2 rounded-full"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
