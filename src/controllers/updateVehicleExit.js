import { Vehicle } from "../models/vehicleModels.js";
import { ResponseMessages } from "../constants/responseMessages.js";

export const updateVehicleExit = async (req, res) => {
  try {
    const { formattedPlate } = req;

    // Buscar y validar el vehículo
    const vehicle = await Vehicle.findOne({ where: { plate: formattedPlate } });

    if (!vehicle) {
      return res
        .status(ResponseMessages.VEHICLE_NOT_FOUND.status)
        .json(ResponseMessages.VEHICLE_NOT_FOUND);
    }
    if (vehicle.status === "inactive") {
      return res.status(400).json({
        success: false,
        message: `El vehículo con placa ${formattedPlate} ya ha salido.`,
      });
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
    console.error("Error al actualizar la salida del vehículo:", error);
    res.status(500).json({
      success: false,
      message: "Error al procesar la salida del vehículo.",
      error: error.message,
    });
  }
};