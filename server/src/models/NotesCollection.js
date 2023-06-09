import mongoose from "mongoose";

const schemaType = mongoose.Schema.Types
const NotesCollectionSchema = new mongoose.Schema({
    collectionTitle:{type:String,required:true,text:true},
    description:{type:String,text:true},
    userID:{type:schemaType.ObjectId , ref:"users", required:true},
    savedNotes:[{type:schemaType.ObjectId, ref: "saved-notes",required:true}],
})

// user -> noteCollection -> saved-notes

export const NotesCollectionModel = mongoose.model("note-collections", NotesCollectionSchema)