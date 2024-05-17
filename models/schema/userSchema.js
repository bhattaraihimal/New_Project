import { DataTypes } from "sequelize";
// import { Role } from "../model.js";
import roleSchema from "./roleSchema.js";

const userSchema = {
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
    references: {
      model: roleSchema,
      key: "id",
    },
  },
  // Your code Backup
  // role_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: (async () => {
  //       const { Role } = await import('../model.js');
  //       return Role;
  //     })(),
  //     key: 'id',
  //   },
  // },
};

export default userSchema;
