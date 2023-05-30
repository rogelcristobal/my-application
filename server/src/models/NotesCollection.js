import mongoose from "mongoose";

const NotesCollectionSchema = new mongoose.Schema({
    collectionTitle:{type:String,required:true},
    userID:{type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    savedNotes:[{type:mongoose.Schema.Types.ObjectId, ref: "saved-notes"}],
})

// user -> noteCollection -> saved-notes

export const NotesCollectionModel = mongoose.model("note-collections", NotesCollectionSchema)