import Image from "next/image";
import {BsSendCheck} from 'react-icons/bs'
export default function Home() {
  return (
    <main className="h-screen p-4 bg-gradient-to-br from-fuchsia-200 to bg-white flex flex-col">
      <div className="w-full h-screen bg-white max-h-[350px]">Hello</div>
      <div className="w-full max-w-3xl mx-auto bg-fuchsia-500 shadow-lg flex items-center rounded-lg mt-4">
        <form className="w-full rounded-md">
          <input
            placeholder="write your note"
            className="border border-slate-400 focus:border-fuchsia-400 focus:text-fuchsia-400 text-white text-md px-4 py-3 w-full outline-0 "
          />
        </form>
        <span className="px-3 py-2 cursor-pointer"><BsSendCheck size={24} color="white"/></span>
      </div>
    </main>
  );
}
