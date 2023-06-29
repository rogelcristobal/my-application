import mongoose from "mongoose";
import {DateTime} from 'luxon'

const NoteSchema= new mongoose.Schema({
    title:{type:String,required:true,text:true},
    userID:{type: mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    content:{type:mongoose.Schema.Types.String},
    collectionID:{type: mongoose.Schema.Types.ObjectId, ref:"note-collections", required: true},
    createdAt:{type:mongoose.Schema.Types.Date,  default: DateTime.local().setZone('Asia/Manila').toJSDate()}  
})


export const NoteModel = mongoose.model("saved-notes", NoteSchema)