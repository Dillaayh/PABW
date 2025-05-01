'use client';

import { FaMoneyBillWave } from 'react-icons/fa6';
import SidebarProfile from '@/app/components/sidebarProfile/sidebar';

export default function SaldoPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#EAF0FF] p-4 lg:p-8 text-black">
      {/* Sidebar */}
      <SidebarProfile />

      {/* Main Content */}
      <div className="w-full lg:flex-1 bg-white rounded-2xl shadow-md p-6 lg:p-8 lg:ml-8">
        <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">Saldo Saya</h2>
        <div className="bg-[#B3C2E8] rounded-2xl p-6  flex justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow">
            <FaMoneyBillWave className="text-3xl text-black mb-4" />
            <p className="text-sm text-black font-medium">Saldo</p>
            <p className="text-lg text-black font-semibold">Rp. 50.000.000,00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
