import Vehicle from './vehicle.js';
import Dueño from './dueño.js';
import Admin from './admin.js';

Vehicle.belongsTo(Dueño, { foreignKey: 'ownerCedula' });
Dueño.hasMany(Vehicle, { foreignKey: 'ownerCedula' });

export { Vehicle, Dueño, Admin };
