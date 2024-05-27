import { Notice } from "../models/model.js";

export const createNoticeService = async (body) => {
  return Notice.create(body);
};

export const updateNoticeService = async (id, body) => {
  return Notice.update(body, { where: { id: id } });
};

export const getAllNoticeService = async () => {
  return Notice.findAll({});
};

export const getNoticeByIdService = async (id) => {
  return Notice.findOne({
    where: { id: id }
      });
};

export const deleteNoticeByIdService = async (id) => {
    return Notice.destroy({
      where: { id: id }
    });
  };

export const deleteAllNoticeService = async () => {
    return Notice.destroy({
      where: {},
      truncate: true
    });
  };
