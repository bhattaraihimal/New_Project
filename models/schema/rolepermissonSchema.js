import { DataTypes } from "sequelize";
// import { Role } from "../model.js";
import roleSchema from "./roleSchema.js";

const rolePermissionSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: roleSchema,
      key: "id",
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
};

//RolePermission.belongsTo(Role);

export default rolePermissionSchema;
