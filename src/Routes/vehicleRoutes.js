import express from "express";
import { vehicleEntry } from "../controllers/vehicleEntry.js";
import { deleteVehicleRecord } from "../controllers/deleteVehicleRecord.js";
import {
  listVehicles,
  oneVehicle,
  getVehicleStats,
  oneCedula,
  listOwners,
} from "../controllers/allVehicles.js";
import { updateVehicleExit } from "../controllers/updateVehicleExit.js";
import {
  getVehicleTotalPlate,
  getVehicleTotalHours,
  getTotalHours,
} from "../controllers/totalParkingTime .js";
import {
  validatePlate,
  validateVehicleEntry,
  validateOwner,
} from "../middleware/validators/vehicleValidator.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, listVehicles);
router.get("/stats", authMiddleware, getVehicleStats);
router.get("/hours", authMiddleware, getVehicleTotalHours);
router.get("/hours/total", authMiddleware, getTotalHours);
router.get("/:plate", authMiddleware, validatePlate, oneVehicle);
router.get("/:plate/hours", authMiddleware, validatePlate, getVehicleTotalPlate);
router.put("/:plate/exit", authMiddleware, validatePlate, updateVehicleExit);
router.delete("/:plate", authMiddleware, validatePlate, deleteVehicleRecord);
router.post("/", authMiddleware, validateVehicleEntry, vehicleEntry);
router.get("/owner/:Cedula", authMiddleware, validateOwner, oneCedula);

export default router;
