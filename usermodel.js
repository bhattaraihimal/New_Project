const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 
const Notice = require('./noticemodel');
const Ads = require('./adsmodel');
const Employee = require('./employeemodel');
const Information = require('./informationmodel');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, 
  },
  role_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Role', 
      key: 'id',
    },
  },
});

User.belongsTo(Role);

User.hasMany(Notice);
User.hasMany(Ads);
User.hasMany(Employee);
User.hasMany(Information);

module.exports = User;
