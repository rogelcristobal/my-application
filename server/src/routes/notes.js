import express from "express";
import { NotesCollectionModel } from "../models/NotesCollection.js";
const router = express.Router();
// adding note collection
router.post("/", async (request, response) => {
  try {
    const { collectionTitle, userID } = request.body;

    const newNote = new NotesCollectionModel({
      collectionTitle: collectionTitle,
      userID: userID,
      savedNotes: []
    });
    await newNote.save();

    response.json({ message: " data added!" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "An error occurred" });
  }
});
// getting user note collection
router.get("/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const notes = await NotesCollectionModel.find({ userID: userId });
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
