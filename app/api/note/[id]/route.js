import { connectToDB } from "../../../../utils/database";
import Note from "../../../../models/note";
// GET
// @read the data
export const GET = async (req,{params}) => {
  try {
    await connectToDB();
    const note = await Note.findById(params.id).populate("creator");
    if(!note) return new Response("note not found", { status: 404 });
    return new Response(JSON.stringify(note), { status: 200 });
  } catch (error) {
    return new Response("could not fetch notes", { status: 500 });
  }
};


// PATCH
// @update
export const PATCH = async (req, {params})=>{
    const {note} = await req.json()
    try {
      await connectToDB();
      const existingNote = await Note.findById(params.id);
      if(!existingNote) return new Response('Note not found', {status:404})
      existingNote.note = note;
      await existingNote.save();
      return new Response(JSON.stringify(existingNote), { status: 200 });

    } catch (error) {
    return new Response("could not Update notes", { status: 500 });

    }
}

// GET
// @delete
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Note.findByIdAndRemove(params.id)
    return new Response("Note deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("could not Delete notes", { status: 500 });
  }
};
