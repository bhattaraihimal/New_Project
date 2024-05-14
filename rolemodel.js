const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, 
  },
});

Role.hasMany(RolePermission);

module.exports = Role;
