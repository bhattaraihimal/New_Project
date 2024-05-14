const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 

const RolePermission = sequelize.define('RolePermission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Role', 
      key: 'id',
    },
  },
  notice: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  ads: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  information: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  employee: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

RolePermission.belongsTo(Role);

module.exports = RolePermission;
