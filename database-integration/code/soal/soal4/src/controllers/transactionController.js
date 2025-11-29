import * as transactionService from "../services/transactionService.js";

export const transaction = async (req, res, next) => {
  try {
    const transaction = await transactionService.create(
      req.body.fromUser,
      req.body.toUser,
      req.body.amount
    );

    return res.status(201).json({ data: transaction });
  } catch (err) {
    next(err);
  }
};
