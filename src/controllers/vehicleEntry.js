import { Vehicle, Dueño } from "../models/vehicleModels.js";
import { ResponseMessages } from "../constants/responseMessages.js";

const CAR_LIMIT = 10; // Límite de carros
const MOTORCYCLE_LIMIT = 20; // Límite de motos

export const vehicleEntry = async (req, res) => {
  try {
    const { vehicleType, entryTime, exitTime, status, Cedula, Nombre } =
      req.body;
    const { formattedPlate } = req;

    // Verificar si el vehículo ya está registrado y activo
    const existingVehicle = await Vehicle.findOne({
      where: { plate: formattedPlate, status: 'active' },
    });
    if (existingVehicle) {
      return res
        .status(ResponseMessages.VEHICLE_ALREADY_REGISTERED.status)
        .json(ResponseMessages.VEHICLE_ALREADY_REGISTERED);
    }

    // Validar fechas si son proporcionadas
    const validateDate = (date) => isNaN(new Date(date).getTime());
    if (entryTime && validateDate(entryTime)) {
      return res
        .status(ResponseMessages.INVALID_DATE_FORMAT.status)
        .json(ResponseMessages.INVALID_DATE_FORMAT);
    }
    if (exitTime && validateDate(exitTime)) {
      return res
        .status(ResponseMessages.INVALID_DATE_FORMAT.status)
        .json(ResponseMessages.INVALID_DATE_FORMAT);
    }

    // Verificar disponibilidad según el tipo de vehículo
    const limits = { Carro: CAR_LIMIT, Moto: MOTORCYCLE_LIMIT };
    const activeVehicles = await Vehicle.count({
      where: { vehicleType, status: "active" },
    });

    if (limits[vehicleType] === undefined) {
      return res.status(400).json({
        success: false,
        message: "Tipo de vehículo inválido debe ser Carro o Moto.",
      });
    }

    if (activeVehicles >= limits[vehicleType]) {
      return res.status(400).json({
        success: false,
        message: `No hay espacio para más ${
          vehicleType === "Carro" ? "carros" : "motos"
        }.`,
      });
    }

    // Encontrar o crear el Dueño
    const [owner, created] = await Dueño.findOrCreate({
        where: { Cedula },
        defaults: { Nombre }
    });

    // Registrar el nuevo vehículo
    const newVehicle = await Vehicle.create({
      plate: formattedPlate,
      vehicleType,
      entryTime,
      exitTime,
      status,
      ownerCedula: owner.Cedula, // Asignar la clave foránea
    });

    return res.status(ResponseMessages.VEHICLE_REGISTERED_SUCCESS.status).json({
      ...ResponseMessages.VEHICLE_REGISTERED_SUCCESS,
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error("Error al registrar vehículo:", error);
    return res.status(ResponseMessages.SERVER_ERROR.status).json({
      ...ResponseMessages.SERVER_ERROR,
      error: error.message,
    });
  }
};