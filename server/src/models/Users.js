import mongoose from "mongoose";


// this structures how the data would looked like in the users table
const schemaType = mongoose.Schema.Types
const UserSchema = new mongoose.Schema({
    uid:{type: schemaType.String,required:true,unqique:true},
    email:{type:schemaType.String,required:true},
    firstName:{type:schemaType.String,required:true},
    lastName:{type:schemaType.String,required:true},
    noteCollections:[{type: schemaType.ObjectId, ref: "note-collection", required:true}],
    todoCollections:[{type:schemaType.ObjectId, ref: "todos", required:true}]
})

// users -> noteCollection


export const UserModel = mongoose.model("users", UserSchema)