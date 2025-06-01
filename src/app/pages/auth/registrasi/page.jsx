// pages/registrasi.jsx
'use client';

import React from "react";
import RegisterForm from '../../../components/auth/RegisterForm';

export default function RegistrasiPage() {
  const handleRegister = async data => {
    console.log('Register data:', data);
    // TODO: Kirim ke backend
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
