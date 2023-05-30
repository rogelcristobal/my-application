import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { noteRouter } from "./routes/notes.js";
import { dashboardRouter } from "./routes/dashboard.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/collections", noteRouter)
app.use("/dashboard", dashboardRouter)

mongoose.connect(
  "mongodb+srv://rogelcristobal:eraserheads1011@notes.5jayhma.mongodb.net/notes?retryWrites=true&w=majority"
);

app.listen(3001, () => {
  console.log("server-started");
});

