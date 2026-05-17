import express from "express";
import {
  deleteTransactions,
  getTransaction,
  insertTransaction,
} from "../models/transaction/TransactionModel.js";
const router = express.Router();

//insert transaction
router.post("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    req.body.userId = _id;
    const result = await insertTransaction(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New transaction added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add new transaction, try again later",
        });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// Get transaction
router.get("/", async (req, res) => {
  try {
    // get user transactions
    const { _id } = req.userInfo;
    const transactions = (await getTransaction(_id)) || [];
    res.json({
      status: "success",
      message: "You get your transcations",
      transactions,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// Delete Transaction
router.delete("/", async(req, res) => {
  try {
    // Recieve ids[] and id of user
    const ids = req.body;
    const { _id } = req.userInfo;
    console.log(ids, _id);
    // Perform the deletion query
    const result = await deleteTransactions(_id, ids);
    res.json({
      status: "success",
      message: result.deletedCount + " transactions has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
