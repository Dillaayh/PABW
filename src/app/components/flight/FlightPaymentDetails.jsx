// components/FlightPaymentDetails.jsx
import React from "react";

export default function FlightPaymentDetails({
  passengers = [],
  from,
  to,
  departure,
  arrival,
  maskapai,
  harga,
}) {
  return (
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
          <label className="font-medium text-[#203562]">Metode Pembayaran:</label>
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
    </div>
  );
}
