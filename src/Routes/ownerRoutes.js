import express from "express";
import { listOwners } from "../controllers/allVehicles.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, listOwners);

export default router;
