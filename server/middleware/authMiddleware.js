import pkg from 'jsonwebtoken';
const { verify } = pkg;
import User from "../models/User.js";

export const authGuard = async (req, res, next) => {

  console.log(req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not Authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let err = new Error("Not Authorized, No Token");
    err.statusCode = 401;
    next(err);
  }
};
