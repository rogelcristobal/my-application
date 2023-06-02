import express from "express";
import { NotesCollectionModel } from "../models/NotesCollection.js";
import { NoteModel } from "../models/Note.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// create new note collection (OK)
router.post("/", async(request,response)=>{
  try {
    const {userID,title}= request.body

    // find the user you want to edit/add the created collection 
    const user = await UserModel.findById(userID)
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }
    // create a new collection 
    const newNoteCollection = new NotesCollectionModel({
      userID:userID,collectionTitle:title,savedNotes:[]
    })
    await newNoteCollection.save()
    

    //then savedNotes will contain the objectID of the note
    user.noteCollections.push(newNoteCollection._id)
    await user.save()
    
    response.status(200).json({status:"success",userID:user._id,email:user.email, collection:user.noteCollections})
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
})

// create note 
router.post("/create-note", async(request,response)=>{
   try {
    const {userID,title,collectionTitle}= request.body

    // find the user you want to edit/add the created collection 
    const user = await UserModel.findById(userID)
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }
    // create a new collection 
    const newNoteCollection = new NotesCollectionModel({
      userID:userID,collectionTitle:title,savedNotes:[]
    })
    await newNoteCollection.save()
    

    //then savedNotes will contain the objectID of the note
    user.noteCollections.push(newNoteCollection._id)
    await user.save()
    
    response.status(200).json({status:"success",userID:user._id,email:user.email, collection:user.noteCollections})
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
})



// getting user note collection
router.get("/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const notesCollection = await NotesCollectionModel.find({ userID: userId });
    response.status(200).json({ status: "success", data: notesCollection });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});






export { router as noteRouter };
