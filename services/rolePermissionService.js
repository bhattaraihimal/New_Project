import { RolePermission } from "../models/model.js";

export const createRolePermissionService = async (body) => {
  return RolePermission.create(body);
};

export const updateRolePermissionService = async (id, body) => {
  return RolePermission.update(body, { where: { id: id } });
};

export const getAllRolePermissionService = async () => {
  return RolePermission.findAll({});
};

export const getRolePermissionByIdService = async (id) => {
  return RolePermission.findOne({
    where: { id: id }
      });
};

export const deleteRolePermissionByIdService = async (id) => {
    return RolePermission.destroy({
      where: { id: id }
    });
  };

export const deleteAllRolePermissionsService = async () => {
    return RolePermission.destroy({
      where: {},
      truncate: true
    });
  };
