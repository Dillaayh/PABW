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
    <div className="border rounded-2xl shadow border-[#3E588F] p-4 space-y-2 font-[Montserrat] text-[#203562]">
      <h2 className="text-lg font-semibold text-[#1E3A8A]">Ringkasan Penumpang</h2>
      {passengers.length === 0 ? (
        <div>Belum ada penumpang yang diisi.</div>
      ) : (
        passengers.map((p, i) => (
          <div key={i}>
            Penumpang {i + 1}: {p.name || "(Belum diisi)"}
          </div>
        ))
      )}
      <div className="pt-2 text-sm space-y-1">
        <p><strong>Dari:</strong> {from}</p>
        <p><strong>Ke:</strong> {to}</p>
        <p><strong>Keberangkatan:</strong> {departure}</p>
        <p><strong>Kedatangan:</strong> {arrival}</p>
        <p><strong>Maskapai:</strong> {maskapai}</p>
        <p><strong>Harga:</strong> Rp {harga}</p>
      </div>
    </div>
  );
}
