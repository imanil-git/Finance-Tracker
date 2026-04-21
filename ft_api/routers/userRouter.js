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
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error collection")) {
      msg =
        "Another user have used this email, try to login or use different email to signup";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});

// User login

// User profile
export default router;
