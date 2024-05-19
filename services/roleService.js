import { Role } from "../models/model.js";

export const createRoleService = async (body) => {
  return Role.create(body);
};

export const updateRoleService = async (id, body) => {
  return Role.update(body, { where: { id: id } });
};

export const getAllRoleService = async () => {
  return Role.findAll({});
};

export const getRoleByIdService = async (id) => {
  return Role.findOne({
    where: { id: id }
      });
};

export const deleteRoleByIdService = async (id) => {
    return Role.destroy({
      where: { id: id }
    });
  };

export const deleteAllRolesService = async () => {
    return Role.destroy({
      where: {},
      truncate: true
    });
  };
