export default function PageTitle({ title, width = 'w-[1100px] h-[50px]', align = 'ml-[25px]' }) {
  return (
    <h2
      className={`text-xl font-semibold text-white  mb-6 px-4 py-2 rounded-[30px] bg-[#3E588F] cursor-default ${width} ${align}`}
    >
      {title}
    </h2>
  );
}
