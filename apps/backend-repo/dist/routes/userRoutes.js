"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get("/fetch-user-data", authMiddleware_1.default, api_1.fetchUserData);
router.put("/update-user-data", api_1.updateUserData);
router.post("/generate-user-data", authMiddleware_1.default, api_1.generateAndSaveRandomUsers);
exports.default = router;
