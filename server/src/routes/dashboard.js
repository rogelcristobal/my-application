import mongoose from "mongoose";
import express from "express";
import { NoteModel } from "../models/Note.js";
import { UserModel } from "../models/Users.js";
import { NotesCollectionModel } from "../models/NotesCollection.js";
const router = express.Router();

// get all notes by current user
router.post("/", async (request, response) => {
  try {
    const {userID} = request.body
    const user = await UserModel.findById(userID)
    const noteCollection = await NotesCollectionModel.find({ _id: {$in: user.noteCollections}})
    response.status(200).json({status:'sucess',email:user.email,collections:noteCollection})
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

export { router as dashboardRouter };
