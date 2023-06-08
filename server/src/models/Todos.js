import mongoose from "mongoose";

const schemaType = mongoose.Schema.Types
const  TodoSchema = new mongoose.Schema({
    collectionID:{type:schemaType.ObjectId,ref:"todo-collections", required:true},
    title:{type:schemaType.String, required:true, text:true},
    description:{type:schemaType.String,text:true},
    // createdAt:{type:schemaType.Date,required:true},
    status:{type:schemaType.Boolean, require:true}
})

export const TodoModel = mongoose.Schema("todos", TodoSchema)