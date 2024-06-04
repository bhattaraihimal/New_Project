import { HttpStatus } from "../config/httpStatusCodes.js";
import { Product } from "../models/model.js";
import { productService, rolePermissionService, roleService } from "../services/index.js";

export const createProduct = async (req, res, next) => {
    const role_id =  res.locals.role_id
  const user_id = res.locals.user_id

  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
    }
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'product_create' });

    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to create a product' });
    }

    const product = await productService.createProductService({ title, description, price });
    res.json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const viewAllProducts = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'product_viewAll' });
    if (!hasPermission) {
        return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view all products' });
    }

    // Fetch and return all products
    const products = await productService.getAllProductService();
    res.json({ products });
} catch (error) {
    console.error('Error viewing products:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
}
};

export const viewProduct = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;

     
      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'product_view' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view this product' });
      }

      // Find product by id
      const product = await productService.getProductByIdService(id);
      if (!product) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Product not found' });
      }

      res.json({ product });
  } catch (error) {
      console.error('Error viewing product:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const updateProduct = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;
      const { title, description, price } = req.body;

      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'product_update' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to update this product' });
      }

      // Find product by id
      const product = await productService.getProductByIdService(id);
      if (!product) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Product not found' });
      }

      // Prepare data to send for updating
      const dataToUpdate = { title, description, price };

      // Update product using updateProductService
      let response = await productService.updateProductService(id, dataToUpdate);

      // Check response and send appropriate message
      if (response[0] > 0) { 
          res.status(HttpStatus.SUCCESS_200).json({ message: 'Product updated successfully' });
      } else {
          res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
      }
  } catch (error) {
      console.error('Error updating product:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;

   
      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'product_delete' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete this product' });
      }

      // Find product by id
      const product = await productService.getProductByIdService(id);
      if (!product) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Product not found' });
      }

      // Delete product
      await productService.deleteProductByIdService(id);

      res.json({ message: 'Product deleted successfully' });
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const deleteAllProducts = async (req, res) => {
    const role_id =  res.locals.role_id

  try {
      
      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'product_deleteAll' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete all products' });
      }

      // Find all products and delete them
      const products = await productService.getAllProductService();
      for (const product of products) {
          await productService.deleteProductByIdService(product.id);
      }

      res.json({ message: 'All products deleted successfully' });
  } catch (error) {
      console.error('Error deleting all products:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};
  


