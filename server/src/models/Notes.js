import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    collectionTitle:{type:String,required:true},
    userID:{type: mongoose.Schema.Types.ObjectId, ref:"users", required:true}
})


export const NotesModel = mongoose.model("note-collections", NotesSchema)