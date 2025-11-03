import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Modelo para Dueños
const Dueño = sequelize.define('Dueño', {
  Cedula: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

// Modelo para Vehículos
const Vehicle = sequelize.define('Vehicle', {
  plate: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entryTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  exitTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  totalTime: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: false
});

// Definir la relación
Vehicle.belongsTo(Dueño, { foreignKey: 'ownerCedula' });
Dueño.hasMany(Vehicle, { foreignKey: 'ownerCedula' });

export { Vehicle, Dueño };