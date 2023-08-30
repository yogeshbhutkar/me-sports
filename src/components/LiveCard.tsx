export default function LiveCard(props: {
  name: string;
  location: string;
  sportName: string;
}) {
  return (
    <div className="inline-block px-3">
      <div className="w-64 h-36 border-1 border-gray-700 border max-w-xs overflow-hidden rounded-lg shadow-md bg-[#000000] hover:shadow-xl transition-shadow duration-300 ease-in-out"></div>
    </div>
  );
}
