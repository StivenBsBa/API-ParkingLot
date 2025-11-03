import { Vehicle, Dueño } from "../models/index.js";
import { ResponseMessages } from "../constants/responseMessages.js";
import sequelize from "../config/database.js";

// Función para obtener un solo vehículo por placa
export const oneVehicle = async (req, res, next) => {
  try {
    const { formattedPlate } = req;

    const vehicle = await Vehicle.findOne({
      where: { plate: formattedPlate },
      include: [{ model: Dueño }], // Incluir el objeto Dueño completo
      attributes: { exclude: ['ownerCedula'] } // Excluir la clave foránea
    });

    if (!vehicle) {
      const error = new Error(ResponseMessages.VEHICLE_NOT_FOUND.message);
      error.statusCode = ResponseMessages.VEHICLE_NOT_FOUND.status;
      error.responseMessage = ResponseMessages.VEHICLE_NOT_FOUND;
      return next(error);
    }

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

// Función para listar vehículos con filtros
export const listVehicles = async (req, res, next) => {
  try {
    const { status, vehicleType } = req.query;
    const query = {};

    if (status) {
      if (!["active", "inactive"].includes(status)) {
        const error = new Error(ResponseMessages.INVALID_STATUS_VALUE.message);
        error.statusCode = ResponseMessages.INVALID_STATUS_VALUE.status;
        error.responseMessage = ResponseMessages.INVALID_STATUS_VALUE;
        return next(error);
      }
      query.status = status;
    }

    if (vehicleType) {
      if (!["Carro", "Moto"].includes(vehicleType)) {
        const error = new Error("Tipo de vehículo inválido. Debe ser Carro o Moto.");
        error.statusCode = 400;
        return next(error);
      }
      query.vehicleType = vehicleType;
    }

    const vehicles = await Vehicle.findAll({
        where: query,
        include: [{ model: Dueño }],
        attributes: { exclude: ['ownerCedula'] }
    });

    if (vehicles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron vehículos con los filtros especificados.",
      });
    }

    res.status(ResponseMessages.VEHICLE_LIST_SUCCESS.status).json({
      ...ResponseMessages.VEHICLE_LIST_SUCCESS,
      vehicles,
    });
  } catch (error) {
    next(error);
  }
};

// Función para listar todos los dueños
export const listOwners = async (req, res, next) => {
  try {
    const owners = await Dueño.findAll();

    if (owners.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron dueños registrados.",
      });
    }

    res.status(200).json({
      success: true,
      data: owners,
    });
  } catch (error) {
    next(error);
  }
};

// Función para listar vehículos por cédula de dueño
export const oneCedula = async (req, res, next) => {
    try {
      const { Cedula } = req.params;
  
      const dueño = await Dueño.findByPk(Cedula, {
        include: {
            model: Vehicle,
            attributes: { exclude: ['ownerCedula'] }
        }
      });

      if (!dueño) {
        const error = new Error("Dueño no encontrado");
        error.statusCode = 404;
        return next(error);
      }
  
      return res.status(200).json({
        success: true,
        message: `Vehículos del dueño ${dueño.Nombre} (Cédula: ${Cedula}):`,
        dueño: dueño,
      });
    } catch (error) {
      next(error);
    }
  };

// Función para obtener las estadísticas de los vehículos
export const getVehicleStats = async (req, res, next) => {
  try {
    const stats = await Vehicle.findAll({
      attributes: [
        'status',
        'vehicleType',
        [sequelize.fn('COUNT', sequelize.col('plate')), 'count']
      ],
      group: ['status', 'vehicleType'],
      raw: true
    });

    const formattedStats = stats.reduce((acc, stat) => {
      const { status, vehicleType, count } = stat;
      if (!acc[status]) {
        acc[status] = {};
      }
      acc[status][vehicleType] = count;
      return acc;
    }, {});

    const activeMotos = formattedStats.active?.Moto || 0;
    const inactiveMotos = formattedStats.inactive?.Moto || 0;
    const activeCarros = formattedStats.active?.Carro || 0;
    const inactiveCarros = formattedStats.inactive?.Carro || 0;

    const totalVehicles = activeMotos + inactiveMotos + activeCarros + inactiveCarros;
    const totalActiveVehicles = activeMotos + activeCarros;
    const totalInactiveVehicles = inactiveMotos + inactiveCarros;

    return res.status(200).json({
      success: true,
      message: "Estadísticas de vehículos obtenidas correctamente.",
      data: {
        "total de Vehículos": totalVehicles,
        "total de Vehículos activos": totalActiveVehicles,
        "total de Vehículos Inactivos": totalInactiveVehicles,
        "total de Motos Activas": activeMotos,
        "total de Motos Inactivas": inactiveMotos,
        "total de Carros Activos": activeCarros,
        "total de Carros Inactivos": inactiveCarros,
      },
    });
  } catch (error) {
    next(error);
  }
};