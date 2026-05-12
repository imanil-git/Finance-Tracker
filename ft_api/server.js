import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;
import cors from "cors";

//connect DB
import { conMongoDB } from "./config/mongodbConfig.js";
conMongoDB();

// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
import userRouter from "./routers/userRouter.js";
import transactionRouter from "./routers/transactionRouter.js";
import { auth } from "./middlewares/authMiddleware.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", auth, transactionRouter);

app.get("/", (req, res) => {
  res.json({
    message: "It's live",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
