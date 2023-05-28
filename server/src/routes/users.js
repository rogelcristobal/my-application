import express from "express";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

// this will register a new user to the Users table
router.post("/register", async (req, res) => {
  try {
    // the api accepts two data
    const { username, password } = req.body;

    // check if the creating user already exist in the Users table
    const user = await UserModel.findOne({ username: username }); // returns the user that matches

    // user exist? u cant create existing user
    if (user) {
      return res.json({ message: "User already exist" });
    }

    // hashed version of the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "New user created!" });
  } catch (error) {
    res.json({ message: "error: ", error });
  }
});
// login
router.post("/login", async (request, response) => {
  try {
    // api accepts two data
    const { username, password } = request.body;

    // response contains the username that matches the request.body (boolean)
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return response.json({ message: "Username does not exist!" });
    }

    // compares the user.password thats return by the db, to the password that passed
    const isPasswordValid = await bcrypt.compare(password, user.password); // returns a boolean

    if (!isPasswordValid) {
      response.json({ message: "incorrect password" });
    }

    // creates a token based on the user._id
    const token = jwt.sign({ id: user._id }, "secret");

    response.status(200).json({ status: "success", token, userID: user._id });
  } catch (error) {
    response.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
});

export { router as userRouter };
