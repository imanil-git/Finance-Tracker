import express from "express";
import {
  countTransactions,
  deleteTransactions,
  getTransaction,
  insertTransaction,
  updateTransaction,
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
    next(error);
  }
});

// Get transaction
router.get("/", async (req, res, next) => {
  try {
    // get user transactions
    const { _id } = req.userInfo;

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const transactions = (await getTransaction(_id, page, limit)) || [];

    const totalTransactions = await countTransactions(_id);

    const totalPages = Math.ceil(totalTransactions / limit);
    res.json({
      status: "success",
      message: "Transactions fetched",

      transactions,

      pagination: {
        currentPage: page,
        limit,
        totalPages,
        totalTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Update Transaction
router.patch("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    const { id } = req.params;

    const { _id } = req.userInfo;

    // update transaction
    const result = await updateTransaction(id, _id, req.body);
    console.log("Result = ", result);
    result?.modifiedCount
      ? res.json({
          status: "success",
          message: "Transaction updated successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update successfully",
        });
  } catch (error) {
    next(error);
  }
});

// Delete Transaction
router.delete("/", async (req, res, next) => {
  try {
    // Recieve ids[] and id of user
    const ids = req.body;
    const { _id } = req.userInfo;
    // Perform the deletion query
    const result = await deleteTransactions(_id, ids);
    res.json({
      status: "success",
      message: result.deletedCount + " transactions has been deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
