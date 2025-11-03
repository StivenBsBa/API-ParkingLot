import { Vehicle } from "../models/index.js";
import { ResponseMessages } from "../constants/responseMessages.js";

export const updateVehicleExit = async (req, res, next) => {
  try {
    const { formattedPlate } = req;

    // Buscar y validar el vehículo
    const vehicle = await Vehicle.findOne({ where: { plate: formattedPlate } });

    if (!vehicle) {
      const error = new Error(ResponseMessages.VEHICLE_NOT_FOUND.message);
      error.statusCode = ResponseMessages.VEHICLE_NOT_FOUND.status;
      error.responseMessage = ResponseMessages.VEHICLE_NOT_FOUND;
      return next(error);
    }
    if (vehicle.status === "inactive") {
      const error = new Error(`El vehículo con placa ${formattedPlate} ya ha salido.`);
      error.statusCode = 400;
      return next(error);
    }

    // Calcular el tiempo de parqueo y aproximarlo hacia arriba
    const exitTime = new Date();
    const hoursSpent = Math.ceil(
      (exitTime - new Date(vehicle.entryTime)) / (1000 * 60 * 60)
    );

    // Actualizar campos del vehículo
    vehicle.exitTime = exitTime;
    vehicle.status = "inactive";
    vehicle.totalTime = (vehicle.totalTime || 0) + hoursSpent;

    await vehicle.save();

    // Responder con los detalles del vehículo actualizado
    const totalTimeMessage = `${vehicle.totalTime} ${
      vehicle.totalTime === 1 ? "hora" : "horas"
    }`;
    res.status(200).json({
      success: true,
      message: `El vehículo con placa ${vehicle.plate} estuvo ${hoursSpent} ${
        hoursSpent === 1 ? "hora" : "horas"
      } en el parqueadero. El tiempo total acumulado es de ${totalTimeMessage}.`,
    });
  } catch (error) {
    next(error);
  }
};