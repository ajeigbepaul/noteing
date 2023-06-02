import { connectToDB } from "../../../utils/database";
import Note from "../../../models/note";

export const GET = async (req) => {
  try {
    await connectToDB();
    const notes = await Note.find({}).populate("creator");
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response("could not fetch notes", { status: 500 });
  }
};
