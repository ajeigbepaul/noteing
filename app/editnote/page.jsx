"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

function page() {
  const [note, setNote] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const noteId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const override = {
    display: "block",
    margin: "0 auto",
  };
// fetch specific note.
  useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`/api/note/${noteId}`);
      const data = await response.json();
      setNote(data);
    };
    if (noteId) fetchNote();
  }, [noteId]);
  console.log(note?.note);
  const handleEdit = (e) => {
    setNote(e.target.value);
  };
  const handleUpdate = async(e)=>{
  e.preventDefault();
  setSubmitting(true)
  if(!noteId) return alert('note id not found')
  try {
    const response = await fetch(`/api/note/${noteId}`,{
        method: "PATCH",
        body: JSON.stringify({
            note:note
        })
    });
    if(response.ok){
        console.log("note Updated")
        router.push('/')
    }
    
  } catch (error) {
    console.log(error)
  }finally{
    setSubmitting(false)
  }
  }
  return (
    <div className="h-screen w-3/4 mx-auto flex items-center justify-center">
      <form className="px-4 flex flex-col">
        <textarea
          cols={40}
          rows={5}
          value={note?.note}
          className="px-3"
          onChange={handleEdit}
        />
        <button
          className="w-full bg-fuchsia-400 rounded-md mt-3 py-2 text-white sm:w-[340px] hover:bg-fuchsia-300"
          onClick={handleUpdate}
        >
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
           'Update Note'
          )}
        </button>
      </form>
    </div>
  );
}

export default page;
