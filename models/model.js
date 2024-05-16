import { sequelize } from "../utils/database.js";

import roleSchema from "./schema/roleSchema.js";
import userSchema from "./schema/userSchema.js";
import adsSchema from "./schema/adsSchema.js";
import employeeSchema from "./schema/employeeSchema.js";
import informationSchema from "./schema/informationSchema.js";
import noticeSchema from "./schema/noticeSchema.js";
import rolepermissonSchema from "./schema/rolepermissonSchema.js";

const Role = sequelize.define("role", roleSchema);
const User = sequelize.define("user", userSchema);
const Ads = sequelize.define("ads", adsSchema);
const Employee = sequelize.define("employee", employeeSchema);
const Information = sequelize.define("information", informationSchema);
const Notice = sequelize.define("notice", noticeSchema);
const RolePermission = sequelize.define("rolePermission", rolepermissonSchema);

User.hasMany(Notice, { foreignKey: "userId" });
Notice.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Ads, { foreignKey: "userId" });
Ads.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Employee, { foreignKey: "userId" });
Employee.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Information, { foreignKey: "userId" });
Information.belongsTo(User, { foreignKey: "userId" });

User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

Role.hasMany(RolePermission, { foreignKey: "roleId" });
RolePermission.belongsTo(Role, { foreignKey: "roleId" });

export { Role, User, Ads, Employee, Information, Notice, RolePermission };








 



