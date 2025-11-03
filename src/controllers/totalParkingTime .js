import { Vehicle } from "../models/index.js";
import { ResponseMessages } from "../constants/responseMessages.js";
import { formatTotalTime } from "../utils/time.js";

// 1. Obtener las horas de parqueo de un vehículo específico
export const getVehicleTotalPlate = async (req, res, next) => {
  try {
    const { formattedPlate } = req;

    const vehicle = await Vehicle.findOne({
      where: { plate: formattedPlate },
    });

    if (!vehicle) {
      const error = new Error(ResponseMessages.VEHICLE_NOT_FOUND.message);
      error.statusCode = ResponseMessages.VEHICLE_NOT_FOUND.status;
      error.responseMessage = ResponseMessages.VEHICLE_NOT_FOUND;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: `Total de horas de parqueo del vehículo ${vehicle.plate}`,
      vehicle: {
        plate: vehicle.plate,
        vehicleType: vehicle.vehicleType,
        totalTime: formatTotalTime(vehicle.totalTime),
      },
    });
  } catch (error) {
    next(error);
  }
};

// 2. Obtener las horas de parqueo de todos los vehículos
export const getVehicleTotalHours = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll();

    if (!vehicles || vehicles.length === 0) {
      const error = new Error("No se encontraron vehículos en el parqueadero");
      error.statusCode = 404;
      return next(error);
    }

    const vehiclesTotalTime = vehicles.map((vehicle) => ({
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
      totalTime: formatTotalTime(vehicle.totalTime),
    }));

    res.status(200).json({
      success: true,
      message: "Horas de todos los vehículos en el parqueadero",
      vehicles: vehiclesTotalTime,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Obtener el total de horas de todos los vehículos en el parqueadero (Optimizado)
export const getTotalHours = async (req, res, next) => {
  try {
    const totalHours = await Vehicle.sum('totalTime');

    if (totalHours === null) {
        const error = new Error("No hay registros de tiempo para calcular.");
        error.statusCode = 404;
        return next(error);
    }

    const formattedTime = formatTotalTime(totalHours);

    res.status(200).json({
      success: true,
      message: "Total de horas de parqueo en el parqueadero",
      totalHours: formattedTime,
    });
  } catch (error) {
    next(error);
  }
};