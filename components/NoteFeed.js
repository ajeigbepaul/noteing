import React from 'react'
import {FaTrash, FaEdit} from 'react-icons/fa'
function NoteFeed({note}) {
    console.log(note)
  return (
    <div className="flex relative flex-col rounded-lg space-y-4 flex-shrink-0 items-center justify-center w-[250px] md:w-[300px] snap-center bg-[#818a6b] hover:opacity-100 opacity-60 cursor-pointer transition-opacity duration-200 overflow-hidden py-3 text-yellow-50 px-4">
      <div className="absolute px-2 py-2 border border-fuchsia-300 rounded-sm shadow-md right-3 flex space-x-2 top-0">
        <FaTrash className="text-sm text-fuchsia-700" />
        <FaEdit className="text-sm text-white" />
      </div>
      {note.note}
    </div>
  );
}

export default NoteFeed