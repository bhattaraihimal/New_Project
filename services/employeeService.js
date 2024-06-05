import { Employee } from "../models/model.js";

export const createEmployeeService = async (body) => {
  return Employee.create(body);
};

export const updateEmployeeService = async (id, body) => {
  return Employee.update(body, { where: { id: id } });
};

export const getAllEmployeeService = async () => {
  return Employee.findAll({});
};

export const getEmployeeByIdService = async (id) => {
  return Employee.findOne({
    where: { id: id }
      });
};

export const deleteEmployeeByIdService = async (id) => {
    return Employee.destroy({
      where: { id: id }
    });
  };

export const deleteAllEmployeeService = async () => {
    return Employee.destroy({
      where: {},
      truncate: true
    });
  };

export const getEmployeeByUserIdService = async (user_id) => {
    return Employee.findAll({
      where: { user_id: user_id }
    });
  };
