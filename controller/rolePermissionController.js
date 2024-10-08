import { HttpStatus } from "../config/httpStatusCodes.js";
import { rolePermissionService } from "../services/index.js";

export const createRolePermission = async (req, res, next) => {
    try {
      const { role_id, notice, ads, information, employee, product_create, product_viewAll, product_view, product_update, product_delete, product_deleteAll, order_create, order_viewAll, order_view, order_update, order_delete, order_deleteAll, productStatus_viewAll, productStatus_view, productStatus_delete, productStatus_deleteAll  } = req.body;
  
    
      // Create new rolePermission
      const rolePermission = await rolePermissionService.createRolePermissionService({ role_id, notice, ads, information, employee, product_create, product_viewAll, product_view, product_update, product_delete, product_deleteAll, order_create, order_viewAll, order_view, order_update, order_delete, order_deleteAll, productStatus_viewAll, productStatus_view, productStatus_delete, productStatus_deleteAll });
      res.json({ message: 'Role Permission created successfully'});
    } catch (error) {
      console.error('Error creating role permission:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewAllRolePermissions = async (req, res, next) => {
    try {
      const rolePermissions = await rolePermissionService.getAllRolePermissionService();
     // res.json({ rolePermissions });
      res.status(HttpStatus.SUCCESS_200).json({ data: rolePermissions });

    } catch (error) {
      console.error('Error viewing role permissions:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewRolePermission = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find role permission by id
      const rolePermission = await rolePermissionService.getRolePermissionByIdServiceonly(id);
      if (!rolePermission) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role Permission not found' });
      }
  
    //  res.json({ rolePermission });
      res.status(HttpStatus.SUCCESS_200).json({ data: rolePermission });

    } catch (error) {
      console.error('Error viewing role permission:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };


export const updateRolePermission = async (req, res, next) => {
  try {
      const { id } = req.params;
      const { notice, ads, information, employee, product_create, product_viewAll, product_view, product_update, product_delete, product_deleteAll, order_create, order_viewAll, order_view, order_update, order_delete, order_deleteAll, productStatus_viewAll, productStatus_view, productStatus_delete, productStatus_deleteAll } = req.body;

      // Find role permission by id
      const rolePermission = await rolePermissionService.getRolePermissionByIdServiceonly(id);
      if (!rolePermission) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role Permission not found' });
      }

      // Prepare data to send for updating
      const dataToUpdate = { notice, ads, information, employee, product_create, product_viewAll, product_view, product_update, product_delete, product_deleteAll, order_create, order_viewAll, order_view, order_update, order_delete, order_deleteAll, productStatus_viewAll, productStatus_view, productStatus_delete, productStatus_deleteAll };

      // Update role permission using updateRolePermissionService
      let response = await rolePermissionService.updateRolePermissionService(id, dataToUpdate);

      // Check response and send appropriate message
      if (response[0] > 0) { 
          res.status(HttpStatus.SUCCESS_200).json({ message: 'Role Permission updated successfully' });
      } else {
          res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
      }
  } catch (error) {
      console.error('Error updating role permission:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const deleteRolePermission = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find role permission by id
      const rolePermission = await rolePermissionService.getRolePermissionByIdServiceonly(id);
      if (!rolePermission) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role Permission not found' });
      }
  
      // Delete role permission
      await rolePermissionService.deleteRolePermissionByIdService(id);
  
      res.json({ message: 'Role Permission deleted successfully' });
    } catch (error) {
      console.error('Error deleting role permission:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

