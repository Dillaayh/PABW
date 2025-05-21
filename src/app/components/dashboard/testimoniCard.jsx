export default function TestimonialCard({ name, maskapai, rute, ulasan, rating }) {
    return (
      <div className="border border-blue-200 rounded-xl p-4 shadow-sm w-full max-w-md">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-[#203562]">{name}</h3>
          <p className="text-sm text-[#203562] font-semibold">{rating} ★</p>
        </div>
        <p className="text-sm text-[#203562] font-bold mt-1">{maskapai}</p>
        <p className="text-sm text-gray-500">{rute}</p>
        <p className="text-sm text-[#203562] mt-3">{ulasan}</p>
      </div>
    );
  }
  