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

export const getRolePermissionByIdServiceonly = async (id) => {
  return RolePermission.findOne({
    where: { id: id }
      });
};

export const deleteRolePermissionByIdService = async (id) => {
    return RolePermission.destroy({
      where: { id: id }
    });
  };

  export const getRolePermissionByIdService = async ({ role_id, requiredPermission }) => {
    try {
      // Query the role permissions based on role_id and required permission
      const rolePermission = await RolePermission.findOne({
        where: {
          role_id,
          [requiredPermission]: true,
        },
      });
  
      // Return true if the permission is found, otherwise false
      return rolePermission !== null;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error fetching role permissions:', error);
  
      // Throw a new error with a clear message
      throw new Error('Failed to fetch role permissions.');
    }
  };

// export const deleteAllRolePermissionsService = async () => {
//     return RolePermission.destroy({
//       where: {},
//       truncate: true
//     });
//   };
