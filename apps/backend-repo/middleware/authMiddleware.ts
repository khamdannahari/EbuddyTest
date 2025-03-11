import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await auth.verifyIdToken(token);

    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

export default authMiddleware;
