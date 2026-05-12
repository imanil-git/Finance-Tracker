import TransactionSchema from "./TransactionSchema.js";

//insert

export const insertTransaction = (obj) => {
    return TransactionSchema(obj).save();
}