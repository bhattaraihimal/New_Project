import { Information } from "../models/model.js";

export const createInformationService = async (body) => {
  return Information.create(body);
};

export const updateInformationService = async (id, body) => {
  return Information.update(body, { where: { id: id } });
};

export const getAllInformationService = async () => {
  return Information.findAll({});
};

export const getInformationByIdService = async (id) => {
  return Information.findOne({
    where: { id: id }
      });
};

export const deleteInformationByIdService = async (id) => {
    return Information.destroy({
      where: { id: id }
    });
  };

export const deleteAllInformationService = async () => {
    return Information.destroy({
      where: {},
      truncate: true
    });
  };

export const getInformationsByUserIdService = async (user_id) => {
    return Information.findAll({
      where: { user_id: user_id }
    });
  };

