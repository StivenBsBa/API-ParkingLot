import { Vehicle } from "../models/index.js";

export const deleteVehicleRecord = async (req, res, next) => {
  try {
    const { formattedPlate } = req;

    // Primero, encontrar el vehículo
    const vehicle = await Vehicle.findOne({
      where: { plate: formattedPlate, status: "inactive" },
    });

    if (!vehicle) {
      const error = new Error("El vehículo no existe, está activo o ya fue eliminado. Verifique el estado del vehículo.");
      error.statusCode = 400;
      return next(error);
    }

    // Si se encuentra, eliminarlo
    await vehicle.destroy();

    res.status(200).json({
      success: true,
      message: `El vehículo con placa ${vehicle.plate} de tipo ${vehicle.vehicleType} fue eliminado exitosamente.`,
    });
  } catch (error) {
    next(error);
  }
};