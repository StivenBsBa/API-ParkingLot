import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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

export default Dueño;
