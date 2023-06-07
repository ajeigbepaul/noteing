import { useRouter } from "next/navigation";
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function NoteFeed({ note, setNotes,notes }) {
  const router = useRouter();
  // console.log(notes);
  const handleDelete = async(note) => {
    const hasConfirmed = confirm("Are you sure you want to delete this note?")
    if(hasConfirmed){
        try {
            await fetch(`/api/note/${note._id.toString()}`,{
                method: 'DELETE',
            });
            const fitleredNotes = notes.filter((n)=>n._id !== note._id)
            setNotes(fitleredNotes)
        } catch (error) {
            console.log(error)
        }
    }
  };

  const handleEdit = (note) => {
    console.log(note)
    router.push(`/editnote?id=${note._id}`);
  };
  return (
    <div className="flex relative flex-col rounded-lg space-y-4 flex-shrink-0 items-center justify-center w-[250px] md:w-[300px] snap-center bg-fuchsia-500 hover:opacity-100 opacity-60 cursor-pointer transition-opacity duration-200 overflow-hidden py-3 text-white px-4">
          <div className="absolute px-2 py-2 border border-fuchsia-300 rounded-sm shadow-md right-3 flex space-x-2 top-0">
            <FaTrash
              className="text-sm text-orange-300"
              onClick={() => handleDelete(note)}
            />
            <FaEdit
              className="text-sm text-white"
              onClick={() => handleEdit(note)}
            />
          </div>
          {note.note}
      
    </div>
  );
}

export default NoteFeed;
