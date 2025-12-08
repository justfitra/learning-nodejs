import { transactionService } from "../services/transactionService.js";
import { formatResposnse } from "../utils/formatResponse.js";

export const transaction = async (req, res, next) => {
  try {
    const response = await transactionService(
      req.body.fromUser,
      req.body.toUser,
      req.body.amount
    );

    return res
      .status(201)
      .json(formatResposnse(201, "Transaction Successfully", response));
  } catch (err) {
    next(err);
  }
};
