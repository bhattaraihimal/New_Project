import { Order } from "../models/model.js";

export const createOrderService = async (body) => {
  return Order.create(body);
};

export const updateOrderService = async (id, body) => {
  return Order.update(body, { where: { id: id } });
};

export const getAllOrderService = async () => {
  return Order.findAll({});
};

export const getOrderByIdService = async (id) => {
  return Order.findOne({
    where: { id: id }
      });
};

export const deleteOrderByIdService = async (id) => {
    return Order.destroy({
      where: { id: id }
    });
  };

export const deleteAllOrderService = async () => {
    return Order.destroy({
      where: {},
      truncate: true
    });
  };
