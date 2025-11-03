import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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

export default Vehicle;
