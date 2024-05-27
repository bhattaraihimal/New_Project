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

export const deleteUserByIdService = async (id) => {
  return User.destroy({
    where: { id: id }
  });
};

export const deactivateUserByIdService = async (id) => {
  return User.update(
    { active: false },  
    { where: { id: id } }  
  );
};

export const getUserByIdAndEmailService = async (id, email) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
        email: email
      }
    });
    return user;
  } catch (error) {
    throw new Error(`Error in getUserByIdAndEmailService: ${error.message}`);
  }
};

export const getUserByAttributes = async (attributes) => {
  try {
    const user = await User.findOne({ where: attributes });
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user by attributes.");
  }
};
