const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    required: true,
  },
  lastName: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

module.exports = User;