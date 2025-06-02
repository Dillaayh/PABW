'use client';

import React from "react";
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegistrasiPage() {
  const handleRegister = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: data.name,
          email: data.email,
          password: data.password,
          no_tlp: data.nomorTelepon
        })
      });

      const result = await response.json();

      if (!response.ok) {
        // Jika response tidak ok (status 4xx atau 5xx)
        throw new Error(result.message || 'Registrasi gagal');
      }

      // Registrasi berhasil
      return result;
    } catch (error) {
      // Re-throw error untuk ditangani di RegisterForm
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
      <div className="min-h-screen flex text-black items-center justify-center p-8">
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
}