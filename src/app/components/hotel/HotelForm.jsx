import React from "react";

export default function HotelForm({
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[Montserrat]">
      {/* Detail Kontak */}
      <div className="border rounded-2xl shadow border-[#3E588F]">
        <div className="bg-[#3E588F] text-white px-4 py-2 rounded-t-2xl">
          <h2 className="text-lg font-semibold">Detail Kontak (E-Voucher)</h2>
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
            <p>{formData.hotel}</p>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-medium">Check-in</p>
              <p>{new Date(formData.checkin).toLocaleString("id-ID")}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Check-out</p>
              <p>{new Date(formData.checkout).toLocaleString("id-ID")}</p>
            </div>
          </div>
          <div>
            <p className="font-medium">Tipe Kamar:</p>
            <p>{formData.tipeKamar}</p>
          </div>
          <div className="flex justify-between items-center">
            <label className="font-medium">Metode Pembayaran:</label>
            <select
              name="metodePembayaran"
              className="p-2 border border-[#3E588F] rounded text-[#203562]"
              value={formData.metodePembayaran}
              onChange={handleChange}
            >
              <option>GeBookPay</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="font-medium">Total:</label>
            <p className="font-bold text-red-600">
              Rp {Number(formData.harga).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
