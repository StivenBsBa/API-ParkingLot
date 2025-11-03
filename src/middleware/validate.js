export const validatePlate = (req, res, next) => {
  const plate = req.body?.plate || req.params?.plate;

  try {
    const platePattern = /^[A-Z0-9]{6,7}$/;

    if (plate === undefined) {
      throw new Error("La placa no fue ingresada.");
    }

    const formattedPlate = plate.toUpperCase().trim();

    if (!formattedPlate) {
      throw new Error("La placa no puede ser nula o vacía.");
    }

    if (!platePattern.test(formattedPlate)) {
      throw new Error(
        "El formato de la placa no es válido. Debe ser una cadena de 6 o 7 caracteres alfanuméricos (letras y números)."
      );
    }

    req.formattedPlate = formattedPlate; // Adjuntar la placa formateada al objeto req
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
