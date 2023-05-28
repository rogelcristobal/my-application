import express from "express";
import { NotesModel } from "../models/Notes.js";
const router = express.Router();
// adding notes
router.post("/add-note", async (request, response) => {
  try {
    const { collectionTitle, userID } = request.body;

    const newNote = new NotesModel({
      collectionTitle: collectionTitle,
      userID: userID,
    });
    await newNote.save();

    response.json({ message: " data added!" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An error occurred" });
  }
});
// getting user notes
router.get("/user/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const notes = await NotesModel.find({ userID: userId });
    response.status(200).json({ status: "success", data: notes });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});


export { router as noteRouter };
