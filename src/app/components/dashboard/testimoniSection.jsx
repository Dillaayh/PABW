import TestimonialCard from './testimoniCard';
import { testimonialData } from './testimoniData';

export default function TestimonialSection() {
  return (
    <div className="py-16 px-6 text-center p-8 bg-white ">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#203562] mb-10">
        Apa yang pelanggan kami katakan tentang pengalaman mereka?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {testimonialData.slice(0, 4).map((item) => (
          <TestimonialCard
            key={item.id}
            name={item.name}
            maskapai={item.maskapai}
            rute={item.rute}
            ulasan={item.ulasan}
            rating={item.rating}
          />
        ))}
      </div>

    </div>
  );
}
