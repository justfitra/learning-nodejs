import { transactionService } from "../services/transactionService.js";

export const transaction = async (req, res, next) => {
  try {
    const transc = await transactionService(
      req.body.fromUser,
      req.body.toUser,
      req.body.amount
    );

    return res.status(201).json({ transaction: transc });
  } catch (err) {}
};
