export default function Benefit() {
    const items = [
      {
        icon: "/images/luggage.svg",
        text: "Pemesanan dilakukan secara online untuk memudahkan pemesanan kapanpun dan dimanapun",
      },
      {
        icon: "/images/map.svg",
        text: "Gebooking menyediakan berbagai macam tujuan penerbangan dan hotel dengan kualitas terbaik",
      },
      {
        icon: "/images/payment.svg",
        text: "Pembayaran aman dan nyaman dengan berbagai metode pembayaran yang memudahkan",
      },
    ];
  
    return (
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#203562] mb-10">
          Apa yang anda dapatkan jika memesan di <span className="text-[#203562]">Gebookin</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-8 flex flex-col items-center text-sm text-gray-700"
            >
              <img src={item.icon} alt="icon" className="w-12 h-12 mb-4" />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  