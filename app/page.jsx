"use client";
import { useState, useEffect } from "react";
import { BsSendCheck } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from "next-auth/react";
import NoteFeed from "../components/NoteFeed";
export default function Home() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const override = {
    display: "block",
    margin: "0 auto",
  };
  const [notes, setNotes] = useState([]);
  const [initialUi, setInitialUi] = useState([]);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/note/new", {
        method: "POST",
        body: JSON.stringify({
          input: input,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        // Change this to hot toast.
        console.log("note created!!!");
        fetchNotes()
        setInput("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const fetchNotes = async () => {
    const response = await fetch("/api/note");
    const data = await response.json();
    setNotes(data);
  };
  useEffect(() => {
    
    fetchNotes();
  }, []);
  return (
    <main className="h-screen py-4 bg-gradient-to-br from-[#E6E6FA] to bg-white flex flex-col overflow-x-hidden">
      {notes.length === 0 && <span className="px-10">No Note in the database</span>}
      <div className="w-full overflow-x-scroll scrollbar-track-gray-400/20 scrollbar-thumb-[#FF00FF]/80 scrollbar-thin h-screen snap-x snap-mandatory bg-white max-h-[350px] flex space-x-2">
        {notes.map((note) =>
          notes.length > 0 ? (
            <NoteFeed
              key={note._id}
              note={note}
              setNotes={setNotes}
              notes={notes}
            />
          ) : (
            <span className="bg-red-400">
              {notes.length === 0 && "No Note in the database"}
            </span>
          )
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
