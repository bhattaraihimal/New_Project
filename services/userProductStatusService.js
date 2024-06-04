import { UserProductStatus } from "../models/model.js";

export const createUserProductStatusService = async (body) => {
  return UserProductStatus.create(body);
};

export const updateUserProductStatusService = async (id, body) => {
  return UserProductStatus.update(body, { where: { id: id } });
};

export const getAllUserProductStatusService = async () => {
  return UserProductStatus.findAll({});
};

export const getUserProductStatusByIdService = async (id) => {
  return UserProductStatus.findOne({
    where: { id: id }
      });
};

export const deleteUserProductStatusByIdService = async (id) => {
    return UserProductStatus.destroy({
      where: { id: id }
    });
  };

export const deleteAllUserProductStatusService = async () => {
    return UserProductStatus.destroy({
      where: {},
      truncate: true
    });
  };

export const getUserProductStatusByProductAndUserIdService = async ({ product_id, user_id }) => {
    try {
      const userProductStatus = await UserProductStatus.findOne({
        where: {
          product_id,
          user_id
        }
      });
  
      return userProductStatus;
    } catch (error) {
      console.error('Error fetching User Product Status by product_id and user_id:', error);
      throw new Error('Database query failed');
    }
  };
