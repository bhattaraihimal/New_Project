import { HttpStatus } from "../config/httpStatusCodes.js";
import { informationService, rolePermissionService, roleService } from "../services/index.js";

export const createInformation = async (req, res, next) => {
  const role_id =  res.locals.role_id
  const user_id = res.locals.user_id

  try {
    const { title, description, post, type, content } = req.body;

    // Check if required fields are provided
    if (!title || !description || !post || !type || !content) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
    }

    

    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'information' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to create information' });
    }

    // Create new information
    const information = await informationService.createInformationService({ title, description, post, type, content, user_id: user_id });
    res.json({ message: 'Information created successfully', information });
  } catch (error) {
    console.error('Error creating information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};



export const viewAllInformation = async (req, res, next) => {
  const role_id =  res.locals.role_id

  try {
    
    
    const informations = await informationService.getAllInformationService();
    res.json({ informations });
  } catch (error) {
    console.error('Error viewing information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};



export const viewInformation = async (req, res, next) => {
  const role_id =  res.locals.role_id

  try {
    const { id } = req.params;

    
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'information' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view information' });
    }

    // Find information by id
    const information = await informationService.getInformationByIdService(id);
    if (!information) {
      return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Information not found' });
    }

    res.json({ information });
  } catch (error) {
    console.error('Error viewing information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const viewUserInformations = async (req, res, next) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id; 

  try {
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view notices' });
    }

    // Fetch and return all informations created by the current user
    const informations = await informationService.getInformationsByUserIdService(user_id);
    res.json({ informations });
  } catch (error) {
    console.error('Error viewing user informations:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const updateInformation = async (req, res, next) => {
  const role_id =  res.locals.role_id
  const user_id = res.locals.user_id;


  try {
    const { id } = req.params;
    const { title, description, post, type, content } = req.body;

    
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'information' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to update information' });
    }

    // Find information by id
    const information = await informationService.getInformationByIdService(id);
    if (!information) {
      return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Information not found' });
    }

    // Check if the user is a 'Super Admin' or if the information was created by the current user
    const userRole = await roleService.getRoleByIdService(role_id);
    if (userRole.title !== 'Super Admin' && information.user_id !== user_id) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'Why are you trying to update others information ??  You can not do that !!!' });
    }


    // Prepare data to send for updating
    const dataToUpdate = { title, description, post, type, content };

    // Update information using updateInformationService
    let response = await informationService.updateInformationService(id, dataToUpdate);

    // Check response and send appropriate message
    if (response[0] > 0) {
      res.status(HttpStatus.SUCCESS_200).json({ message: 'Information updated successfully' });
    } else {
      res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
    }
  } catch (error) {
    console.error('Error updating information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};


export const deleteInformation = async (req, res, next) => {
  const role_id =  res.locals.role_id
  const user_id = res.locals.user_id;


  try {
    const { id } = req.params;

    

    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'information' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete information' });
    }

    // Find information by id
    const information = await informationService.getInformationByIdService(id);
    if (!information) {
      return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Information not found' });
    }

     // Check if the user is a 'Super Admin' or if the information was created by the current user
     const userRole = await roleService.getRoleByIdService(role_id);
     if (userRole.title!== 'Super Admin' && information.user_id!== user_id) {
       return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'Why are you trying to delete others information. You can only delete information that you have created !!!' });
     }
 

    // Delete information
    await informationService.deleteInformationByIdService(id);

    res.json({ message: 'Information deleted successfully' });
  } catch (error) {
    console.error('Error deleting information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};


export const deleteAllInformation = async (req, res) => {
  const role_id =  res.locals.role_id
  const user_id = res.locals.user_id;


  try {
   

    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'information' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete all information' });
    }

    // Find all information and delete them
    const informations = await informationService.getAllInformationService();
    for (const information of informations) {
      const userRole = await roleService.getRoleByIdService(role_id);
        if (userRole.title !== 'Super Admin' && information.user_id !== user_id) {
          continue;
        }

      await informationService.deleteInformationByIdService(information.id);
    }

    res.json({ message: 'All information deleted successfully' });
  } catch (error) {
    console.error('Error deleting all information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

