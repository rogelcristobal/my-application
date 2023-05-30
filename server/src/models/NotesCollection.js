import mongoose from "mongoose";

const NotesCollectionSchema = new mongoose.Schema({
    collectionTitle:{type:String,required:true},
    userID:{type: mongoose.Schema.Types.ObjectId, ref:"users", required:true}
})


export const NotesCollectionModel = mongoose.model("note-collections", NotesCollectionSchema)