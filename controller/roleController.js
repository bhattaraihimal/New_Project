import { HttpStatus } from "../config/httpStatusCodes.js";
import { roleService } from "../services/index.js";

export const createRole = async (req, res, next) => {
    try {
      const { title } = req.body;
  
      // Check if required fields are provided
      if (!title) {
        return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
      }
  
      // Create new role
      const role = await roleService.createRoleService({ title });
      res.json({ message: 'Role created successfully'});
    } catch (error) {
      console.error('Error creating role:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewAllRole = async (req, res, next) => {
    try {
      const roles = await roleService.getAllRoleService();
      res.json({ roles });
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
  
      res.json({ role });
    } catch (error) {
      console.error('Error viewing role:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const updateRole = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
  
      // Find role by id
      const role = await roleService.getRoleByIdService(id);
      if (!role) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Role not found' });
      }
  
      // Update role
      role.title = title;
      await role.save();
  
      res.json({ message: 'Role updated successfully'});
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

export const deleteAllRole = async (req, res) => {
    try {
      // Find all role and delete them
      const roles = await roleService.getAllRoleService();
      for (const role of roles) {
        await roleService.deleteAllRolesService();
      }
  
      res.json({ message: 'All Roles deleted successfully' });
    } catch (error) {
      console.error('Error deleting all roles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


