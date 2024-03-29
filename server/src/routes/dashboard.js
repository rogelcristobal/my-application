import mongoose from "mongoose";
import express from "express";
import { NoteModel } from "../models/Note.js";
import { UserModel } from "../models/Users.js";
import { NotesCollectionModel } from "../models/NotesCollection.js";
import { TodoCollectionModel } from "../models/TodosCollections.js";
import { TodoModel } from "../models/Todos.js";
import { DateTime } from "luxon";
const router = express.Router();

//extract userID from headers

const extractFirebaseUID = (req, res, next) => {
  req.firebaseUID = req.get("firebaseUID");
  next();
};

// get all collection by current uid (from firebase)
router.get("/", extractFirebaseUID, async (request, response) => {
  try {
    const firebaseUID = request.firebaseUID;
    // find the user via userID from the header extracted
    const user = await UserModel.findOne({ uid: firebaseUID })
      
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

     

    // simple document count
    const totalTodos = await TodoModel.countDocuments({ userID: user._id });
    const totalNotes = await NoteModel.countDocuments({ userID: user._id });
    const {
      _id,
      email,
      firstName,
      lastName,
      noteCollections,
      todoCollections,
      createdAt,
      lastLoginTime,
      provider,
      emailVerified,
    } = user;
    response.status(200).json({
      _id,
      email,
      firstName,
      lastName,
      totalNotes,
      totalTodos,
      noteCollections,
      todoCollections,
      createdAt,
      lastLoginTime,
      provider,
      emailVerified,
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
