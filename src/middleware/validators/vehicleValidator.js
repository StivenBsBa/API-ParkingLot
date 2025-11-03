import Joi from 'joi';

const plateSchema = Joi.object({
  plate: Joi.string().alphanum().min(6).max(7).required(),
});

const vehicleEntrySchema = Joi.object({
  plate: Joi.string().alphanum().min(6).max(7).required(),
  vehicleType: Joi.string().valid('Carro', 'Moto').required(),
  entryTime: Joi.date().optional(),
  exitTime: Joi.date().optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
  Cedula: Joi.number().integer().optional(),
  Nombre: Joi.string().optional(),
});

const ownerSchema = Joi.object({
  Cedula: Joi.number().integer().required(),
});

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate({ ...req.body, ...req.params, ...req.query }, { stripUnknown: true });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message).join(', ');
    const err = new Error(errorDetails);
    err.statusCode = 400;
    return next(err);
  }

  if (value.plate) {
    req.formattedPlate = value.plate.toUpperCase().trim();
  }

  Object.assign(req.body, value);

  return next();
};

export const validatePlate = validate(plateSchema);
export const validateVehicleEntry = validate(vehicleEntrySchema);
export const validateOwner = validate(ownerSchema);
