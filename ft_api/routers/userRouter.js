import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { signJWT } from "../utils/jwt.js";
import { auth } from "../middlewares/authMiddleware.js";
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

// Login user
router.post("/login", async (req, res, next) => {
  try {
    //1. recieve email and password
    const { email, password } = req.body;
    if (email && password) {
      //2. find the user by email
      const user = await getUserByEmail(email);
      if (user?._id) {
        //3. match the password
        const isMatched = comparePassword(password, user.password);
        if (isMatched) {
          // the user actually authenticated
          //4. JWT and store the jwt in db then return the user{} with jwr token
          const accessJWT = signJWT({
            email: email,
          });

          user.password = undefined;
          res.json({
            status: "success",
            message: "Loged in successfully",
            user,
            accessJWT,
          });
          return;
        }
      }
    }
    res.status(401).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// User profile
router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;

    res.json({
      status: "success",
      message: "Here is the user profile",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
