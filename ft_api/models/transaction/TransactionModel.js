import TransactionSchema from "./TransactionSchema.js";

//insert
export const insertTransaction = (obj) => {
  return TransactionSchema(obj).save();
};

// get
export const getTransaction = (userId, page = 1, limit = 10) => {
  if (!userId) {
    throw new Error("userId is required");
  }

  const skip = (page - 1) * limit;

  return TransactionSchema.find({ userId })
    .sort({ tDate: -1 })
    .skip(skip)
    .limit(limit);
};

export const countTransactions = (userId) => {
  return TransactionSchema.countDocuments({
    userId,
  });
};

// Update
export const updateTransaction = (id, userId, obj) => {
  return TransactionSchema.updateOne(
    {
      _id: id,
      userId,
    },
    {
      $set: obj,
    },
  );
};

// delete
export const deleteTransactions = (userId, idsToDelete) => {
  return TransactionSchema.deleteMany({ userId, _id: { $in: idsToDelete } });
};
