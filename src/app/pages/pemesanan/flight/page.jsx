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
  const harga = Number(searchParams.get("harga") || 1805236);

  const [jumlahTiket, setJumlahTiket] = useState(1); // default 1 tiket
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    passengers: [
      {
        title: "",
        firstName: "",
        lastName: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const match = name.match(/passengers\[(\d+)\]\.(\w+)/);
    if (match) {
      const index = parseInt(match[1]);
      const field = match[2];

      const updatedPassengers = [...formData.passengers];
      updatedPassengers[index][field] = value;

      setFormData((prev) => ({
        ...prev,
        passengers: updatedPassengers,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validasi kosong
    const isContactEmpty =
      !formData.contactName.trim() ||
      !formData.contactEmail.trim() ||
      !formData.contactPhone.trim();

    const isPassengerEmpty = formData.passengers.some(
      (p) => !p.title.trim() || !p.firstName.trim() || !p.lastName.trim()
    );

    if (isContactEmpty || isPassengerEmpty) {
      Swal.fire({
        icon: "error",
        title: "Data Belum Lengkap",
        text: "Silakan lengkapi semua data sebelum melanjutkan!",
      });
      return;
    }

    // Validasi format email & nomor telepon sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!emailRegex.test(formData.contactEmail)) {
      Swal.fire({
        icon: "error",
        title: "Email Tidak Valid",
        text: "Masukkan alamat email yang benar.",
      });
      return;
    }

    if (!phoneRegex.test(formData.contactPhone)) {
      Swal.fire({
        icon: "error",
        title: "Nomor Telepon Tidak Valid",
        text: "Masukkan nomor telepon yang benar (10-15 digit).",
      });
      return;
    }

    setIsSubmitting(true);

    Swal.fire({
      icon: "success",
      title: "Data Lengkap",
      text: "Menuju halaman pembayaran...",
      timer: 1500,
      showConfirmButton: false,
      willClose: () => {
        router.push("/payment");
      },
    }).finally(() => {
      setIsSubmitting(false);
    });
  };

  useEffect(() => {
    const savedJumlah = localStorage.getItem("jumlahTiket");

    if (savedJumlah) {
      const jumlah = Number(savedJumlah);

      setJumlahTiket(jumlah);
      setFormData((prev) => ({
        ...prev,
        passengers: Array.from({ length: jumlah }, () => ({
          title: "",
          firstName: "",
          lastName: "",
        })),
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
              {formData.passengers.map((passenger, index) => (
                <FlightDetails
                  key={index}
                  index={index}
                  passenger={passenger}
                  handleChange={handleChange}
                />
              ))}
            </div>
          </div>

          <FlightPaymentDetails
            passengers={formData.passengers}
            from={from}
            to={to}
            departure={departure}
            arrival={arrival}
            maskapai={maskapai}
            harga={harga}
          />

          {/* Tampilkan InfoIdentitas di bawah form */}
          <InfoIdentitas formData={formData} />

          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 text-white font-[Montserrat] px-6 py-2 rounded-full disabled:opacity-50"
            >
              {isSubmitting ? "Memproses..." : "Selanjutnya"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
