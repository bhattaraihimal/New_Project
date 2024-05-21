import { HttpStatus } from "../config/httpStatusCodes.js";
import { rolePermissionService } from "../services/index.js";

export const createRolePermission = async (req, res, next) => {
    try {
      const { role_id, notice, ads, information, employee  } = req.body;
  
      // Check if required fields are provided
      if (!role_id || !notice || !ads || !information || !employee) {
        return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
      }
  
      // Create new rolePermission
      const rolePermission = await rolePermissionService.createRolePermissionService({ role_id, notice, ads, information, employee });
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
      res.status(HttpStatus.OK).json({ data: rolePermissions });

    } catch (error) {
      console.error('Error viewing role permissions:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewRolePermission = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find role permission by id
      const rolePermission = await rolePermissionService.getRolePermissionByIdService(id);
      if (!rolePermission) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role Permission not found' });
      }
  
    //  res.json({ rolePermission });
      res.status(HttpStatus.OK).json({ data: rolePermission });

    } catch (error) {
      console.error('Error viewing role permission:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

// export const updateRolePermission = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { notice, ads, information, employee } = req.body;
  
//       // Find role permission by id
//       const rolePermission = await rolePermissionService.getRolePermissionByIdService(id);
//       if (!rolePermission) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role Permission not found' });
//       }
  
//       // Update role permission
//       rolePermission.notice = notice;
//       rolePermission.ads = ads;
//       rolePermission.information = information;
//       rolePermission.employee = employee;
//       await rolePermission.save();
  
//       res.json({ message: 'Role Permission updated successfully'});
//     } catch (error) {
//       console.error('Error updating role permission:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };
export const updateRolePermission = async (req, res, next) => {
  try {
      const { id } = req.params;
      const { notice, ads, information, employee } = req.body;

      // Find role permission by id
      const rolePermission = await rolePermissionService.getRolePermissionByIdService(id);
      if (!rolePermission) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role Permission not found' });
      }

      // Prepare data to send for updating
      const dataToUpdate = { notice, ads, information, employee };

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
      const rolePermission = await rolePermissionService.getRolePermissionByIdService(id);
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

// export const deleteAllRolePermission = async (req, res) => {
//     try {
//       // Find all role permissions and delete them
//       const rolePermissions = await rolePermissionService.getAllRolePermissionService();
//       for (const rolePermission of rolePermissions) {
//         await rolePermissionService.deleteAllRolePermissionsService();
//       }
  
//       res.json({ message: 'All Role Permissions deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting all role permissions:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };


