import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const verifyJwtToken = async (req, res, next) => {
  let token;
  token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decodedToken.id);

      next();
    } catch (error) {
      res.status(401);
      const err = new Error("Invalid token.!");
      return next(err);
    }
  } else {
    res.status(401);
    const err = new Error("Unauthorized.!");
    return next(err);
  }
};

export { verifyJwtToken };
