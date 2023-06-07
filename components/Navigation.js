'use client';
import Image from "next/image"
import {FaUser} from 'react-icons/fa'
import {AiOutlineLogout} from 'react-icons/ai'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import Link from "next/link";
const Navigation = () => {
    const {data:session} = useSession()
    const [providers, setProviders] = useState(null)
    useEffect(()=>{
     const setProvider = async()=>{
        const response = await getProviders();
        setProviders(response)
       
     }
      setProvider();
    },[])
  return (
    <nav className="w-full p-4 bg-[#E6E6FA] flex items-center justify-between">
      <Link href="/">
        <Image src="/notemelogo.png" width={45} height={20} alt="logo" />
      </Link>
      <div>Note-ing</div>
      {session?.user ? (
        <div className="flex items-center cursor-pointer space-x-2 ">
          {session?.user?.image ? (
            <div className="rounded-full border border-pink-400 w-7 h-7 flex items-center">
              <Image
                src={session?.user.image}
                width={24}
                height={24}
                className="rounded-3xl w-7 h-7 object-cover"
                alt="profileimage"
              />
            </div>
          ) : (
            <span>{session?.user?.email}</span>
          )}

          <div
            onClick={signOut}
            className="flex items-center px-2 py-2 space-x-1 rounded-xl bg-white hover:bg-fuchsia-400 hover:text-white transition-all"
          >
            <AiOutlineLogout size={24} height={24} />
            <span>LogOut</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center cursor-pointer space-x-1">
          <FaUser />
          <span
            className="text-sm px-2 bg-white rounded-md py-2"
            onClick={() => signIn()}
          >
            Credentials
          </span>
          <span
            className="text-sm px-2 bg-white rounded-md py-2"
            onClick={() => signIn("google")}
          >
            Google
          </span>
          {/* {providers &&
            Object.values(providers).map((provider) => (
              <span
                key={provider.name}
                className="text-sm px-2 bg-white rounded-md py-2"
                onClick={() => signIn(provider.id)}
              >
                {provider?.name}
              </span>
            ))} */}
        </div>
      )}
    </nav>
  );
}

export default Navigation