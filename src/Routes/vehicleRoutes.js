import express from "express";
import { vehicleEntry } from "../controllers/vehicleEntry.js";
import { deleteVehicleRecord } from "../controllers/deleteVehicleRecord.js";
import {
  listVehiclesByStatus,
  oneVehicle,
  getVehicleStats,
  oneCedula,
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

const router = express.Router();

router.get("/", listVehiclesByStatus);
router.get("/stats", getVehicleStats);
router.get("/hours", getVehicleTotalHours);
router.get("/hours/total", getTotalHours);
router.get("/:plate", validatePlate, oneVehicle);
router.get("/:plate/hours", validatePlate, getVehicleTotalPlate);
router.put("/:plate/exit", validatePlate, updateVehicleExit);
router.delete("/:plate", validatePlate, deleteVehicleRecord);
router.post("/", validateVehicleEntry, vehicleEntry);
router.get("/owner/:Cedula", validateOwner, oneCedula);

export default router;
