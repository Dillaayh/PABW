'use client';
import React, { useState } from "react"; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2'; 

const Registrasi = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Form Kosong',
                text: 'Harap isi email dan password Anda',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const response = await fetch(``, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message || 'Terjadi kesalahan. Silakan coba lagi.';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                    confirmButtonText: 'OK',
                });
                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Registrasi Berhasil',
                text: 'Akun Anda berhasil didaftarkan! Silahkan cek email Anda untuk verifikasi.',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Kesalahan',
                text: err.message || 'Terjadi kesalahan pada sistem.',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="flex h-screen w-screen">
            {/* Gambar */}
            <div className="w-[140px] h-screen flex items-center justify-center ml-auto">
                <img 
                    src="/images/Registrasi.png" 
                    alt="regis illustration" 
                    className="w-full max-w-md object-contain"
                />
            </div>

            {/* Form Login */}
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-[458px] bg-[#E3E8F8] p-8 rounded-[30px] flex items-center justify-center">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center text-black">Masuk ke akun anda!</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                            {/* Email */}
                            <div className="w-full">
                                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Isi email anda"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-10 px-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            {/* Password */}
                            <div className="w-full relative">
                                <label htmlFor="password" className="block text-sm font-medium text-black mb-1">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Isi password anda"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-10 px-4 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                                />
                                <div
                                    className="absolute top-9 right-4 cursor-pointer text-gray-600"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>

                            {/* Lupa Password */}
                            <div className="w-full text-right">
                                <Link href="#" className="text-sm text-black hover:underline">
                                    Lupa Password?
                                </Link>
                            </div>

                            {/* Tombol Masuk */}
                            <button
                                type="submit"
                                className="bg-blue-700 text-white w-[100px] h-[40px] rounded-full hover:bg-blue-800 transition duration-200"
                            >
                                Masuk
                            </button>
                        </form>

                        {showPopup && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-bold">Akun Anda Berhasil Didaftarkan!</h3>
                                    <p className="mt-2">Silahkan cek email Anda untuk melakukan verifikasi.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registrasi;