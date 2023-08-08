import express from "express";
import { NotesCollectionModel } from "../models/NotesCollection.js";
import { NoteModel } from "../models/Note.js";
import { UserModel } from "../models/Users.js";
import { io } from "../index.js";
import { DateTime } from "luxon";
//extract userID from headers
const extractUserID = (req, res, next) => {
  // this is how to get the header req.userID or request.userID based on your param
  req.userID = req.header("userID");
  next();
};

// collections/
const noteRouter = express.Router();
// get all collections (OK)
noteRouter.get("/", extractUserID, async (request, response) => {
  try {
    const userID = request.userID;
    const user = await UserModel.findById(userID)
      .populate("noteCollections") // populate the collection
      .populate({
        // populates the nested data within userModel
        path: "noteCollections",
        populate: {
          path: "savedNotes",
        },
      });
    if (!user) {
      return response
        .status(404)
        .json({ message: "user not found or does not exist!" });
    }
    // const noteCollections = await NotesCollectionModel.find({
    //   _id: {$in: user.noteCollections}
    // })
    response
      .status(200)
      .json({ message: "success", data: user.noteCollections });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

// create new collection (OK)
noteRouter.post("/", extractUserID, async (request, response) => {
  try {
    const { title, description } = request.body;
    const userID = request.userID;

    // create a new collection
    const newNoteCollection = new NotesCollectionModel({
      userID: userID,
      collectionTitle: title,
      description: description,
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
    // const userCollectionCount = await NotesCollectionModel.find({
    //   _id: {$in: }
    // })

    io.emit("addNoteCollection", newNoteCollection);

    response.status(200).json({
      status: "success",
      userID: user._id,
      email: user.email,
      createdCollection: newNoteCollection
     
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});
// delete collection (OK)
noteRouter.delete("/:collectionID", async (request, response) => {
  try {
    const { collectionID } = request.params;
    const collection = await NotesCollectionModel.findById(collectionID);

    // find the collection
    if (!collection) {
      return response.status(400).json({ message: "collection not found!" });
    }

    // removes the notes inside the collection
    const deleteNotes = await NoteModel.deleteMany({
      _id: { $in: collection.savedNotes },
    });

    //remove the collection instance in all users updateMany({filter},{action})
    await UserModel.updateMany(
      { noteCollections: collectionID },
      { $pull: { noteCollections: collectionID } }
    );

    //finally deletes the collection
    const deleteCollection = await NotesCollectionModel.findByIdAndDelete(
      collectionID
    );

    io.emit("deleteNoteCollection", deleteCollection);

    response.status(200).json({
      status: "success",
      deletedCollection: deleteCollection,
      deletedNotes: deleteNotes.deletedCount,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

// get notes (OK)
noteRouter.get("/:collectionID", extractUserID, async (request, response) => {
  try {
    const userID = request.userID;
    const {collectionID} = request.params
     const user = await UserModel.findById(userID).populate({
        // populates the nested data within userModel
        path: "noteCollections",
        populate: {
          path: "savedNotes",
        },
      });
     if(!user){
        return response.status(404).json({message:"user does not exist"})
     }
     const collections = await NoteModel.find({collectionID:collectionID })

     response.status(200).json({
      status:"success",data:collections
     })
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

// create note (OK)
noteRouter.post("/:collectionID", extractUserID, async (request, response) => {
  try {
    const { title, content } = request.body;
    const { collectionID } = request.params;
    const userID = request.userID;

    const createdAt = DateTime.local().setZone("Asia/Manila").toJSDate();
    // use in the front-end
    // const formattedTime = DateTime.fromJSDate(createdAt).setZone('Asia/Manila').toFormat('yyyy-MM-dd hh:mm:ss a')

    const newNote = new NoteModel({
      userID: userID,
      title: title,
      collectionID: collectionID,
      content: content,
      createdAt,
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

    // convert time to philippine time
    // const createdAt = DateTime.fromJSDate(newNote.createdAt).setZone('Asia/Manila').toFormat('yyyy-MM-dd hh:mm:ss a');

    response.status(200).json({
      status: "success",
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

// delete note (OK)
noteRouter.delete("/:collectionID/:noteID", async (request, response) => {
  try {
    const { collectionID, noteID } = request.params;
    //find the note instance and delete
    const deleteNote = await NoteModel.findByIdAndDelete(noteID);
    if (!deleteNote) {
      return response.status(400).json({ message: "note not found" });
    }

    // delete the instance of note in its collection
    await NotesCollectionModel.findByIdAndUpdate(collectionID, {
      $pull: { savedNotes: noteID },
    });

    response
      .status(200)
      .json({ message: `successfully deleted`, deletedNote: deleteNote });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

// search note insensitive (OK)
noteRouter.get("/search/:query", async (request, response) => {
  try {
    const { query } = request.params;

    const searchNote = await NoteModel.find({
      title: { $regex: query, $options: "i" },
    });
    if (searchNote.length === 0) {
      response.status(200).json({ status: 200, result: searchNote });
    }

    response.status(200).json({ status: 200, result: searchNote });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

export { noteRouter as collectionsRouter };


