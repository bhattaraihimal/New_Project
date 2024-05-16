import { Role, User } from "../models/model.js";

export const createUserService = async (body) => {
  return User.create(body);
};

export const updateUserService = async (id, body) => {
  return User.update(body, { where: { id: id } });
};

export const getAllUserService = async () => {
  return User.findAll({});
};

export const getUserByIdService = async (id) => {
  return User.findOne({
    where: { id: id },
    include: [
      {
        model: Role,
        attributes: { exclude: ["description", "createdAt", "updatedAt"] },
      },
    ],
    // attributes: { exclude: ["password"] },
  });
};

export const getUserByContactNumberService = async (contactNumber) => {
  return User.findOne({ where: { contactNumber: contactNumber } });
};

export const getUserByEmailService = async (email) => {
  return User.findOne({ where: { email: email } });
};
