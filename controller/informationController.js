import { HttpStatus } from "../config/httpStatusCodes.js";
import { informationService, rolePermissionService } from "../services/index.js";
import { verifyToken } from "../utils/tokenController.js";

// export const createInformation = async (req, res, next) => {
//     try {
//       const { title, description, post, type, content, user_id } = req.body;
  
//       // Check if required fields are provided
//       if (!title || !description || !post || !type || !content || !user_id) {
//         return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
//       }
  
//       // Create new information
//       const information = await informationService.createInformationService({ title, description, post, type, content, user_id });
//       res.json({ message: 'Information created successfully'});
//     } catch (error) {
//       console.error('Error creating information:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const createInformation = async (req, res, next) => {
  try {
    const { title, description, post, type, content } = req.body;

    // Check if required fields are provided
    if (!title || !description || !post || !type || !content) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
    }

    // Extract the token from the 'Auth' header
    const authHeader = req.header('Auth');
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    }
    const token = authHeader;

    // Verify the token
    const verificationResult = await verifyToken(token);
    if (verificationResult.error) {
      return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    }

    const { role_id, user_id } = verificationResult;

    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'information' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to create information' });
    }

    // Create new information
    const information = await informationService.createInformationService({ title, description, post, type, content, user_id });
    res.json({ message: 'Information created successfully', information });
  } catch (error) {
    console.error('Error creating information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

// export const viewAllInformation = async (req, res, next) => {
//     try {
//       const informations = await informationService.getAllInformationService();
//       res.json({ informations });
//     } catch (error) {
//       console.error('Error viewing informations:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const viewAllInformation = async (req, res, next) => {
  try {
    // Extract the token from the 'Auth' header
    const authHeader = req.header('Auth');
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    }
    const token = authHeader;

    // Verify the token
    const verificationResult = await verifyToken(token);
    if (verificationResult.error) {
      return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    }

    const { role_id } = verificationResult;

    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'information' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view all information' });
    }

    const informations = await informationService.getAllInformationService();
    res.json({ informations });
  } catch (error) {
    console.error('Error viewing information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

// export const viewInformation = async (req, res, next) => {
//     try {
//       const { id } = req.params;
  
//       // Find ad by id
//       const information = await informationService.getInformationByIdService(id);
//       if (!information) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Information not found' });
//       }
  
//       res.json({ information });
//     } catch (error) {
//       console.error('Error viewing information:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const viewInformation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Extract the token from the 'Auth' header
    const authHeader = req.header('Auth');
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    }
    const token = authHeader;

    // Verify the token
    const verificationResult = await verifyToken(token);
    if (verificationResult.error) {
      return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    }

    const { role_id } = verificationResult;

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

// export const updateInformation = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { title, description, post, type, content } = req.body;
  
//       // Find information by id
//       const information = await informationService.getInformationByIdService(id);
//       if (!information) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Information not found' });
//       }
  
//       // Update information
//       information.title = title;
//       information.description = description;
//       information.post = post;
//       information.type = type;
//       information.content = content;
//       await information.save();
  
//       res.json({ message: 'Information updated successfully'});
//     } catch (error) {
//       console.error('Error updating information:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

// export const updateInformation = async (req, res, next) => {
//   try {
//       const { id } = req.params;
//       const { title, description, post, type, content } = req.body;

//       // Find information by id
//       const information = await informationService.getInformationByIdService(id);
//       if (!information) {
//           return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Information not found' });
//       }

//       // Prepare data to send for updating
//       const dataToUpdate = { title, description, post, type, content };

//       // Update information using updateInformationService
//       let response = await informationService.updateInformationService(id, dataToUpdate);

//       // Check response and send appropriate message
//       if (response[0] > 0) { 
//           res.status(HttpStatus.SUCCESS_200).json({ message: 'Information updated successfully' });
//       } else {
//           res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
//       }
//   } catch (error) {
//       console.error('Error updating information:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//   }
// };

export const updateInformation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, post, type, content } = req.body;

    // Extract the token from the 'Auth' header
    const authHeader = req.header('Auth');
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    }
    const token = authHeader;

    // Verify the token
    const verificationResult = await verifyToken(token);
    if (verificationResult.error) {
      return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    }

    const { role_id } = verificationResult;

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
// export const deleteInformation = async (req, res, next) => {
//     try {
//       const { id } = req.params;
  
//       // Find information by id
//       const information = await informationService.getInformationByIdService(id);
//       if (!information) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Information not found' });
//       }
  
//       // Delete information
//       await informationService.deleteInformationByIdService(id);
  
//       res.json({ message: 'Information deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting information:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const deleteInformation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Extract the token from the 'Auth' header
    const authHeader = req.header('Auth');
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    }
    const token = authHeader;

    // Verify the token
    const verificationResult = await verifyToken(token);
    if (verificationResult.error) {
      return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    }

    const { role_id } = verificationResult;

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

    // Delete information
    await informationService.deleteInformationByIdService(id);

    res.json({ message: 'Information deleted successfully' });
  } catch (error) {
    console.error('Error deleting information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

// export const deleteAllInformation = async (req, res) => {
//     try {
//       // Find all information and delete them
//       const informations = await informationService.getAllInformationService();
//       for (const information of informations) {
//         await informationService.deleteAllInformationService();
//       }
  
//       res.json({ message: 'All Informations deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting all informations:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };

export const deleteAllInformation = async (req, res) => {
  try {
    // Extract the token from the 'Auth' header
    const authHeader = req.header('Auth');
    if (!authHeader) {
      return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    }
    const token = authHeader;

    // Verify the token
    const verificationResult = await verifyToken(token);
    if (verificationResult.error) {
      return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    }

    const { role_id } = verificationResult;

    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'information' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete all information' });
    }

    // Find all information and delete them
    const informations = await informationService.getAllInformationService();
    for (const information of informations) {
      await informationService.deleteInformationByIdService(information.id);
    }

    res.json({ message: 'All information deleted successfully' });
  } catch (error) {
    console.error('Error deleting all information:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

