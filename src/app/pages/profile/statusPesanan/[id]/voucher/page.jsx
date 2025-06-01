"use client";

import { useParams } from "next/navigation";
import dataPesanan from "../../../../profile/statusPesanan/pesanan.json";
import { useState } from "react";
import {
  FaPlaneDeparture,
  FaClock,
  FaRegCircle,
  FaCircle,
} from "react-icons/fa";

export default function Voucher() {
  const { id } = useParams();
  const parsedId = parseInt(id);
  const detail = dataPesanan.find((item) => item.id === parsedId);

  // useEffect(() => {
  //   window.print();
  // }, []);

  if (!detail)
    return <div className="p-10 text-center">Voucher tidak ditemukan</div>;

  return (
    <div className="bg-[#e7f0fb] min-h-screen py-10 px-4">
      <div className="bg-white w-full max-w-3xl mx-auto p-6 md:p-10 rounded-xl shadow-md text-black font-sans text-sm relative">
        {/* Header Umum */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold">GEBOOKIN</h2>
            {detail.type !== "hotel" && (
              <p className="text-sm mt-2">
                {new Date(detail.tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          {detail.type !== "hotel" && (
            <p className="text-sm mt-2">
              {new Date(detail.tanggal).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <div>
            <h2 className="text-lg font-semibold text-right">
              {detail.type === "pesawat" ? "Voucher Pesawat" : "Voucher Hotel"}
            </h2>
          </div>
        </div>

        {/* Voucher untuk PESAWAT */}
        {detail.type === "pesawat" && (
          <>
            <div className="flex justify-between items-center mb-6">
              {/* Nama */}
              <div>
                <p className="text-red-600 font-bold underline text-2xl mb-1">
                  {detail.nama.split(" ").map((word, index) => (
                    <span key={index}>
                      {word}
                      {index === 0 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </div>

              {/* Info Jadwal dan Rute */}
              <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">
                <div>
                  <p className="text-sm mb-6">
                    {new Date(detail.tanggal).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm">
                    {detail.jam_berangkat}{" "}
                    <FaCircle className="inline-block text-sm mx-2 text-[#3E588F]" />{" "}
                    {detail.rute_asal}
                  </p>
                  <p className="text-sm ml-18">{detail.bandara_asal}</p>
                  <p className="text-sm">
                    {detail.jam_tiba}{" "}
                    <FaRegCircle className="inline-block text-sm mx-2 text-[#3E588F]" />{" "}
                    {detail.rute_tujuan}
                  </p>
                  <p className="text-sm ml-18">
                    {detail.bandara_tujuan}
                  </p>
                </div>
              </div>

              {/* Kode Booking */}
              <div className="bg-[#3E588F]/30 px-4 py-2 rounded-lg text-center w-1/4 h-20">
                <p className="text-lg text-center">Kode booking</p>
                <p className="font-bold text-lg">{detail.id}</p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Info Icon */}
            <div className="flex flex-col md:flex-row justify-between items-start text-xs mb-4 ml-5 mr-5 gap-4">
              <div className="flex items-center space-x-2">
                <FaPlaneDeparture className="text-6xl" />
                <p className="text-sm">
                  Tunjukkan e-tiket dan identitas para penumpang saat pemesanan
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-6xl" />
                <p className="text-sm">
                  Pemesanan paling lambat 90 menit sebelum keberangkatan
                </p>
              </div>
            </div>

            <hr className="my-4" />

            {/* Daftar Penumpang */}
            {detail.penumpang && (
              <div className="bg-[#3E588F]/30 p-4 rounded-lg mb-4 overflow-x-auto">
                <table className="w-full text-left text-sm table-auto block md:table">
                  <thead className="hidden md:table-header-group">
                    <tr className="font-semibold">
                      <th className="w-1/12">No.</th>
                      <th className="w-1/3">Nama Penumpang</th>
                      <th className="w-1/3">Rute</th>
                      <th className="w-1/3">Bagasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.penumpang.map((p, idx) => (
                      <tr
                        key={idx}
                        className="md:table-row block border-t md:border-none mb-4 md:mb-0"
                      >
                        <td className="block md:table-cell font-semibold">
                          <span className="md:hidden font-bold">No: </span>
                          {idx + 1}.
                        </td>
                        <td className="block md:table-cell">
                          <span className="md:hidden font-bold">Nama: </span>
                          {p.nama}
                        </td>
                        <td className="block md:table-cell">
                          <span className="md:hidden font-bold">
                            Kategori:{" "}
                          </span>
                          {detail.kode_bandara_berangkat} -{" "}
                          {detail.kode_bandara_tujuan}
                        </td>
                        <td className="block md:table-cell">
                          <span className="md:hidden font-bold">Bagasi: </span>
                          {p.bagasi}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Voucher untuk HOTEL */}
        {detail.type === "hotel" && (
          <div className="bg-white text-black font-sans p-6 rounded-lg max-w-3xl mx-auto shadow-md">
            {/* Info Umum */}
            <div className="border border-gray-400 rounded p-4 mb-4 text-sm">
              <div className="flex justify-between mb-2">
                <p>
                  <strong>Order Id</strong> : {detail.id}
                </p>
                <p>
                  <strong>Tanggal</strong> :{" "}
                  {new Date(detail.tanggal).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p>
                <strong>Nama Pemesan</strong> : {detail.nama_pemesan}
              </p>
              <p>
                <strong>Email</strong> : {detail.email_pemesan}
              </p>
            </div>

            {/* DETAIL HOTEL */}
            <div className="mb-4">
              <div className="bg-blue-900 text-white px-4 py-2 rounded-t text-sm font-semibold">
                DETAIL HOTEL
              </div>
              <div className="border border-gray-400 rounded-b p-4 text-sm">
                <p>
                  <strong>Nama Hotel</strong> : {detail.nama}
                </p>
                <p>
                  <strong>Tipe Kamar</strong> : {detail.tipe_kamar}
                </p>
                <p>
                  <strong>Alamat</strong> : {detail.alamat}
                </p>
                <div className="flex justify-between mt-2">
                  <p>
                    <strong>Tgl Masuk</strong> : {detail.checkin}
                  </p>
                  <p>
                    <strong>Tgl Keluar</strong> : {detail.checkout}
                  </p>
                </div>
              </div>
            </div>

            {/* Rincian Tambahan */}
            <div className="border border-gray-400 rounded p-4 text-sm mb-4">
              <p>
                <strong>Jumlah Kasur</strong> : {detail.jumlah_kasur}
              </p>
              <p>
                <strong>Dewasa</strong> : {detail.dewasa}
              </p>
              <p>
                <strong>Anak-anak</strong> : {detail.anak}
              </p>
              <p>
                <strong>Sarapan</strong> :{" "}
                <span className="text-gray-600">
                  {detail.sarapan}
                </span>
              </p>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-600 mt-4">
          ● Jika Anda check in awal/terlambat di luar jam yang telah ditentukan,
          sebaiknya hubungi akomodasi terlebih dahulu demi kelancaran proses
          check in. Pemenuhan permintaan khusus bergantung pada ketersediaan
          akomodasi.
        </p>
      </div>
    </div>
  );
}
