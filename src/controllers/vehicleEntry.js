import { Vehicle, Dueño } from "../models/index.js";
import { ResponseMessages } from "../constants/responseMessages.js";

const CAR_LIMIT = 50; // Límite de carros
const MOTORCYCLE_LIMIT = 100; // Límite de motos

export const vehicleEntry = async (req, res, next) => {
  try {
    const { vehicleType, entryTime, exitTime, status } = req.body;
    let { Cedula, Nombre } = req.body;
    const { formattedPlate } = req;

    // Si no se proporcionan los datos del dueño, se asignan valores por defecto
    if (!Cedula || !Nombre) {
      Cedula = "1111111";
      Nombre = "invitado";
    }

    // Verificar si el vehículo ya está registrado y activo
    const existingVehicle = await Vehicle.findOne({
      where: { plate: formattedPlate, status: "active" },
    });
    if (existingVehicle) {
      const error = new Error(ResponseMessages.VEHICLE_ALREADY_REGISTERED.message);
      error.statusCode = ResponseMessages.VEHICLE_ALREADY_REGISTERED.status;
      error.responseMessage = ResponseMessages.VEHICLE_ALREADY_REGISTERED;
      return next(error);
    }

    // Validar fechas si son proporcionadas
    const validateDate = (date) => isNaN(new Date(date).getTime());
    if (entryTime && validateDate(entryTime)) {
      const error = new Error(ResponseMessages.INVALID_DATE_FORMAT.message);
      error.statusCode = ResponseMessages.INVALID_DATE_FORMAT.status;
      error.responseMessage = ResponseMessages.INVALID_DATE_FORMAT;
      return next(error);
    }
    if (exitTime && validateDate(exitTime)) {
      const error = new Error(ResponseMessages.INVALID_DATE_FORMAT.message);
      error.statusCode = ResponseMessages.INVALID_DATE_FORMAT.status;
      error.responseMessage = ResponseMessages.INVALID_DATE_FORMAT;
      return next(error);
    }

    // Verificar disponibilidad según el tipo de vehículo
    const limits = { Carro: CAR_LIMIT, Moto: MOTORCYCLE_LIMIT };
    const activeVehicles = await Vehicle.count({
      where: { vehicleType, status: "active" },
    });

    if (limits[vehicleType] === undefined) {
      const error = new Error("Tipo de vehículo inválido debe ser Carro o Moto.");
      error.statusCode = 400;
      return next(error);
    }

    if (activeVehicles >= limits[vehicleType]) {
      const error = new Error(`No hay espacio para más ${
        vehicleType === "Carro" ? "carros" : "motos"
      }.`);
      error.statusCode = 400;
      return next(error);
    }

    // Encontrar o crear el Dueño
    const [owner, created] = await Dueño.findOrCreate({
      where: { Cedula },
      defaults: { Nombre },
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
    return next(error);
  }
};