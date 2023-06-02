import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    note:{
        type: String,
        required:[true, 'note is required']
    }
})

const Note = models.Note || model("Note", NoteSchema);

export default Note;