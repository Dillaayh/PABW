'use client';

import React from "react";
import LoginForm from '../../../components/auth/LoginForm';

const LoginPage = () => {
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Untuk menyertakan cookies
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika response tidak ok (status 4xx atau 5xx)
        throw new Error(data.message || 'Login gagal');
      }

      // Login berhasil
      return data;
    } catch (error) {
      // Re-throw error untuk ditangani di LoginForm
      throw error;
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center p-0"
      style={{
        backgroundImage: "url('/images/latar.svg')",
        backgroundSize: '1550px',
      }}
    >
      <div className="bg-[#E3E8F8] p-10 rounded-3xl shadow-lg w-[400px]">
        <h2 className="text-center font-bold text-xl text-black mb-6">
          Masuk ke akun anda!
        </h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;