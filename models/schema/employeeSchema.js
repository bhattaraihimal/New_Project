import { DataTypes } from "sequelize";
import { User } from "../model.js";


const employeeSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePic: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  user_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: (async () => {
        const { User } = await import('../model.js');
        return User;
      })(), 
      key: 'id',
    },
  },
};

//Employee.belongsTo(User);


export default employeeSchema;