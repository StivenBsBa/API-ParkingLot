import { Vehicle } from "../models/vehicleModels.js";

export const deleteVehicleRecord = async (req, res) => {
  try {
    const { formattedPlate } = req;

    // Primero, encontrar el vehículo
    const vehicle = await Vehicle.findOne({
      where: { plate: formattedPlate, status: "inactive" },
    });

    if (!vehicle) {
      return res.status(400).json({
        success: false,
        message:
          "El vehículo no existe, está activo o ya fue eliminado. Verifique el estado del vehículo.",
      });
    }

    // Si se encuentra, eliminarlo
    await vehicle.destroy();

    res.status(200).json({
      success: true,
      message: `El vehículo con placa ${vehicle.plate} de tipo ${vehicle.vehicleType} fue eliminado exitosamente.`,
    });
  } catch (error) {
    console.error("Error al eliminar el registro del vehículo:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el registro del vehículo.",
      error: error.message,
    });
  }
};