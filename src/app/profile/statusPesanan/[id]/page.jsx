"use client";

import SidebarProfile from "@/app/components/sidebarProfile/sidebar";
import dataPesanan from "@/app/profile/statusPesanan/pesanan.json";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaChair,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle,
  FaHotel,
  FaPlaneDeparture,
  FaRegCircle,
  FaSuitcase,
  FaUtensils,
} from "react-icons/fa";

export default function DetailPesanan() {
  const router = useRouter();
  const { id } = useParams();
  const parsedId = parseInt(id);
  const detail = dataPesanan.find((item) => item.id === parsedId);
  const [showDetailHarga, setShowDetailHarga] = useState(false);

  if (isNaN(parsedId) || !detail) {
    return (
      <div className="p-8 text-red-600 font-semibold">Data tidak ditemukan</div>
    );
  }

  const toggleDetailHarga = () => {
    setShowDetailHarga(!showDetailHarga);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#EAF0FF] p-4 lg:p-8 text-black">
      {/* Sidebar */}
      <SidebarProfile className="w-full lg:w-1/4 mb-4 lg:mb-0" />

      {/* Main Content */}
      <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8 lg:ml-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Status Pesanan
        </h2>

        <div className="bg-[#B3C2E8] rounded-2xl p-6">
          <div className="bg-white rounded-2xl p-6 shadow space-y-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                {detail.type === "hotel" ? (
                  <FaHotel className="text-3xl text-[#324C9B]" />
                ) : (
                  <FaPlaneDeparture className="text-3xl text-[#324C9B]" />
                )}
                <div>
                  <h3 className="font-bold text-lg">{detail.nama}</h3>
                  {detail.kode && (
                    <p className="text-sm text-gray-600">{detail.kode}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-right">{detail.tanggal}</p>
            </div>

            {/* Info Detail */}
            <div className="text-sm space-y-2">
              {detail.type === "hotel" ? (
                <>
                  <p>Check-in: {detail.checkin}</p>
                  <p>Check-out: {detail.checkout}</p>

                  <hr className="my-2" />

                  <p className="font-semibold">Fasilitas:</p>
                  {detail.fasilitas?.map((item, index) => (
                    <p key={index} className="text-[#3E588F]">
                      {item}
                    </p>
                  ))}

                  <p className="mt-2">
                    <span className="font-semibold"></span> {detail.tamu}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Berangkat: {detail.kode_bandara_berangkat},{" "}
                    {detail.berangkat}
                  </p>
                  <p>
                    Tiba: {detail.kode_bandara_tujuan},{detail.tiba}
                  </p>
                  <p>Durasi: {detail.durasi}</p>

                  <hr className="my-4" />

                  <div>
                    <p className="font-semibold">Penumpang:</p>
                    <ul className="list-disc list-inside text-sm">
                      {["Dewasa", "Anak-anak"].map((kategori, index) => {
                        // Menghitung jumlah penumpang berdasarkan kategori
                        const jumlah = detail.penumpang.filter(
                          (p) => p.kategori === kategori
                        ).length;
                        return jumlah > 0 ? (
                          <li key={index}>
                            {jumlah} {kategori}{" "}
                            {/* Menampilkan jumlah kategori */}
                          </li>
                        ) : null; // Jika tidak ada penumpang di kategori ini, jangan ditampilkan
                      })}
                    </ul>
                  </div>

                  <div className="mt-2">
                    <p className="font-semibold">Kelas Penerbangan:</p>
                    <p>{detail.kelas}</p>
                  </div>

                  <hr className="my-2" />

                  <div className="mt-4 space-y-2">
                    <p className="flex items-center gap-2 text-gray-600">
                      <FaExclamationTriangle className="text-[#3E588F]" />{" "}
                      {detail.refund}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <FaExclamationTriangle className="text-[#3E588F]" />{" "}
                      {detail.reschedule}
                    </p>
                  </div>
                </>
              )}
            </div>

            {detail.type === "pesawat" && (
              <div className="space-y-2">
                <h4 className="font-semibold">Data Pemesanan</h4>
                <div className="bg-gray-100 rounded-xl p-4 shadow">
                  <p>{detail.nama_pemesan}</p>
                  <p className="text-sm text-gray-600 underline">
                    {detail.email_pemesan}
                  </p>

                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FaSuitcase className="text-black" />
                      <p>Bagasi {detail.bagasi}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaChair className="text-black" />
                      <p>No Kursi : {detail.no_kursi}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUtensils className="text-black" />
                      <p>{detail.jenis_makan}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {detail.type === "hotel" && (
              <div className="space-y-2">
                <hr className="my-2" />
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaExclamationTriangle className="text-[#3E588F]" />{" "}
                    {detail.refund}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaExclamationTriangle className="text-[#3E588F]" />{" "}
                    {detail.reschedule}
                  </p>
                </div>
                <h4 className="font-semibold">Data Pemesan</h4>
                <div className="bg-gray-100 rounded-xl p-4 shadow text-sm space-y-1">
                  <p>{detail.nama_pemesan}</p>
                  <p className="underline text-gray-600">
                    {detail.email_pemesan}
                  </p>
                  <div className="flex items-center gap-2">
                    {detail.untuk_sendiri ? (
                      <>
                        <FaRegCircle className="text-green-600" />
                        <p>Pesanan untuk sendiri</p>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="text-gray-600" />
                        <p>Pesanan untuk sendiri</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!detail.untuk_sendiri ? (
                      <>
                        <FaRegCircle className="text-gray-600" />
                        <p>Pesanan untuk orang</p>
                      </>
                    ) : (
                      <>
                        <FaRegCircle className="text-gray-600" />
                        <p>Pesanan untuk orang</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Rincian Harga */}
            <div className="space-y-2">
            <h4
              className="font-semibold flex justify-between items-center cursor-pointer"
              onClick={detail.type === 'pesawat' ? toggleDetailHarga : undefined}
            >
              Rincian Harga
              {detail.type === 'pesawat' &&
                (showDetailHarga ? <FaChevronUp /> : <FaChevronDown />)}
            </h4>

              {detail.type === 'pesawat' && (
                <>
                  {/* Harga total collapsible */}
                  <div className="bg-gray-100 rounded-xl p-4 shadow flex justify-between text-sm font-bold text-red-600">
                    <span className="text-black">Harga Total</span>
                    <span>Rp {(
                      detail.harga_anak_anak + detail.harga_dewasa + detail.harga_diskon
                    ).toLocaleString()}</span>
                  </div>

                  {/* Rincian jika dibuka */}
                  {showDetailHarga && (
                    <div className="bg-gray-100 rounded-xl p-4 shadow space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>{detail.nama} (Dewasa) (1x)</span>
                        <span>Rp {detail.harga_dewasa.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>(Anak-anak) (1x)</span>
                        <span>Rp {detail.harga_anak_anak.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Biaya Kursi</span>
                        <span>Rp 0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Asuransi Perjalanan (1x)</span>
                        <span>Rp {detail.harga_diskon}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>Rp {(detail.harga_dewasa + detail.harga_anak_anak + detail.harga_diskon).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </>
              )}

            {detail.type === 'hotel' && (
              <div className="bg-gray-100 rounded-xl p-4 shadow space-y-2 text-sm">
                <div className="font-semibold text-black">Harga Total</div>
                
                <div className="flex justify-end line-through text-gray-500">
                  <span>Rp {detail.harga_normal.toLocaleString()}</span>
                </div>

                <div className="flex justify-end font-bold text-[#F23131]">
                  <span>Rp {detail.harga_diskon.toLocaleString()}</span>
                </div>

                <div className="text-xs text-[#000000]/30 text-right">Termasuk pajak dan biaya pemulihan</div>
              </div>
            )}

            </div>


            {/* Tombol Cetak */}
            <div className="text-right">
              <button
                className="bg-[#324C9B] text-white px-4 py-2 rounded-full text-sm shadow hover:bg-[#273e7d]"
                aria-label="Cetak Tiket"
                onClick={() =>
                  router.push(`/profile/statusPesanan/${id}/voucher`)
                }
              >
                Cetak Tiket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
