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
  // product: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  // },
  product_create: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  product_viewAll: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  product_view: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  product_update: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  product_delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  product_deleteAll: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  // order: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  // },

  order_create: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  order_viewAll: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  order_view: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  order_update: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  order_delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  order_deleteAll: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  productStatus_viewAll: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  productStatus_view: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  productStatus_delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  productStatus_deleteAll: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  
  
  
  
};

//RolePermission.belongsTo(Role);

export default rolePermissionSchema;
