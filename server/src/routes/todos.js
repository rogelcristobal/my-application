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

// delete todo collection (OK)
router.delete("/:collectionID", async(request,response)=>{
 try {
    const { collectionID } = request.params
    const collection = await TodoCollectionModel.findById(collectionID)
    if(!collection){
      return response.status(400).json({message:"collection not found"})
    }
    // delete first the todos within the collection
    const deleteNotesInCollection = await TodoModel.deleteMany({
      _id: { $in:collection.todos } 
    }) 

    // remove the collection in users table
    await UserModel.updateMany({todoCollections:collectionID}, {$pull: {todoCollections:collectionID}})

    // finally , deletes the todo collection
    const deleteCollection = await TodoCollectionModel.findByIdAndDelete(collectionID)

    response.status(200).json({
      status: "success",
      deletedCollection: deleteCollection,
      deletedTodos: deleteNotesInCollection.deletedCount,
    });


 } catch (error) {
   response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
 }
})

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

// delete todo
router.delete("/:collectionID/:todoID",async (request,response)=>{
  try {
    const {collectionID,todoID} = request.params

    //find the todo 
    const deleteTodo = await TodoModel.findByIdAndDelete(todoID)
    if(!deleteTodo){
      return response.status(400).json({message:"todo not found"})
    }

    //delete the instance of the todo on its collection
    await TodoCollectionModel.findByIdAndUpdate(collectionID, {$pull: {todos:todoID}})

    response.status(200).json({status:"success",deletedTodo:deleteTodo})
  } catch (error) {
     response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
})

export { router as toDoRouter };
