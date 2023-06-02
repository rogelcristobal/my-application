import mongoose from "mongoose";
import express from "express";
import { NoteModel } from "../models/Note.js";
import { UserModel } from "../models/Users.js";
import { NotesCollectionModel } from "../models/NotesCollection.js";
const router = express.Router();

// get all collection by current user
router.get("/:userID", async (request, response) => {
  try {
    const { userID } = request.params;
    const user = await UserModel.findById(userID);
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    const noteCollection = await NotesCollectionModel.find({
      _id: { $in: user.noteCollections },
    })
      .populate("savedNotes")
      .lean();

    // just for getting the total notes of the user
    const allNotes = await NoteModel.find({ userID: userID });
    const totalNotes = allNotes.length;

    response.status(200).json({
      status: "sucess",
      collections: noteCollection,
      totalNotes: totalNotes,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/:userID/:collectionID", async (request, response) => {
  try {
    const { userID, collectionID } = request.params;
    const collection = await NotesCollectionModel.findById(collectionID)
      .populate("savedNotes") // populate the referencing field automatically
      .lean(); // convert it to a js object
    if (!collection) {
      return response
        .status(400)
        .json({ message: "collection does not exist!" });
    }
    response.status(200).json({ message: "success", data: collection });
  } catch (error) {}
});

export { router as dashboardRouter };
