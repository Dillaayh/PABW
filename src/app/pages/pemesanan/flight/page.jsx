"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import FlightDetails from "../../../components/flight/FlightDetails";
import FlightContactDetails from "../../../components/flight/FlightContactDetails";
import FlightPaymentDetails from "../../../components/flight/FlightPaymentDetails";
import InfoIdentitas from "../../../components/flight/InfoIdentitas";

export default function FlightBooking() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") || "Jakarta (CGK)";
  const to = searchParams.get("to") || "Bali (DPS)";
  const departure = searchParams.get("departure") || "2025-03-26T09:40";
  const arrival = searchParams.get("arrival") || "2025-03-26T12:35";
  const maskapai = searchParams.get("maskapai") || "Garuda Indonesia";
  const harga = searchParams.get("harga") || "1805236";

  const [jumlahTiket, setJumlahTiket] = useState(1); // default 1 tiket
  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    passengers: [{ name: "" }], // 1 penumpang default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("passengers")) {
      const match = name.match(/passengers\[(\d+)\]\.name/);
      if (match) {
        const index = parseInt(match[1], 10);
        const updatedPassengers = [...formData.passengers];
        updatedPassengers[index].name = value;

        setFormData((prev) => ({
          ...prev,
          passengers: updatedPassengers,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  useEffect(() => {
    const savedJumlah = localStorage.getItem("jumlahTiket");

    if (savedJumlah) {
      const jumlah = Number(savedJumlah);

      setJumlahTiket(jumlah);
      setFormData((prev) => ({
        ...prev,
        passengers: Array.from({ length: jumlah }, () => ({ name: "" })),
      }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-4 font-[Montserrat]">
          <img src="/images/logo.svg" alt="logo" className="w-20" />
          <h1 className="text-2xl font-bold text-[#1E3A8A]">Pemesanan Penerbangan</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[Montserrat]">
  <FlightContactDetails formData={formData} handleChange={handleChange} />
  <div className="flex flex-col gap-6">
    {formData.passengers.map((penumpang, index) => (
      <FlightDetails
        key={index}
        index={index}
        name={penumpang.name}
        handleChange={handleChange}
      />
    ))}
  </div>
</div>

          <FlightPaymentDetails
            passengers={formData.passengers} // pastikan mengirim passengers
            from={from}
            to={to}
            departure={departure}
            arrival={arrival}
            maskapai={maskapai}
            harga={harga}
          />

          {formData.passengers.map((penumpang, index) => (
            <FlightDetails
              key={index}
              index={index}
              name={penumpang.name}
              handleChange={handleChange}
            />
          ))}
        </form>
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
