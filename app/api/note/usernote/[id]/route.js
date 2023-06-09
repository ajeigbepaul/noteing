
import { connectToDB } from "../../../../../utils/database";
import Note from "../../../../../models/note";

// GET
// @read the data for a particular user
export const GET = async (req, { params }) => {
  console.log(params.id);
  try {
    await connectToDB();
    const notes = await Note.find({ creator: params.id }).populate("creator");
    if (notes.length === 0) {
      return new Response("No notes found for the user", { status: 404 });
    }
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response("Could not fetch notes", { status: 500 });
  }
};
