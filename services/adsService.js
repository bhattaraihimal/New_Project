import { Ads } from "../models/model.js";

export const createAdService = async (body) => {
  return Ads.create(body);
};

export const updateAdService = async (id, body) => {
  return Ads.update(body, { where: { id: id } });
};

export const getAllAdsService = async () => {
  return Ads.findAll({});
};

export const getAdByIdService = async (id) => {
  return Ads.findOne({
    where: { id: id }
      });
};

export const deleteAdByIdService = async (id) => {
    return Ads.destroy({
      where: { id: id }
    });
  };

export const deleteAllAdsService = async () => {
    return Ads.destroy({
      where: {},
      truncate: true
    });
  };

export const getAdsByUserIdService = async (user_id) => {
    return Ads.findAll({
      where: { user_id: user_id }
    });
  };

