import { connectToDB } from "../../../../utils/database";
import Note from "../../../../models/note";
export const POST = async (req, res) => {
  const { userId, input } = await req.json();

  try {
    connectToDB();
    const newNote = new Note({
      creator: userId,
      note: input,
    });
    await newNote.save();
    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new note", { status: 500 });
  }
};
