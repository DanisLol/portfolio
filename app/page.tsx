import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-stone-200 flex justify-center items-center">
      <div className="flex flex-col">
        <button className="w-24 h-12 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
          Button
        </button>
      </div>
    </div>
  );
}
