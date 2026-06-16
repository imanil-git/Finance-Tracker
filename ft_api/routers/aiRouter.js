import express from "express";
import { getTransaction } from "../models/transaction/TransactionModel.js";
import { askFinanceAI } from "../ai/financeChain.js";
import { getUserByEmail } from "../models/user/UserModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    const userId = req.userInfo._id;

    const transactions = await getTransaction(userId);

    const answer = await askFinanceAI(transactions, question);

    res.json({
      status: "success",
      answer,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
