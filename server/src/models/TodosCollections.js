import mongoose from "mongoose";


const schemaType = mongoose.Schema.Types
const todoCollectionSchema = new mongoose.Schema({
    userID:{type:schemaType.ObjectId, ref:"users", required:true}, //params
    collectionTitle:{type:schemaType.String,text:true,required:true}, 
    todos:[{type:schemaType.ObjectId,ref:"todos",required:true}]
})

export const TodoCollectionModel = mongoose.model('todo-collections',todoCollectionSchema)