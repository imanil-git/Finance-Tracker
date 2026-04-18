import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/finance_tracker";

export const conMongoDB = async() => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    conn && console.log("Db connected succesfully")
  } catch (error) {
    console.log(error);
  }
};
