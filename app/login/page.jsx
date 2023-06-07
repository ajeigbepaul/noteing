'use client'

import { useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
const Login = () => {
  const email = useRef(null)
  const password = useRef(null)
  const handleSubmit = async(e) =>{
  e.preventDefault()
  try {
    const data = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl:'/'
    });
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div className="w-full h-screen flex flex-col items-center space-y-4">
      <span className="mt-20 font-semibold text-xl">Login</span>
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center bg-fuchsia-400 h-[300px] px-2">
        <form className="w-full flex flex-col space-y-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            className="py-2 px-2"
            required
            onChange={(e) => (email.current = e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="py-2 px-2"
            required
            onChange={(e) => (password.current = e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-md px-2 bg-fuchsia-300 text-white py-2"
          >
            Login
          </button>
        </form>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login