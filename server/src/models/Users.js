import mongoose from "mongoose";


// this structures how the data would looked like in the users table
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    noteCollections:[{type: mongoose.Schema.Types.ObjectId, ref: "note-collection"}]
})

// users -> noteCollection


export const UserModel = mongoose.model("users", UserSchema)