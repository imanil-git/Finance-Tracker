import express from "express";
const router = express.Router();

//insert transaction
router.post("/", (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userId = _id;
    console.log(req.body);
    console.log(req.body);
    res.json({
      status: "success",
      message: "TODO insert new transaction",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
