import { DataTypes } from "sequelize";
import { User } from "../model.js";

const informationSchema = {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  post: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, 
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

//Information.belongsTo(User);

export default informationSchema;