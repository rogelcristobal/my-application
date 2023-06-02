import mongoose from "mongoose";


const NoteSchema= new mongoose.Schema({
    title:{type:String,required:true},
    userID:{type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    collectionID:{type: mongoose.Schema.Types.ObjectId, ref:"note-collections", required: true}
})


export const NoteModel = mongoose.model("saved-notes", NoteSchema)