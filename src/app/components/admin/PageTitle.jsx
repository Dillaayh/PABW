export default function PageTitle({ title, width = 'w-[1100px] h-[50px]', align = 'ml-[25px]' }) {
  return (
    <h2
      className={`text-xl text-center font-semibold mb-4 bg-[#8FAADC] px-4 py-2 rounded-[15px] text-black cursor-default ${width} ${align}`}
    >
      {title}
    </h2>
  );
}
