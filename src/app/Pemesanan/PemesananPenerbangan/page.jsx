"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function FlightBooking() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") || "Jakarta (CGK)";
  const to = searchParams.get("to") || "Bali (DPS)";
  const departure = searchParams.get("departure") || "2025-03-26T09:40";
  const arrival = searchParams.get("arrival") || "2025-03-26T12:35";
  const maskapai = searchParams.get("maskapai") || "Garuda Indonesia";
  const harga = searchParams.get("harga") || "1805236";

  const [formData, setFormData] = useState({
    kontakDepan: "",
    kontakBelakang: "",
    kontakTelepon: "",
    kontakEmail: "",
    titleNama: "",
    namaDepan: "",
    namaBelakang: "",
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
            Pemesanan Penerbangan
          </h1>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[Montserrat]">
          {/* Detail Kontak */}
          <div className="border rounded-2xl shadow border-[#3E588F]">
            <div className="bg-[#3E588F] text-white px-4 py-2 rounded-t-2xl">
              <h2 className="text-lg font-semibold">Detail Kontak (E-Ticket/Voucher)</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A]">Nama Depan</label>
                <input
                  name="kontakDepan"
                  value={formData.kontakDepan}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="Lattema"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A]">Nama Belakang</label>
                <input
                  name="kontakBelakang"
                  value={formData.kontakBelakang}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="Huang"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A]">Nomor Telepon</label>
                <input
                  name="kontakTelepon"
                  value={formData.kontakTelepon}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="08123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1E3A8A]">Email</label>
                <input
                  name="kontakEmail"
                  value={formData.kontakEmail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="AleanorZelie@gmail.com"
                />
                <p className="text-xs text-gray-500 mt-1">Cth : AleanorZelie@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Detail Penerbangan */}
          <div className="border rounded-2xl shadow border-[#3E588F]">
            <div className="bg-[#3E588F] text-white px-4 py-2 rounded-t-2xl">
              <h2 className="text-lg font-semibold">Detail Penerbangan</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#203562]">Title Nama</label>
                <select
                  name="titleNama"
                  value={formData.titleNama}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                >
                  <option value="">Pilih Title</option>
                  <option value="Tuan">Tuan</option>
                  <option value="Nyonya">Nyonya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#203562]">Nama Depan</label>
                <input
                  name="namaDepan"
                  value={formData.namaDepan}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="Lattema"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#203562]">Nama Belakang</label>
                <input
                  name="namaBelakang"
                  value={formData.namaBelakang}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-[#3E588F] text-[#203562]"
                  placeholder="Aleanor"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Penerbangan */}
        <div className="mt-10 font-[Montserrat] space-y-4">
          {/* Detail Penerbangan */}
          <div className="border border-[#3E588F] rounded-2xl shadow">
            <div className="bg-[#3E588F] text-white px-4 py-2 rounded-t-2xl">
              <h2 className="text-lg font-semibold">Detail Penerbangan</h2>
            </div>
          </div>

          {/* Keberangkatan */}
          <div className="border border-[#3E588F] rounded-2xl shadow p-4">
            <h3 className="text-md font-semibold text-[#203562] mb-4">Keberangkatan</h3>
            <div className="flex justify-between text-sm text-[#203562]">
              <div>
                <p className="font-medium">{from}</p>
                <p>{new Date(departure).toLocaleString("id-ID")}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{to}</p>
                <p>{new Date(arrival).toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <img src="/images/logo.svg" alt="Maskapai" className="w-6 h-6" />
              <span className="text-[#203562] text-sm font-medium">{maskapai}</span>
            </div>
          </div>

          {/* Detail Pembayaran */}
          <div className="border border-[#3E588F] rounded-2xl shadow p-4 space-y-4">
            <h3 className="text-md font-semibold text-[#203562]">Detail Pembayaran</h3>
            <div className="flex justify-between items-center">
                <label className="font-medium">Metode Pembayaran:</label>
                <select className="p-2 border border-[#3E588F] rounded text-[#203562]">
                  <option>GeBookPay</option>
                </select>
              </div>
            <div className="flex justify-between items-center">
              <label className="text-[#203562] text-sm font-medium">Total</label>
              <p className="text-sm font-bold text-red-600">
                Rp {Number(harga).toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Info Identitas */}
          <div className="border border-[#3E588F] rounded-2xl shadow p-4 font-[Montserrat] text-[#203562] space-y-3">
            <h2 className="text-lg font-semibold">Informasi Penulisan Identitas</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-gray-100 p-4 rounded-md text-sm flex-1">
                <p>
                  <strong>Nama:</strong>{" "}
                  {formData.titleNama} {formData.namaDepan} {formData.namaBelakang}
                </p>
              </div>
              <div className="text-xs text-[#203562] flex-1 self-center">
                <p>
                  Pastikan nama penumpang dimasukkan dengan tepat sesuai dengan yang tercantum pada tanda pengenal yang dikeluarkan pemerintah.
                  <br />Ikuti contoh berikut:
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Maka Penulisan nama seharusnya:</p>
              <div className="flex flex-wrap gap-4 text-sm pt-1">
                <p>Nama Depan: <strong>Lattema</strong></p>
                <p>Nama Belakang: <strong>Aleanor Zelie</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Selanjutnya */}
        <div className="text-right">
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
