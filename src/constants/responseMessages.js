const createResponseMessage = (status, success, message) => ({
  status,
  success,
  message,
});

export const ResponseMessages = {
  // Mensajes de éxito
  VEHICLE_REGISTERED_SUCCESS: createResponseMessage(
    201,
    true,
    "El vehículo ha sido registrado exitosamente."
  ),

  VEHICLE_DELETED_SUCCESS: createResponseMessage(
    200,
    true,
    "El vehículo ha sido eliminado exitosamente."
  ),

  VEHICLE_EXITED_SUCCESS: createResponseMessage(
    200,
    true,
    "La salida del vehículo se ha registrado correctamente."
  ),

  VEHICLE_LIST_SUCCESS: createResponseMessage(
    200,
    true,
    "Lista de vehículos obtenida con éxito."
  ),
  LISTA_DUEÑO: createResponseMessage(
    200,
    true,
    "Lista de vehículos DEL DUEÑO obtenida con éxito."
  ),
  // Mensajes de error
  VEHICLE_NOT_FOUND: createResponseMessage(
    404,
    false,
    "El vehículo solicitado no fue encontrado."
  ),

  VEHICLE_ACTIVE: createResponseMessage(
    400,
    false,
    "El vehículo ya está registrado como activo."
  ),

  VEHICLE_INACTIVE: createResponseMessage(
    400,
    false,
    "El vehículo ya está registrado como inactivo."
  ),

  SERVER_ERROR: createResponseMessage(
    500,
    false,
    "Ha ocurrido un error en el servidor. Por favor, inténtelo de nuevo más tarde."
  ),

  INVALID_DATE_FORMAT: createResponseMessage(
    400,
    false,
    "El formato de la fecha proporcionada no es válido."
  ),

  VEHICLE_ALREADY_REGISTERED: createResponseMessage(
    400,
    false,
    "El vehículo ya está registrado en el sistema."
  ),
};
