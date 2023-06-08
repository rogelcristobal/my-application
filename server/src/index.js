import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { noteRouter } from "./routes/notes.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { toDoRouter } from "./routes/todos.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/collections", noteRouter)
app.use("/dashboard", dashboardRouter)
app.use("/todos", toDoRouter)

mongoose.connect(
  "mongodb+srv://rogelcristobal:eraserheads1011@notes.5jayhma.mongodb.net/notes?retryWrites=true&w=majority"
);

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server-started at port: ${port}`);
});

