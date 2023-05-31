import express from "express";
import { NotesCollectionModel } from "../models/NotesCollection.js";
import { UserModel } from "../models/Users.js";
import { NoteModel } from "../models/Note.js";
import mongoose from "mongoose";

const router = express.Router();

// create new note collection (OK)
router.post("/", async (request, response) => {
  try {
    const { collectionTitle, uid } = request.body;

    const newNoteCollection = new NotesCollectionModel({
      collectionTitle: collectionTitle,
      uid: uid,
      savedNotes: [],
    });
    await newNoteCollection.save();

    response.json({ message: "data added!" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An error occurred" });
  }
});
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
// create note 
router.post("/add-note", async(request,response)=>{
  try {
    const {collectionID,uid,title}= request.body

    // create a new note first
    const newNote = new NoteModel({
      collectionID:collectionID,title:title,uid:uid
    })
    await newNote.save()
    
    // then find the collection you want to edit/add the created note 
    const newNoteCollection = await NotesCollectionModel.findById(collectionID)
    if (!newNoteCollection) {
      return response.status(404).json({ error: 'NotesCollection not found' });
    }

    //then savedNotes will contain the objectID of the note
    newNoteCollection.savedNotes.push(newNote._id)
    await newNoteCollection.save()
    
    response.status(200).json({status:"success", data:newNoteCollection})
  } catch (error) {
    
  }
})






export { router as noteRouter };
