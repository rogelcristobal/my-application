import express from "express";
import { NotesCollectionModel } from "../models/NotesCollection.js";
import { UserModel } from "../models/Users.js";
import { NoteModel } from "../models/Note.js";

const router = express.Router();

// create new note collection
router.post("/", async (request, response) => {
  try {
    const { collectionTitle, userID } = request.body;

    const newNoteCollection = new NotesCollectionModel({
      collectionTitle: collectionTitle,
      userID: userID,
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
// add note
router.post("/notes", async(request,response)=>{
  try {
    const {collectionID,title,userID}= request.body

    // create a new note first
    const newNote = new NoteModel({
      collectionID:collectionID,title:title,userID:userID
    })
    await newNote.save()
    
    // then find the collection you want to edit
    const newNoteCollection = await NotesCollectionModel.findById("64759d2cfedbde8127e21304")
    if (!newNoteCollection) {
      return response.status(404).json({ error: 'NotesCollection not found' });
    }

    //then savedNotes will contain the objectID of the note
    newNoteCollection.savedNotes.push(newNote._id)
    await newNoteCollection.save()
    
    response.json(newNoteCollection)
  } catch (error) {
    
  }
})






export { router as noteRouter };
