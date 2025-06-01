'use client';

import React, { useEffect, useState } from 'react';
import { FiSearch, FiPlus, FiEdit } from 'react-icons/fi';
import { IoIosCheckmarkCircle, IoIosCloseCircle, IoMdArrowDropdown } from "react-icons/io";
import Sidebar from '../../../components/admin/Sidebar';
import PageTitle from '../../../components/admin/PageTitle';
import dataJson from '../../admin/dataSaldo.json';

export default function KelolaSaldo() {
  const [saldoList, setSaldoList] = useState([]);
  const [search, setSearch] = useState('');

  // Edit saldo modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editNewSaldo, setEditNewSaldo] = useState('');
  const [editKebutuhan, setEditKebutuhan] = useState('');
  const [editKeterangan, setEditKeterangan] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Tambah saldo modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);
  const [addNama, setAddNama] = useState('');
  const [addUsername, setAddUsername] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addSaldo, setAddSaldo] = useState('');
  const [addKebutuhan, setAddKebutuhan] = useState('');
  const [addKeterangan, setAddKeterangan] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keterangan, setKeterangan] = useState('');
  const [dropdownOpenKebutuhan, setDropdownOpenKebutuhan] = useState(false);
  const [dropdownOpenKeterangan, setDropdownOpenKeterangan] = useState(false);

  // Toggle dropdown Kebutuhan Saldo
  const toggleDropdownKebutuhan = () => {
    setDropdownOpenKebutuhan((prev) => !prev);
    setDropdownOpenKeterangan(false); // tutup dropdown Keterangan saat ini buka Kebutuhan
  };

  // Toggle dropdown Keterangan Saldo
  const toggleDropdownKeterangan = () => {
    setDropdownOpenKeterangan((prev) => !prev);
    setDropdownOpenKebutuhan(false); // tutup dropdown Kebutuhan saat ini buka Keterangan
  };

  // Pilih item Kebutuhan
  const handleSelectKebutuhan = (value) => {
    setEditKebutuhan(value);
    setDropdownOpenKebutuhan(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectKeterangan = (value) => {
    setKeterangan(value);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setSaldoList(dataJson.saldo || []);
  }, []);

  // --- GENERATE USERNAME ---
  function generateUsername(name) {
    const base = name.toLowerCase().replace(/\s+/g, '.');
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${base}${randomNum}`;
  }

  // --- HANDLE TAMBAH NAMA CHANGE ---
  const handleAddNamaChange = (e) => {
    const name = e.target.value;
    setAddNama(name);

    if (name.trim() !== '') {
      const username = generateUsername(name);
      setAddUsername(username);
    } else {
      setAddUsername('');
    }
  };

  // --- HANDLE EDIT MODAL ---
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditNewSaldo(user.saldo.toString());
    setEditKebutuhan('');
    setEditKeterangan('');
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setEditNewSaldo('');
    setEditKebutuhan('');
    setEditKeterangan('');
    setShowEditConfirmation(false);
  };

  // Simpan edit saldo (validasi dulu)
  const handleEditSave = () => {
    if (!editNewSaldo || isNaN(editNewSaldo) || parseInt(editNewSaldo) < 0) {
      alert('Saldo harus berupa angka positif.');
      return;
    }
    if (!editKebutuhan) {
      alert('Silakan pilih kebutuhan saldo (Tambah atau Kurang).');
      return;
    }
    if (!editKeterangan) {
      alert('Silakan pilih keterangan saldo.');
      return;
    }

    setShowEditConfirmation(true);
  };

  const handleUpdateSaldo = async () => {
    try {
        // Proses update saldo, misalnya API call
        await updateSaldoAPI(selectedUser.id, newSaldo);
        setShowSuccessModal(true);
      } catch (error) {
        setShowErrorModal(true);
    }
  };


  // Konfirmasi edit saldo
  const handleEditConfirmSave = () => {
  try {
    if (!editKebutuhan || !editNewSaldo) {
      alert('Mohon isi kebutuhan dan nominal saldo!');
      return;
    }

    // Ubah saldo sesuai kebutuhan tambah/kurang
    const nominal = parseInt(editNewSaldo);
    let updatedSaldo = selectedUser.saldo;

    if (editKebutuhan === 'Tambah') {
      updatedSaldo += nominal;
    } else if (editKebutuhan === 'Kurang') {
      updatedSaldo -= nominal;
      if (updatedSaldo < 0) updatedSaldo = 0; // supaya saldo tidak negatif
    }

    // Update saldoList dengan saldo yang baru
    const updatedList = saldoList.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, saldo: updatedSaldo };
      }
      return user;
    });

    setSaldoList(updatedList);

    // Tampilkan pesan sukses sesuai kebutuhan
    if (editKebutuhan === 'Tambah') {
      setSuccessMessage('Saldo berhasil ditambahkan.');
    } else if (editKebutuhan === 'Kurang') {
      setSuccessMessage('Saldo berhasil dikurangi.');
    } else {
      setSuccessMessage('Saldo berhasil diupdate.');
    }

    setShowSuccessModal(true);
    setShowEditConfirmation(false);
    setShowEditModal(false);

    // Reset input
    setEditNewSaldo('');
    setEditKebutuhan('');
    setEditKeterangan('');
  } catch (error) {
    // Tampilkan pesan gagal
    if (editKebutuhan === 'Tambah') {
      setErrorMessage('Gagal menambahkan saldo. Silakan coba lagi.');
    } else if (editKebutuhan === 'Kurang') {
      setErrorMessage('Gagal mengurangi saldo. Silakan coba lagi.');
    } else {
      setErrorMessage('Gagal memperbarui saldo. Silakan coba lagi.');
    }
    setShowErrorModal(true);
  }
};

  // --- HANDLE TAMBAH MODAL ---
  const openAddModal = () => {
    setAddNama('');
    setAddUsername('');
    setAddEmail('');
    setAddSaldo('');
    setAddKebutuhan('');
    setAddKeterangan('');
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setShowAddConfirmation(false);
  };

  const handleAddSave = () => {
    if (!addNama.trim()) {
      alert('Nama harus diisi.');
      return;
    }
    if (!addEmail.trim()) {
      alert('Email harus diisi.');
      return;
    }
    if (!addSaldo || isNaN(addSaldo) || parseInt(addSaldo) < 0) {
      alert('Saldo harus berupa angka positif.');
      return;
    }
    if (!addKebutuhan) {
      alert('Silakan pilih kebutuhan saldo (Tambah atau Kurang).');
      return;
    }
    if (!addKeterangan) {
      alert('Silakan pilih keterangan saldo.');
      return;
    }

    setShowAddConfirmation(true);
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleAddConfirmSave = () => {
    const nominal = parseInt(addSaldo);
    let finalSaldo = nominal;

    // Kebutuhan tambah atau kurang, tapi kalau baru, biasanya tambah
    if (addKebutuhan === 'Kurang') {
      alert('Saldo awal tidak bisa dikurangi.');
      setShowAddConfirmation(false);
      return;
    }

    // Buat id unik sederhana berdasarkan timestamp (bisa diganti)
    const newId = Date.now();

    const newUser = {
      id: newId,
      nama: addNama,
      username: addUsername,
      email: addEmail,
      saldo: finalSaldo,
    };

    setSaldoList([...saldoList, newUser]);
    setShowAddConfirmation(false);
    closeAddModal();
  };

  const filteredList = saldoList.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
      (user.nama?.toLowerCase() || '').includes(searchLower) ||
      (user.email?.toLowerCase() || '').includes(searchLower) ||
      (user.username?.toLowerCase() || '').includes(searchLower)
    );
  });

  return (
    <div className="flex min-h-screen font-sans text-[#3E588F]">
      <Sidebar active="saldo" />

      <main className="flex-1 p-10 bg-white">
        <PageTitle title="Halaman Pengelolaan Admin - Mitra" />

        {/* Search dan tombol tambah */}
        <div className="flex flex-col sm:flex-row justify-between mt-[50px] mb-8 gap-4">
          <div className="flex items-center gap-2 border rounded-full px-8 py-2 w-[302px] ml-[70px]">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Mencari"
              className="outline-none w-full text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-2 border rounded-[30px] mr-[100px] px-6 py-2 text-[#1A3A64] font-medium hover:bg-[#e1e7f5] transition max-w-full sm:max-w-[35%]"
            onClick={openAddModal}
            type="button"
          >
            <FiPlus /> Tambah Saldo
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full max-w-[1020px] min-w-[600px] border-separate ml-[60px] border-spacing-y-2">
            <thead>
              <tr className="bg-[#3E588F] text-white rounded-xl">
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Nama</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Sisa Saldo</th>
                <th className="py-2 px-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((user) => (
                  <tr key={user.id} className="bg-white shadow rounded-xl">
                    <td className="py-3 px-4">{user.username || '-'}</td>
                    <td className="py-3 px-4">{user.nama || '-'}</td>
                    <td className="py-3 px-4">{user.email || '-'}</td>
                    <td className="py-3 px-4">Rp {user.saldo.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-blue-500 font-semibold hover:text-blue-700 flex items-center gap-1"
                      >
                        <FiEdit /> 
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    Tidak ada data saldo ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Edit Saldo */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[30px] p-6 w-[500px] shadow-lg">
              <h2 className="text-xl font-semibold bg-[#3E588F] text-white rounded-[30px] w-[450px] h-[40px] mb-6 p-2">
                Tambah/Kurang saldo {selectedUser.nama}
              </h2>

              <div className="mb-4">
                <label className="block rounded-[30px] text-sm font-medium text-gray-700 mb-0">Nominal Saldo</label>
                <p className="text-[10px] rounded-[30px] text-[#F36614] mb-2">
                  Pastikan nominal saldo dalam bentuk angka dan diinputkan dengan nominal yang sesuai.
                </p>
                <input
                  type="number"
                  className="border border-black rounded-[30px] px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#3E588F] focus:border-transparent"
                  value={editNewSaldo}
                  onChange={(e) => setEditNewSaldo(e.target.value)}
                />
              </div>

              <div className="relative w-full mb-3">
                <label className="block rounded-[30px] mb-0 font-medium">Kebutuhan Saldo</label>
                <p className="text-[10px] text-[#F36614] mb-2">Tentukan apakah saldo akan tambah atau dikurang</p>

                <div
                  onClick={toggleDropdownKebutuhan}
                  className="h-[40px] w-[447px] bg-putih px-2 py-2 border rounded-[30px] cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center justify-between pl-[10px] pr-4 w-full text-[18px] text-gray-400">
                    <div>{editKebutuhan || 'Pilih'}</div>
                    <IoMdArrowDropdown size={20} className="text-gray-500" />
                  </div>
                </div>

                {dropdownOpenKebutuhan && (
                  <div className="absolute top-full mt-1 w-[285px] bg-white border border-gray-300 rounded-[30px] shadow-lg z-50">
                    <div
                      className="cursor-pointer px-4 py-2 hover:bg-[#E3E8F8] rounded-t-[30px]"
                      onClick={() => handleSelectKebutuhan("Tambah")}
                    >
                      Tambah
                    </div>
                    <div
                      className="cursor-pointer px-4 py-2 hover:bg-[#E3E8F8] rounded-b-[30px]"
                      onClick={() => handleSelectKebutuhan("Kurang")}
                    >
                      Kurang
                    </div>
                  </div>
                )}
              </div>

              <div className="relative w-full mb-3">
                <label className="block rounded-[30px] mb-0 font-medium">Keterangan Saldo</label>
                <p className="text-[10px] text-[#F36614] mb-2">Berikan jenis keterangan saldo</p>

                <div
                  className="h-[40px] w-[447px] bg-putih px-6 py-2 border rounded-[30px] cursor-pointer flex items-center justify-between"
                  onClick={toggleDropdownKeterangan}
                >
                  <div className="pl-[-8px] text-[18px] text-gray-400">{keterangan || 'Pilih'}</div>
                  <IoMdArrowDropdown size={20} className="text-gray-500" />
                </div>

                {dropdownOpenKeterangan && (
                  <div className="absolute w-[285px] bg-[#fbfbfc] border border-gray-300 rounded-[20px] shadow-lg">
                    <div
                      className="cursor-pointer px-4 py-1 hover:bg-[#E3E8F8] rounded-t-[20px]"
                      onClick={() => handleSelectKeterangan('Top Up')}
                    >
                      Top Up
                    </div>
                    <div
                      className="cursor-pointer px-4 py-1 hover:bg-[#E3E8F8]"
                      onClick={() => handleSelectKeterangan('Tarik Tunai')}
                    >
                      Tarik Tunai
                    </div>
                    <div
                      className="cursor-pointer px-4 py-1 hover:bg-[#E3E8F8] rounded-b-[20px]"
                      onClick={() => handleSelectKeterangan('Lainnya')}
                    >
                      Lainnya
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-8 mt-6">
                <button
                  className="bg-[#3E588F] text-white px-10 py-2 rounded-[30px] hover:bg-[#8FAADC]"
                  onClick={closeEditModal}
                  type="button"
                >
                  Batal
                </button>
                <button
                  className="bg-[#3E588F] text-white px-8 py-2 rounded-[30px] hover:bg-[#8FAADC]"
                  onClick={() => setShowEditConfirmation(true)}
                  type="button"
                >
                  Simpan
                </button>
              </div>

              {/* Modal Konfirmasi */}
              {showEditConfirmation && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-[#E3E8F8] rounded-[20px] p-8 w-[350px] shadow-lg text-center">
                    <p className="text-[#3E588F] font-medium mb-2">
                      Apakah anda yakin untuk {editKebutuhan.toLowerCase()} saldo pada <span className="font-semibold">{selectedUser.nama}?</span>
                    </p>

                    <p className="text-[#3E588F] text-[30px] text-center font-bold p-12 mt-6 mb-8">
                      Rp {Number(editNewSaldo).toLocaleString('id-ID')}
                    </p>

                    <div className="flex justify-center p-4 gap-8">
                      <button
                        className="bg-white font-bold text-[#3E588F] px-8 py-2 rounded-full shadow-lg hover:bg-[#8FAADC]"
                        onClick={() => setShowEditConfirmation(false)}
                        type="button"
                      >
                        Batal
                      </button>
                      <button
                        className="bg-white font-bold text-[#3E588F] px-8 py-2 rounded-full shadow-lg hover:bg-[#8FAADC]"
                        onClick={handleEditConfirmSave}
                        type="button"
                      >
                        Lanjut
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

       {/* Modal Berhasil */}
       {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#E3E8F8] rounded-[30px] p-2 w-[350px] h-[350px] text-center shadow-lg flex flex-col items-center justify-center gap-2">
              <h3 className="text-[#3E588F] font-semibold text-[30px] mb-1">Berhasil!</h3>
                <p className="text-[15px] ">{successMessage}</p>        
              <div className="text-[#3E588F] mb-4">
                <IoIosCheckmarkCircle size={78} />
              </div>
              
              <button
                className="bg-white font-bold text-[#3E588F] px-8 py-2 rounded-[30px] shadow-lg hover:bg-[#8FAADC]"
                onClick={() => setShowSuccessModal(false)}
              >
                Selesai
              </button>
            </div>
          </div>
        )}

        {/* Modal Gagal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[30px] p-6 w-[350px] h-[320px] text-center shadow-lg flex flex-col items-center justify-center gap-2">
              <div className="text-[#F36614] mb-2">
                <IoIosCloseCircle size={78} />
              </div>
              <h3 className="text-[#3E588F] font-semibold text-[30px] mb-1">Gagal!</h3>
              <p className="text-[15px]">Terjadi kesalahan saat memperbarui saldo. Silakan coba lagi.</p>
              <button
                className="bg-[#3E588F] text-white px-6 py-2 rounded-[30px] shadow-lg hover:bg-[#8FAADC]"
                onClick={() => setShowErrorModal(false)}
              >
                Selesai
              </button>
            </div>
          </div>
        )}

        {/* Modal Tambah Saldo */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[30px] p-6 w-[600px] h-[695px] shadow-lg">
              <h2 className="text-xl font-semibold bg-[#3E588F] text-white rounded-[30px] w-[550px] h-[40px] mb-6 p-2">Tambah Saldo Baru</h2>

              <label className="block mb-2 font-medium">Nama</label>
              <input
                type="text"
                className="border rounded-[30px] px-3 py-2 w-full mb-3"
                value={addNama}
                onChange={handleAddNamaChange}
                placeholder="Masukkan nama"
              />

              <label className="block mb-2 font-medium">Username (otomatis)</label>
              <input
                type="text"
                className="border rounded-[30px] px-3 py-2 w-full mb-3 bg-gray-100"
                value={addUsername}
                readOnly
                placeholder="Username otomatis dibuat"
              />

              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                className="border rounded-[30px] px-3 py-2 w-full mb-3"
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
                placeholder="Masukkan email"
              />

              <label className="block mb-2 font-medium">Saldo</label>
              <input
                type="number"
                className="border rounded-[30px] px-3 py-2 w-full mb-3"
                value={addSaldo}
                onChange={(e) => setAddSaldo(e.target.value)}
                placeholder="Masukkan saldo"
              />

            <div className="relative w-full mb-3">
              <label className="block rounded-[30px] mb-0 font-medium">Kebutuhan Saldo</label>
              <p className="text-[10px] text-[#F36614] mb-2">Tentukan apakah saldo akan tambah atau dikurang</p>

              <div
                onClick={toggleDropdownKebutuhan}
                className="h-[40px] w-[547px] bg-putih px-2 py-2 border rounded-[30px] cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center justify-between pl-[10px] pr-4 w-full text-[18px] text-gray-400">
                  <div>{editKebutuhan || 'Pilih'}</div>
                  <IoMdArrowDropdown size={20} className="text-gray-500" />
                </div>
              </div>

              {dropdownOpenKebutuhan && (
                <div className="absolute top-full mt-1 w-[285px] bg-white border border-gray-300 rounded-[30px] shadow-lg z-50">
                  <div
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-t-[30px]"
                    onClick={() => handleSelectKebutuhan("Tambah")}
                  >
                    Tambah
                  </div>
                  <div
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-b-[30px]"
                    onClick={() => handleSelectKebutuhan("Kurang")}
                  >
                    Kurang
                  </div>
                </div>
              )}
            </div>

            <div className="relative w-full mb-3">
              <label className="block rounded-[30px] mb-0 font-medium">Keterangan Saldo</label>
              <p className="text-[10px] text-[#F36614] mb-2">Berikan jenis keterangan saldo</p>

              <div
                className="h-[40px] w-[547px] bg-putih px-6 py-2 border rounded-[30px] cursor-pointer flex items-center justify-between"
                onClick={toggleDropdownKeterangan}
              >
                <div className="pl-[-8px] text-[18px] text-gray-400">{keterangan || 'Pilih'}</div>
                <IoMdArrowDropdown size={20} className="text-gray-500" />
              </div>

              {dropdownOpenKeterangan && (
                <div className="absolute w-[285px] bg-[#fbfbfc] border border-gray-300 rounded-[20px] shadow-lg">
                  <div
                    className="cursor-pointer px-4 py-1 hover:bg-[#E3E8F8] rounded-t-[20px]"
                    onClick={() => handleSelectKeterangan('Top Up')}
                  >
                    Top Up
                  </div>
                  <div
                    className="cursor-pointer px-4 py-1 hover:bg-[#E3E8F8]"
                    onClick={() => handleSelectKeterangan('Tarik Tunai')}
                  >
                    Tarik Tunai
                  </div>
                  <div
                    className="cursor-pointer px-4 py-1 hover:bg-[#E3E8F8] rounded-b-[20px]"
                    onClick={() => handleSelectKeterangan('Lainnya')}
                  >
                    Lainnya
                  </div>
                </div>
              )}
            </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="text-white bg-[#3E588F] px-10 py-2 rounded-[30px] hover:bg-[#E3E8F8] hover:text-black"
                  onClick={closeAddModal}
                  type="button"
                >
                  Batal
                </button>
                <button
                  className="bg-[#3E588F] text-white px-8 py-2 rounded-[30px] hover:bg-[#E3E8F8] hover:text-black"
                  onClick={handleAddSave}
                  type="button"
                >
                  Simpan
                </button>
              </div>

              {/* Konfirmasi simpan */}
              {showAddConfirmation && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-[#8FAADC] rounded-[30px] p-8 w-[420px] h-[200px] shadow-lg">
                    <p className="mb-8 text-center font-semibold">
                      Apakah Anda yakin ingin menambahkan saldo baru?
                    </p>
                    <div className="flex justify-center gap-8">
                      <button
                        className="px-6 py-2 rounded-[30px] bg-[#3E588F] text-white hover:bg-[#E3E8F8] hover:text-black"
                        onClick={() => setShowAddConfirmation(false)}
                        type="button"
                      >
                        Batal
                      </button>
                      <button
                        className="bg-[#3E588F] text-white px-4 py-2 rounded-[30px] hover:bg-[#E3E8F8] hover:text-black"
                        onClick={handleAddConfirmSave}
                        type="button"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
