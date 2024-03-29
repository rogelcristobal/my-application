import mongoose from "mongoose";


// this structures how the data would looked like in the users table
const schemaType = mongoose.Schema.Types
const UserSchema = new mongoose.Schema({
    uid:{type: schemaType.String,required:true,unqique:true},
    email:{type:schemaType.String,required:true},
    firstName:{type:schemaType.String,required:true},
    lastName:{type:schemaType.String,required:true},
    // createdAt:{type:schemaType.Date,required:true},
    // lastLoginTime:{type:schemaType.Date,required:true},
    // provider:{type:schemaType.String,required:true},
    // emailVerified:{type:schemaType.Boolean,required:true},
    noteCollections:[{type: schemaType.ObjectId, ref: "note-collections", required:true}],
    todoCollections:[{type:schemaType.ObjectId, ref: "todo-collections", required:true}]
})

// users -> noteCollection


export const UserModel = mongoose.model("users", UserSchema)