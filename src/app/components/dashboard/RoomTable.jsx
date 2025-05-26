import { FaUser, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

export default function RoomTable({ options }) {
  return (
    <div className="flex-1 ">
      <table className="w-full border border-black rounded-[30px] text-sm">
        <thead className="bg-blue-800 rounded-[30px] text-white">
          <tr>
            <th className="p-2 text-left">Pilihan Ruangan</th>
            <th className="p-2 text-center">Kapasitas</th>
            <th className="p-2 text-right">Harga</th>
            <th className="p-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option) => (
            <tr key={option.id} className="border-b">
              <td className="p-2">{option.type}</td>
                <td className="p-2 text-center">
                  <FaUser className="inline mr-1" /> 
                  <FaUser className="inline mr-1" />{option.capacity}
                </td>
                
                
                <td className="p-2 text-right text-red-500">
                  Rp {option.price.toLocaleString('id-ID')}
                </td>
              
              <td className="p-2 text-center space-x-2">
                <button className="text-green-600 hover:text-green-800"><FaPlus /></button>
                <button className="text-yellow-600 hover:text-yellow-800"><FaMinus /></button>
                <button className="text-red-600 hover:text-red-800"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
