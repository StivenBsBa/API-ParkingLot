import { Vehicle, Dueño } from "../models/vehicleModels.js";
import { ResponseMessages } from "../constants/responseMessages.js";

// Función para obtener un solo vehículo por placa
export const oneVehicle = async (req, res) => {
  try {
    const { formattedPlate } = req;

    const vehicle = await Vehicle.findOne({
      where: { plate: formattedPlate },
      include: [{ model: Dueño, attributes: ['Nombre'] }], // Incluir el nombre del dueño
      attributes: { exclude: ['ownerCedula'] } // Excluir la clave foránea
    });

    if (!vehicle) {
      return res.status(ResponseMessages.VEHICLE_NOT_FOUND.status).json({
        ...ResponseMessages.VEHICLE_NOT_FOUND,
      });
    }

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(ResponseMessages.SERVER_ERROR.status).json({
      ...ResponseMessages.SERVER_ERROR,
      error: error.message
    });
  }
};

// Función para listar vehículos por estado (activo/inactivo)
export const listVehiclesByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    if (status && !["active", "inactive"].includes(status)) {
      return res.status(ResponseMessages.INVALID_STATUS_VALUE.status).json(ResponseMessages.INVALID_STATUS_VALUE);
    }

    const query = status ? { status } : {};

    const vehicles = await Vehicle.findAll({
        where: query,
        include: [{ model: Dueño, attributes: ['Nombre'] }],
        attributes: { exclude: ['ownerCedula'] }
    });

    if (vehicles.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontraron vehículos con estado ${
          status || "cualquiera"
        }`,
      });
    }

    res.status(ResponseMessages.VEHICLE_LIST_SUCCESS.status).json({
      ...ResponseMessages.VEHICLE_LIST_SUCCESS,
      vehicles,
    });
  } catch (error) {
    res.status(ResponseMessages.SERVER_ERROR.status).json({
      ...ResponseMessages.SERVER_ERROR,
      error: error.message
    });
  }
};

// Función para listar vehículos por cédula de dueño
export const oneCedula = async (req, res) => {
    try {
      const { Cedula } = req.params;
  
      const dueño = await Dueño.findByPk(Cedula, {
        include: {
            model: Vehicle,
            attributes: { exclude: ['ownerCedula'] }
        }
      });

      if (!dueño) {
        return res
          .status(404)
          .json({ success: false, message: "Dueño no encontrado" });
      }
  
      return res.status(200).json({
        success: true,
        message: `Vehículos del dueño ${dueño.Nombre} (Cédula: ${Cedula}):`,
        dueño: dueño,
      });
    } catch (error) {
      console.error("Error al obtener los vehículos:", error);
      return res.status(500).json({
        success: false,
        message: "Error del servidor",
        error: error.message,
      });
    }
  };

// Función para obtener las estadísticas de los vehículos
export const getVehicleStats = async (req, res) => {
  try {
    const countWhere = (where) => Vehicle.count({ where });

    const totalVehicles = await Vehicle.count();
    const totalActiveVehicles = await countWhere({ status: "active" });
    const totalInactiveVehicles = await countWhere({ status: "inactive" });
    const totalActiveMotos = await countWhere({ vehicleType: "Moto", status: "active" });
    const totalInactiveMotos = await countWhere({ vehicleType: "Moto", status: "inactive" });
    const totalActiveCarros = await countWhere({ vehicleType: "Carro", status: "active" });
    const totalInactiveCarros = await countWhere({ vehicleType: "Carro", status: "inactive" });

    return res.status(200).json({
      success: true,
      message: "Estadísticas de vehículos obtenidas correctamente.",
      data: {
        "total de Vehículos": totalVehicles,
        "total de Vehículos activos": totalActiveVehicles,
        "total de Vehículos Inactivos": totalInactiveVehicles,
        "total de Motos Activas": totalActiveMotos,
        "total de Motos Inactivas": totalInactiveMotos,
        "total de Carros Activos": totalActiveCarros,
        "total de Carros Inactivos": totalInactiveCarros,
      },
    });
  } catch (error) {
    return res.status(ResponseMessages.SERVER_ERROR.status).json({
      ...ResponseMessages.SERVER_ERROR,
      error: error.message
    });
  }
};