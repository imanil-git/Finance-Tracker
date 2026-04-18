import express from "express";
import { insertUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
const router = express.Router();

// User sign up
router.post("/", async (req, res) => {
  try {
    // password encryption
    req.body.password = hashPassword(req.body.password);
    console.log(req.body.password);
    // insert the user
    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "User created successfully, Please Login now",
        })
      : es.json({
          status: "error",
          message: "Please try again",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// User login

// User profile
export default router;
