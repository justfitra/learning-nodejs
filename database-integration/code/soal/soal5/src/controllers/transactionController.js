import * as transactionService from "../services/transactionService.js";
import { formatResponse } from "../utils/formatResponse.js";

export const transaction = async (req, res, next) => {
  try {
    const fromUser = req.body.fromUser;
    const toUser = req.body.toUser;
    const amount = req.body.amount;
    const result = await transactionService.create(fromUser, toUser, amount);

    return res
      .status(201)
      .json(formatResponse(201, "Transaction Created Successfully", result));
  } catch (err) {
    console.log("is error" + err.status + err.message);

    next(err);
  }
};
