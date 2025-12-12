import { checkoutServices } from "../services/checkoutServices.js";
import { formatResponse } from "../utils/formatResponse.js";

export const checkout = async (req, res, next) => {
  try {
    const result = await checkoutServices(req.body.user, req.body.product);

    return res
      .status(200)
      .json(formatResponse(200, "Checkout Success", result));
  } catch (err) {
    next(err);
  }
};
