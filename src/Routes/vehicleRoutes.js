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
import { validatePlate } from "../constants/validate.js";

const router = express.Router();

// Otras rutas existentes
router.get("/list", listVehiclesByStatus);
router.get("/oneVehicles/:plate", validatePlate, oneVehicle);
router.get("/oneCedula/:Cedula", oneCedula);
router.get("/vehicle-hours/:plate", validatePlate, getVehicleTotalPlate);
router.get("/all-vehicles-hours", getVehicleTotalHours);
router.get("/total-hours", getTotalHours);
router.get("/stats", getVehicleStats);

router.post("/vehicleEntry", validatePlate, vehicleEntry);


router.put("/exit/:plate", validatePlate, updateVehicleExit);

router.delete("/delete/:plate", validatePlate, deleteVehicleRecord);

export default router;
