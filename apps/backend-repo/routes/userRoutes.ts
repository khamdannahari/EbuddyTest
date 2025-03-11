import express from "express";
import {
  fetchUserData,
  generateAndSaveRandomUsers,
  login,
  updateUserData,
} from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/check", (_req, res) => res.send("Backend active"));
router.post("/login", login);
router.post("/generate-user-data", authMiddleware, generateAndSaveRandomUsers);
router.get("/fetch-user-data", authMiddleware, fetchUserData);
router.put("/update-user-data", authMiddleware, updateUserData);

export default router;
