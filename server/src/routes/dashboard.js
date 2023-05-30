import mongoose from "mongoose";
import express from "express";
import { NoteModel } from "../models/Note.js";

const router = express.Router();

// get all notes by current user
router.post("/", async (request, response) => {
  try {
    const { userID } = request.body;
    const dashboardAllNotes = await NoteModel.find({ userID: userID });
    response.status(200).json({ status: "success", data: dashboardAllNotes });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

export { router as dashboardRouter };
