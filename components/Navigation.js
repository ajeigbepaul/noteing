import Image from "next/image"
import {FaUser} from 'react-icons/fa'
const Navigation = () => {
  return (
    <div className="w-full p-4 bg-purple-300 flex items-center justify-between">
      <Image src="/vercel.svg" width={45} height={20} />
      <div>Note-ing</div>
      <div className="flex items-center cursor-pointer space-x-1 ">
        <FaUser />
        <span className="text-sm px-1 bg-white rounded-md">
          Ajeigbe@...com
        </span>
      </div>
    </div>
  );
}

export default Navigation