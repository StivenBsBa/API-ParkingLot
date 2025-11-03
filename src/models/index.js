import Vehicle from './vehicle.js';
import Dueño from './dueño.js';

Vehicle.belongsTo(Dueño, { foreignKey: 'ownerCedula' });
Dueño.hasMany(Vehicle, { foreignKey: 'ownerCedula' });

export { Vehicle, Dueño };
