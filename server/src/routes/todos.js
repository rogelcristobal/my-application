import express from "express";
import { TodoCollectionModel } from "../models/TodosCollections.js";
import { UserModel } from "../models/Users.js";
import { TodoModel } from "../models/Todos.js";
const router = express.Router();
// create todo collection (OK)
router.post("/:userID", async (request, response) => {
  try {
    const { title } = request.body;
    const { userID } = request.params;
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
// create todo (OK)
router.post("/:userID/:collectionID", async (request, response) => {
  try {
    const {title,description} = request.body
    const {userID, collectionID} = request.params
    const newTodo = new TodoModel({
        userID,collectionID,title,description,status:false
    })
    await newTodo.save()
    // add the created todo to its collection
    const collection = await TodoCollectionModel.findByIdAndUpdate(collectionID,{ $push: {todos:newTodo._id}})
    if(!collection){
        return response.status(400).json({message:"todo collection not found"})
    }
    response.status(200).json({
      status: "success",
      userID: collection.userID,
      email: collection.email,
      createdTodo: newTodo,
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
