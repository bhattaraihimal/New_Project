import { HttpStatus } from "../config/httpStatusCodes.js";
import { userProductStatusService, rolePermissionService, roleService } from "../services/index.js";

export const viewAllUserProductStatus = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'productStatus_viewAll' });
    if (!hasPermission) {
        return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view all user product status' });
    }

    // Fetch and return all products
    const userProductStatuss = await userProductStatusService.getAllUserProductStatusService();
    res.json({ userProductStatuss });
} catch (error) {
    console.error('Error viewing user product status:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
}
};

export const viewUserProductStatus = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;

     
      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'productStatus_view' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view this user product status' });
      }

      // Find user product status by id
      const userProductStatus = await userProductStatusService.getUserProductStatusByIdService(id);
      if (!userProductStatus) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'User Product Status not found' });
      }

      res.json({ userProductStatus });
  } catch (error) {
      console.error('Error viewing user product status:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
      
  }
};

export const deleteUserProductStatus = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;

   
      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'productStatus_delete' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete this user product status' });
      }

      // Find user product status by id
      const userProductStatus = await userProductStatusService.getUserProductStatusByIdService(id);
      if (!userProductStatus) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'User Product Status not found' });
      }

      // Delete user product status
      await userProductStatusService.deleteUserProductStatusByIdService(id);

      res.json({ message: 'User Product Status deleted successfully' });
  } catch (error) {
      console.error('Error deleting user product status:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const deleteAllUserProductStatus = async (req, res) => {
    const role_id =  res.locals.role_id

  try {
      
      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'productStatus_deleteAll' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete all user product status' });
      }

      // Find all user product status and delete them
      const userProductStatuss = await userProductStatusService.getAllUserProductStatusService();
      for (const userProductStatus of userProductStatuss) {
          await userProductStatusService.deleteUserProductStatusByIdService(userProductStatus.id);
      }

      res.json({ message: 'All user product status deleted successfully' });
  } catch (error) {
      console.error('Error deleting all user product status:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};
  
