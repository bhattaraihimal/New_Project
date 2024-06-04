import { Product } from "../models/model.js";

export const createProductService = async (body) => {
  return Product.create(body);
};

export const updateProductService = async (id, body) => {
  return Product.update(body, { where: { id: id } });
};

export const getAllProductService = async () => {
  return Product.findAll({});
};

export const getProductByIdService = async (id) => {
  return Product.findOne({
    where: { id: id }
      });
};

export const deleteProductByIdService = async (id) => {
    return Product.destroy({
      where: { id: id }
    });
  };

export const deleteAllProductService = async () => {
    return Product.destroy({
      where: {},
      truncate: true
    });
  };
