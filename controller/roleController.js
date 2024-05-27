import { HttpStatus } from "../config/httpStatusCodes.js";
import { rolePermissionService, roleService } from "../services/index.js";

// export const createRole = async (req, res, next) => {
//     try {
//       const { title } = req.body;
  
//       // Check if required fields are provided
//       if (!title) {
//         return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
//       }
  
//       // Create new role
//       const role = await roleService.createRoleService({ title });
//       res.json({ message: 'Role created successfully'});
//     } catch (error) {
//       console.error('Error creating role:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

// export const createRole = async (req, res, next) => {
//   try {
//     const { title } = req.body;

//     // Check if required fields are provided
//     if (!title) {
//       return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
//     }

//     // Create new role
//     const role = await roleService.createRoleService({ title });

//     // Check if role creation was successful
//     if (!role) {
//       return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Failed to create role' });
//     }

//     res.json({ message: 'Role created successfully', role });
//   } catch (error) {
//     console.error('Error creating role:', error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//   }
// };


export const createRole = async (req, res, next) => {
  
  try {
    const { title, notice, ads, information, employee } = req.body;

    // Check if required fields are provided
    if (!title || !notice || !ads || !information || !employee) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
    }

    // Create new role
    const role = await roleService.createRoleService({ title });

    // Check if role creation was successful
    if (!role) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Failed to create role' });
    }

    // Create role permission
    const rolePermission = await rolePermissionService.createRolePermissionService({
      role_id: role.id,
      notice,
      ads,
      information,
      employee
    });

    // Check if role permission creation was successful
    if (!rolePermission) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Failed to create role permission' });
    }

    res.status(HttpStatus.SUCCESS_200).json({ message: 'Role and Role Permission created successfully'});
  } catch (error) {
    console.error('Error creating role and role permission:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const viewAllRole = async (req, res, next) => {
    try {
      const roles = await roleService.getAllRoleService();
      res.status(HttpStatus.SUCCESS_200).json({ roles });
    } catch (error) {
      console.error('Error viewing roles:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewRole = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find role by id
      const role = await roleService.getRoleByIdService(id);
      if (!role) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role not found' });
      }
  
    res.status(HttpStatus.SUCCESS_200).json({ role });
    } catch (error) {
      console.error('Error viewing role:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

// export const updateRole = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { title } = req.body;
  
//       // Find role by id
//       const role = await roleService.getRoleByIdService(id);
//       if (!role) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role not found' });
//       }
  
//       // Update role
//       role.title = title;
//       await role.save();
  
//       res.json({ message: 'Role updated successfully'});
//     } catch (error) {
//       console.error('Error updating role:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const updateRole = async (req, res, next) => {
  try {
      const { id } = req.params;
      const { title } = req.body;

      // Find role by id
      const role = await roleService.getRoleByIdService(id);
      if (!role) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role not found' });
      }

      // Prepare data to send for updating
      const dataToUpdate = { title };

      // Update role using updateRoleService
      let response = await roleService.updateRoleService(id, dataToUpdate);

      // Check response and send appropriate message
      if (response[0] > 0) { 
          res.status(HttpStatus.SUCCESS_200).json({ message: 'Role updated successfully' });
      } else {
          res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
      }
  } catch (error) {
      console.error('Error updating role:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const deleteRole = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find role by id
      const role = await roleService.getRoleByIdService(id);
      if (!role) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role not found' });
      }
  
      // Delete role
      await roleService.deleteRoleByIdService(id);
  
      res.json({ message: 'Role deleted successfully' });
    } catch (error) {
      console.error('Error deleting role:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

// export const deleteAllRole = async (req, res) => {
//     try {
//       // Find all role and delete them
//       const roles = await roleService.getAllRoleService();
//       for (const role of roles) {
//         await roleService.deleteAllRolesService();
//       }
  
//       res.json({ message: 'All Roles deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting all roles:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };


