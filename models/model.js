import { sequelize } from "../utils/database.js";

import roleSchema from "./schema/roleSchema.js";
import userSchema from "./schema/userSchema.js";
import adsSchema from "./schema/adsSchema.js";
import employeeSchema from "./schema/employeeSchema.js";
import informationSchema from "./schema/informationSchema.js";
import noticeSchema from "./schema/noticeSchema.js";
import rolepermissonSchema from "./schema/rolepermissonSchema.js";

export const Role = sequelize.define("role", roleSchema);
export const User = sequelize.define("user", userSchema);
export const Ads = sequelize.define("ads", adsSchema);
export const Employee = sequelize.define("employee", employeeSchema);
export const Information = sequelize.define("information", informationSchema);
export const Notice = sequelize.define("notice", noticeSchema);
export const RolePermission = sequelize.define(
  "rolePermission",
  rolepermissonSchema
);

User.hasMany(Notice, { foreignKey: "user_id" });
Notice.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Ads, { foreignKey: "user_id" });
Ads.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Employee, { foreignKey: "user_id" });
Employee.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Information, { foreignKey: "user_id" });
Information.belongsTo(User, { foreignKey: "user_id" });

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

Role.hasMany(RolePermission, { foreignKey: "role_id" });
RolePermission.belongsTo(Role, { foreignKey: "role_id" });

// export { Role, User, Ads, Employee, Information, Notice, RolePermission };
