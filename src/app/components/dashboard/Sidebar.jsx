import { FaUser } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#3E588F]  text-white flex flex-col p-6">
      <div className="flex items-center gap-3 text-3xl font-bold mb-8">
        <img
          src="/images/logo.svg"
          alt="Plane and Hotel Icon"
          className="w-12 h-12"
        />
        Gebookin
      </div>
      
      <div className="flex flex-col items-center mb-4">
        <FaUser className="mb-2 text-[90px] text-white" /> 
        <span className="text-[25px] text-white mb-8">Swiss-Bellin Hotel</span> 
      </div>

      <nav className="flex flex-col gap-8 text-sm">
        <div className="hover:underline cursor-pointer">Melihat Status</div>
        <div className="hover:underline cursor-pointer">Melihat Ketersediaan Publikasi</div>
      </nav>
    </aside>
  );
}
