import TransactionSchema from "./TransactionSchema.js";

//insert
export const insertTransaction = (obj) => {
  return TransactionSchema(obj).save();
};

// get
export const getTransaction = (userId) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  return TransactionSchema.find({ userId });
};

// delete
export const deleteTransactions = (userId, idsToDelete) => {
  return TransactionSchema.deleteMany({ userId, _id: { $in: idsToDelete } });
};
