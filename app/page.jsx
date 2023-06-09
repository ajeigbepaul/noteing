"use client";
import { useState, useEffect } from "react";
import { BsSendCheck } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from "next-auth/react";
import NoteFeed from "../components/NoteFeed";
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation";
export default function Home() {
  const { data: session } = useSession();
  const id = session?.user?.id
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter()
  const override = {
    display: "block",
    margin: "0 auto",
  };
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(input)
    if (!session?.user) {
      toast.error('You need to login to keep your written note')
      router.push('/login')
      // setSubmitting(false)
    }else{

      try {
        const response = await fetch("/api/note/new", {
          method: "POST",
          body: JSON.stringify({
            input: input,
            userId: session?.user.id,
          }),
        });
        if (response.ok) {
          toast.success('note created!!')
          fetchNotes()
          setInput("");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };
  const fetchNotes = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/note/usernote/${id}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log(error)
    }finally{
      setSubmitting(false)
    }
    
  };
  useEffect(() => {
    
    fetchNotes();
  }, [id]);
  return (
    <main className="h-screen py-4 bg-gradient-to-br from-[#E6E6FA] to bg-white flex flex-col overflow-x-hidden">
      {submitting && <span className="px-10">Note loading...</span>}
      <div className="w-full overflow-x-scroll scrollbar-track-gray-400/20 scrollbar-thumb-[#FF00FF]/80 scrollbar-thin h-screen snap-x snap-mandatory bg-white max-h-[350px] flex space-x-2">
        {notes.map((note) =>
            <NoteFeed
              key={note._id}
              note={note}
              setNotes={setNotes}
              notes={notes}
            />
          
            // <span className="bg-red-400">
            //   {notes.length === 0 && "No Note in the database"}
            // </span>
          
        )}
      </div>
      <div className="w-full max-w-3xl mx-auto bg-fuchsia-500 shadow-lg flex items-center rounded-lg mt-4">
        <form className="w-full rounded-md">
          <input
            onChange={handleChange}
            placeholder="write your note"
            className="border border-slate-400 focus:border-fuchsia-400 focus:text-fuchsia-400 text-white text-md px-4 py-3 w-full outline-0 "
          />
        </form>
        <span className="px-3 py-2 cursor-pointer" onClick={handleNote}>
          {submitting ? (
            <ClipLoader
              color=""
              loading={submitting}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <BsSendCheck size={24} color="white" />
          )}
        </span>
      </div>
    </main>
  );
}
