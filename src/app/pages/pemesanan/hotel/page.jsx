"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import HotelForm from "../../../components/hotel/HotelForm";
import HotelHeader from "../../..//components/hotel/HotelHeader";

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
    hotel,
    checkin,
    checkout,
    tipeKamar,
    harga,
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
        <HotelHeader />

        {/* Form Pemesanan */}
        <HotelForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

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
