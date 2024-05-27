import { DataTypes } from "sequelize";
// import { User } from "../model.js";
import userSchema from "./userSchema.js";

const noticeSchema = {
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
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: userSchema,
      key: "id",
    },
  },
};

//Notice.belongsTo(User);

export default noticeSchema;
