import express from "express";
import { NotesCollectionModel } from "../models/NotesCollection.js";
import { NoteModel } from "../models/Note.js";
import { UserModel } from "../models/Users.js";
import {io} from '../index.js'

//extract userID from headers
const extractUserID = (req,res, next) => {
  // this is how to get the header req.userID or request.userID based on your param
  req.userID = req.header('userID')
  next();
};

// collections/
const collectionsRouter = express.Router();
// get all collections (OK)
collectionsRouter.get('/', extractUserID, async(request,response)=>{
  try {
    const userID =  request.userID
    const user = await UserModel.findById(userID)
    .populate('noteCollections')           // populate the collection
    .populate({                            // populates the nested data within userModel
    path: 'noteCollections',
    populate: {
      path: 'savedNotes',
    },
  })
    if(!user){
      return response.status(404).json({message:'user not found or does not exist!'})
    }
    // const noteCollections = await NotesCollectionModel.find({
    //   _id: {$in: user.noteCollections}
    // }) 
    response.status(200).json({message:"success", data: user.noteCollections})
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
})
// create new note collection (OK)
collectionsRouter.post("/", extractUserID, async (request, response) => {
  try {
    const {title, description} = request.body;
     const userID = request.userID;

    // create a new collection 
    const newNoteCollection = new NotesCollectionModel({
      userID: userID,
      collectionTitle: title,
      description:description,
      savedNotes: [],
    });
    await newNoteCollection.save();

    // find the user you want to edit/add the created collection
    const user = await UserModel.findByIdAndUpdate(userID, {
      $push: { noteCollections: newNoteCollection._id },
    });
    //  return an error if user does not exist
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }


    response.status(200).json({
      status: "success",
      userID: user._id,
      email: user.email,
      createdCollection: newNoteCollection,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});
// delete collection (OK)
collectionsRouter.delete("/:collectionID", async (request, response) => {
  try {
    const { collectionID } = request.params;
    const collection = await NotesCollectionModel.findById(collectionID);
    
    // find the collection
    if(!collection){
      return response.status(400).json({message:"collection not found!"})
    }

    // removes the notes inside the collection
    const deleteNotes = await NoteModel.deleteMany({_id: { $in: collection.savedNotes}})

    //remove the collection instance in all users updateMany({filter},{action})
    await UserModel.updateMany({noteCollections:collectionID}, {$pull: {noteCollections:collectionID}})

    //finally deletes the collection
    const deleteCollection = await NotesCollectionModel.findByIdAndDelete(collectionID)

    io.emit('deleteNoteCollection', deleteCollection);

    response.status(200).json({
      status: "success",
      deletedCollection: deleteCollection,
      deletedNotes: deleteNotes.deletedCount,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});






// collections/notes/
const noteRouter = express.Router()
// create note 
noteRouter.post("/:collectionID/", extractUserID, async (request, response) => {
  try {
    const { title, content } = request.body;
    const { collectionID} = request.params
    const userID = request.userID

    const newNote = new NoteModel({
      userID: userID,
      title: title,
      collectionID: collectionID,
      content:content
    });
    await newNote.save();

    const collection = await NotesCollectionModel.findByIdAndUpdate(
      collectionID,
      {
        $push: { savedNotes: newNote._id },
      }
    );
    if (!collection) {
      return response.status(404).json({ message: "collection not found" });
    }

    response.status(200).json({
      status: "success",
      userID: collection.userID,
      email: collection.email,
      createdNote: newNote,
    });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});
// delete note 
noteRouter.delete("/:collectionID/:noteID", async (request, response) => {
  try {
    const { collectionID,noteID } = request.params;
    //find the note instance and delete
    const deleteNote = await NoteModel.findByIdAndDelete(noteID)
    if(!deleteNote){
      return response.status(400).json({message:"note not found"})
    }
    
    // delete the instance of note in its collection
    await NotesCollectionModel.findByIdAndUpdate(collectionID, {$pull: {savedNotes:noteID}})

    response
      .status(200)
      .json({ message: `successfully deleted`, deletedNote: deleteNote });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});
// search note insensitive (OK)
noteRouter.get("/search/:query", async (request, response) => {
  try {
    const { query } = request.params;

    const searchNote = await NoteModel.find({title :{$regex: query, $options: "i" }})
    if(searchNote.length === 0){
      response.status(200).json({ status: 200, result: searchNote });
    }

    response.status(200).json({status:200,result:searchNote})
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});






collectionsRouter.use('/notes', noteRouter)

export { collectionsRouter as collectionsRouter };



//get all notes
// router.get('/:userID/:collectionID',async(request,response)=>{
//   try {
//     const {collectionID,userID} = request.params
//     const user = await UserModel.findById(userID)
//     if(!user){
//       return response.status(400).json({message:'user not foud!'})
//     }
//     const notes = await NotesCollectionModel.find({ _id: { $in: user.noteCollections }})
//     response.status(200).json({status:'success',data:notes})
//   } catch (error) {
//      response.status(500).json({
//       status: "error",
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// })


//search note sensitive
// router.get("/search/:query", async (request, response) => {
//   try {
//     const { query } = request.params;

//     const searchNote = await NoteModel.find({$text:{$search: query }})
//     if(searchNote.length === 0){
//       return response.status(400).json({message:"note not found"})
//     }

//     response.status(200).json({status:200,result:searchNote})
//   } catch (error) {
//     response.status(500).json({
//       status: "error",
//       message: "An error occurred",
//       error: error.message,
//     });
//   }
// });
