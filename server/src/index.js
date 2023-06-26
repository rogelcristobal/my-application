import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from 'http';
import { Server } from 'socket.io';

import { userRouter } from "./routes/users.js";
import { collectionsRouter } from "./routes/notes.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { toDoRouter } from "./routes/todos.js";

const app = express();
const server = createServer(app); // Pass the Express app to createServer()
const io = new Server(server, {
  cors:{
    origin: "http://localhost:5173"
  }
});

app.use(express.json());
app.use(cors());

// userId = mongoose obectID
// uid = firebase uid
app.use("/auth", userRouter);
app.use("/collections", collectionsRouter);
app.use("/dashboard", dashboardRouter);
app.use("/todos", toDoRouter);

mongoose.connect("mongodb+srv://rogelcristobal:eraserheads1011@notes.5jayhma.mongodb.net/notes?retryWrites=true&w=majority");


const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
export { io };


// socketIO
io.on('connection', (socket) => {
  console.log('A user is connected');

  // Handle real-time events here 
  socket.on('deleteNoteCollection',()=>{});

  // User disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



