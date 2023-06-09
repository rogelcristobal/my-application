import express from "express";
import { TodoCollectionModel } from "../models/TodosCollections.js";
import { UserModel } from "../models/Users.js";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const { userID, title } = request.body;
    const newTodoCollection = new TodoCollectionModel({
      userID: userID,
      collectionTitle: title,
      todos: [],
    });
    await newTodoCollection.save();

    //filter users based on userID request then push the new todo collection id
    const user = await UserModel.findByIdAndUpdate(userID, {
      $push: { todoCollections: newTodoCollection._id },
    });

    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }
    response.status(200).json({
      status: "success",
      userID: user._id,
      email: user.email,
      createdCollection: newTodoCollection,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

export { router as toDoRouter };
