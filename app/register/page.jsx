'use client'
import {useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
   const override = {
     display: "block",
     margin: "0 auto",
   };
  const [isLoading, setIsLoading] = useState(false)
   const handleSubmit = async(e) => {
    e.preventDefault();
     setIsLoading(true)
     console.log(email + password + username)
    //  e.preventDefault();
     try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password:password
        }),
      });
      if (response.ok) {
        console.log("user created!!!");
        setEmail(""), setPassword(""), setUsername("");
      }
    
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
   };
  return (
    <section className="w-full h-screen flex items-center flex-col space-y-5">
      <span className="mt-20 font-semibold text-xl">Register</span>
      {/* <div className="w-full max-w-md mx-auto flex items-center justify-center bg-fuchsia-400 h-[300px] px-2"> */}
      <form
        className="w-full flex flex-col space-y-2 max-w-md mx-auto items-center justify-center bg-fuchsia-400 h-[300px] px-2 "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="firstname"
          className="py-2 px-2 w-full"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          className="py-2 px-2 w-full"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="py-2 px-2 w-full"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-md px-2 bg-fuchsia-300 text-white py-2"
        >
          {isLoading ? (
            <ClipLoader
              color=""
              loading={isLoading}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Register"
          )}
        </button>
      </form>
      {/* </div> */}
    </section>
  );
}

export default Register