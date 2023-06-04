import express, { request } from "express";
import { NotesCollectionModel } from "../models/NotesCollection.js";
import { NoteModel } from "../models/Note.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// create new note collection (OK)
router.post("/", async (request, response) => {
  try {
    const { userID, title } = request.body;

    // create a new collection
    const newNoteCollection = new NotesCollectionModel({
      userID: userID,
      collectionTitle: title,
      savedNotes: [],
    });
    await newNoteCollection.save();

    // find the user you want to edit/add the created collection
    const user = await UserModel.findByIdAndUpdate(userID, {
      $push: { noteCollections: newNoteCollection._id },
    });
    //  return an error if user does not exist
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    response.status(200).json({
      status: "success",
      userID: user._id,
      email: user.email,
      createdCollections: newNoteCollection,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

// delete collection 
router.delete("/:collectionID",async (request, response) => {
  try {
    const {collectionID} = request.params
    const collection = await NotesCollectionModel.findById(collectionID)
    if(!collection){
      return response.status(404).json({message:"collection does not exist!"})
    }
    const deleteNote = await NoteModel.deleteMany({ _id: { $in: collection.savedNotes}})
    const deleteCollection = await NotesCollectionModel.findByIdAndDelete(collectionID)
    await UserModel.findOneAndUpdate({}, {$pull: {noteCollections:collectionID}})
  
    response.status(200).json({
      status: "success",
      deletedCollection:deleteCollection,
      deletedNotes: deleteNote.deletedCount
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

// create note (OK)
router.post("/note", async (request, response) => {
  try {
    const { userID, title, collectionID } = request.body;

    const newNote = new NoteModel({
      userID: userID,
      title: title,
      collectionID: collectionID,
    });
    await newNote.save();

    const collection = await NotesCollectionModel.findByIdAndUpdate(
      collectionID,
      {
        $push: { savedNotes: newNote._id },
      }
    );
    if (!collection) {
      return response.status(404).json({ message: "collection not found" });
    }

    response.status(200).json({
      status: "success",
      userID: collection.userID,
      email: collection.email,
      createdNote: newNote,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

// delete note
router.delete("/note/:noteID",async(request,response)=>{
  try {
    const {noteID} = request.params
    const deleteNote = await NoteModel.findByIdAndDelete(noteID)
    if(!deleteNote){
      return response.status(404).json({message:"note does not exist!"})
    }
    response.status(200).json({message:`successfully deleted`, deletedNote:deleteNote})
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
})

export { router as noteRouter };
