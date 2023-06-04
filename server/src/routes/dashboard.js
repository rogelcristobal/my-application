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
    const user = await UserModel.findOne({uid:userID})
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    const noteCollection = await NotesCollectionModel.find({
      _id: { $in: user.noteCollections },
    })
      .populate("savedNotes")
      .lean();

    // just for getting the total notes of the user
    // const allNotes = await NoteModel.find({ uid: uid });
    // const totalNotes = allNotes.length;
    const totalNotes = await NoteModel.count(userID)
    
    response.status(200).json(
      {user,noteCollection,totalNotes}
    );
    // totalNotes: totalNotes,
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

export { router as dashboardRouter };
