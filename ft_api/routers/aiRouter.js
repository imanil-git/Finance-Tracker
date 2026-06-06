import express from "express";
import { getTransaction } from "../models/transaction/TransactionModel.js";
import { askFinanceAI } from "../ai/financeChain.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    const userId = req.userInfo._id;

    const transcations = await getTransaction(userId);

    const answer = await askFinanceAI(transcations, question);

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
