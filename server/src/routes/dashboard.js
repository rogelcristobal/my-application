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
    const user = await UserModel.findOne({ uid: userID });
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    const noteCollection = await NotesCollectionModel.find({
      _id: { $in: user.noteCollections },
    })
      .populate("savedNotes")
      .lean();

    const totalNotes = await NoteModel.count(userID);
    const { _id, uid, email, firstName, lastName } = user;
    response
      .status(200)
      .json({
        _id,
        uid,
        email,
        firstName,
        lastName,
        totalNotes,
        noteCollection,
      });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

export { router as dashboardRouter };
