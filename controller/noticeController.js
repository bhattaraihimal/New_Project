import { HttpStatus } from "../config/httpStatusCodes.js";
import { noticeService, rolePermissionService, roleService } from "../services/index.js";
import { verifyToken } from "../utils/tokenController.js";
import { RolePermission } from "../models/model.js";

// export const createNotice = async (req, res, next) => {
//     try {
//       const { title, user_id } = req.body;
  
//       // Check if required fields are provided
//       if (!title || !user_id) {
//         return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
//       }
  
//       // Create new notice
//       const notice = await noticeService.createNoticeService({ title, user_id });
//       res.json({ message: 'Notice created successfully'});
//     } catch (error) {
//       console.error('Error creating notice:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

// export const createNotice = async (req, res, next) => {
//   try {
//     const token = req.header('Auth');
//     const decoded = await verifyToken(token);
//     const role_id = decoded.role_id;

//     const hasPermission = await rolePermissionService.getRolePermissionByIdService({
//       role: role_id,
//       [rolePermission.notice]: true,
//     });

//     if (!hasPermission) {
//       return res.status(HttpStatus.FORBIDDEN_403).send({
//         message: 'You do not have permission to create a notice.'
//       });
//     }

//     const { title, user_id } = req.body;

//     // Check if required fields are provided
//     if (!title || !user_id) {
//       return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
//     }

//     // Create new notice
//     const notice = await noticeService.createNoticeService({ title, user_id });
//     res.json({ message: 'Notice created successfully'});
//   } catch (error) {
//     console.error('Error creating notice:', error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//   }
// };

// export const createNotice = async (req, res, next) => {
//   try {
//     const { title, user_id } = req.body;

//     // Check if required fields are provided
//     if (!title || !user_id) {
//       return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
//     }

//     // Verify token and extract user information
//     const token = req.header('Auth');
//     if (!token) {
//       return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
//     }
//     const decoded = await verifyToken(token);

//     const role_id = decoded.role_id;

//     // Check if the user has the required permission
//     const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id });

//     if (!hasPermission) {
//       return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to create a notice' });
//     }

//     // Proceed with creating the notice
//     const notice = await noticeService.createNoticeService({ title, user_id });
//     res.json({ message: 'Notice created successfully' });
//   } catch (error) {
//     console.error('Error creating notice:', error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//   }
// };

// export const createNotice = async (req, res, next) => {
//   try {
//     const { title, user_id } = req.body;

//     if (!title || !user_id) {
//       return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
//     }

//     const authHeader = req.header('Auth');
//     if (!authHeader) {
//       return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
//     }

//     const token = authHeader.split(' ')[1];  // Extract the token
//     if (!token) {
//       return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Invalid token format' });
//     }

//     const verificationResult = await verifyToken(token);

//     if (verificationResult.error) {
//       return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
//     }

//     const { role_id, user_id: tokenUserId } = verificationResult;

//     // Log the user IDs for debugging
//     console.log('Request user_id:', user_id);
//     console.log('Token user_id:', tokenUserId);

//     if (user_id !== tokenUserId) {
//       return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'User ID mismatch' });
//     }

//     const hasPermission = await getRolePermissionByIdService({ role_id, requiredPermission: 'canCreateNotice' });

//     if (!hasPermission) {
//       return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to create a notice' });
//     }

//     const notice = await noticeService.createNoticeService({ title, user_id });
//     res.json({ message: 'Notice created successfully', notice });
//   } catch (error) {
//     console.error('Error creating notice:', error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//   }
// };

export const createNotice = async (req, res, next) => {
    const role_id =  res.locals.role_id
  const user_id = res.locals.user_id

  try {
    const { title } = req.body;

    if (!title) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
    }

    // const authHeader = req.header('Auth');
    // if (!authHeader) {
    //   return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    // }

    // const token = authHeader
    // // const token = authHeader.split(' ')[1];
    // // if (!token) {
    // //   return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Invalid token format' });
    // // }

    // const verificationResult = await verifyToken(token);

    // if (verificationResult.error) {
    //   return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    // }

    // const { role_id, user_id: tokenUserId } = verificationResult;

    // Log the user IDs for debugging
   // console.log('Request user_id:', user_id);
   // console.log('Token user_id:', tokenUserId);
    //console.log('Type of request user_id:', typeof user_id);
    //console.log('Type of token user_id:', typeof tokenUserId);

   

    // if (parseInt(user_id) !== tokenUserId) {
    //   return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'User ID mismatch' });
    // }

    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });

    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to create a notice' });
    }

    const notice = await noticeService.createNoticeService({ title, user_id: user_id });
    res.json({ message: 'Notice created successfully', notice });
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

// export const viewAllNotices = async (req, res, next) => {
//     try {
//       const notices = await noticeService.getAllNoticeService();
//       res.json({ notices });
//     } catch (error) {
//       console.error('Error viewing notices:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const viewAllNotices = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      // Extract the token from the 'Auth' header
    //   const authHeader = req.header('Auth');
    //   if (!authHeader) {
    //       return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    //   }
    //   const token = authHeader;

    //   // Verify the token
    //   const verificationResult = await verifyToken(token);
    //   if (verificationResult.error) {
    //       return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    //   }

    //   const { role_id, user_id: tokenUserId } = verificationResult;

      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view notices' });
      }

      // Fetch and return all notices
      const notices = await noticeService.getAllNoticeService();
      res.json({ notices });
  } catch (error) {
      console.error('Error viewing notices:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

// export const viewNotice = async (req, res, next) => {
//     try {
//       const { id } = req.params;
  
//       // Find notice by id
//       const notice = await noticeService.getNoticeByIdService(id);
//       if (!notice) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Notice not found' });
//       }
  
//       res.json({ notice });
//     } catch (error) {
//       console.error('Error viewing notice:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const viewNotice = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;

      // Extract the token from the 'Auth' header
    //   const authHeader = req.header('Auth');
    //   if (!authHeader) {
    //       return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    //   }
    //   const token = authHeader;

    //   // Verify the token
    //   const verificationResult = await verifyToken(token);
    //   if (verificationResult.error) {
    //       return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    //   }

    //   const { role_id } = verificationResult;

      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view this notice' });
      }

      // Find notice by id
      const notice = await noticeService.getNoticeByIdService(id);
      if (!notice) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Notice not found' });
      }

      res.json({ notice });
  } catch (error) {
      console.error('Error viewing notice:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

// export const updateNotice = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { title } = req.body;
  
//       // Find notice by id
//       const notice = await noticeService.getNoticeByIdService(id);
//       if (!notice) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Notice not found' });
//       }
  
//       // Update notice
//       notice.title = title;
//       await notice.save();
  
//       res.json({ message: 'Notice updated successfully'});
//     } catch (error) {
//       console.error('Error updating notice:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };



// export const updateNotice = async (req, res, next) => {
//   try {
//       const { id } = req.params;
//       const { title } = req.body;

//       // Find notice by id
//       const notice = await noticeService.getNoticeByIdService(id);
//       if (!notice) {
//           return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Notice not found' });
//       }

//       // Prepare data to send for updating
//       const dataToUpdate = { title };

//       // Update notice using updateNoticeService
//       let response = await noticeService.updateNoticeService(id, dataToUpdate);

//       // Check response and send appropriate message
//       if (response[0] > 0) { 
//           res.status(HttpStatus.SUCCESS_200).json({ message: 'Notice updated successfully' });
//       } else {
//           res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
//       }
//   } catch (error) {
//       console.error('Error updating notice:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//   }
// };

export const updateNotice = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;
      const { title } = req.body;

      // Extract the token from the 'Auth' header
    //   const authHeader = req.header('Auth');
    //   if (!authHeader) {
    //       return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    //   }
    //   const token = authHeader;

    //   // Verify the token
    //   const verificationResult = await verifyToken(token);
    //   if (verificationResult.error) {
    //       return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    //   }

    //   const { role_id } = verificationResult;

      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to update this notice' });
      }

      // Find notice by id
      const notice = await noticeService.getNoticeByIdService(id);
      if (!notice) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Notice not found' });
      }

      // Prepare data to send for updating
      const dataToUpdate = { title };

      // Update notice using updateNoticeService
      let response = await noticeService.updateNoticeService(id, dataToUpdate);

      // Check response and send appropriate message
      if (response[0] > 0) { 
          res.status(HttpStatus.SUCCESS_200).json({ message: 'Notice updated successfully' });
      } else {
          res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
      }
  } catch (error) {
      console.error('Error updating notice:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

// export const deleteNotice = async (req, res, next) => {
//     try {
//       const { id } = req.params;
  
//       // Find notice by id
//       const notice = await noticeService.getNoticeByIdService(id);
//       if (!notice) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Notice not found' });
//       }
  
//       // Delete notice
//       await noticeService.deleteNoticeByIdService(id);
  
//       res.json({ message: 'Notice deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting notice:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const deleteNotice = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;

      // Extract the token from the 'Auth' header
    //   const authHeader = req.header('Auth');
    //   if (!authHeader) {
    //       return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    //   }
    //   const token = authHeader;

    //   // Verify the token
    //   const verificationResult = await verifyToken(token);
    //   if (verificationResult.error) {
    //       return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    //   }

    //   const { role_id } = verificationResult;

      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete this notice' });
      }

      // Find notice by id
      const notice = await noticeService.getNoticeByIdService(id);
      if (!notice) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Notice not found' });
      }

      // Delete notice
      await noticeService.deleteNoticeByIdService(id);

      res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
      console.error('Error deleting notice:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

// export const deleteAllNotices = async (req, res) => {
//     try {
//       // Find all notices and delete them
//       const notices = await noticeService.getAllNoticeService();
//       for (const notice of notices) {
//         await noticeService.deleteAllNoticeService();
//       }
  
//       res.json({ message: 'All notices deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting all notices:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };

export const deleteAllNotices = async (req, res) => {
    const role_id =  res.locals.role_id

  try {
      // Extract the token from the 'Auth' header
    //   const authHeader = req.header('Auth');
    //   if (!authHeader) {
    //       return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'No token provided' });
    //   }
    //   const token = authHeader;

    //   // Verify the token
    //   const verificationResult = await verifyToken(token);
    //   if (verificationResult.error) {
    //       return res.status(verificationResult.statusCode).json({ error: verificationResult.error });
    //   }

    //   const { role_id } = verificationResult;

      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete all notices' });
      }

      // Find all notices and delete them
      const notices = await noticeService.getAllNoticeService();
      for (const notice of notices) {
          await noticeService.deleteNoticeByIdService(notice.id);
      }

      res.json({ message: 'All notices deleted successfully' });
  } catch (error) {
      console.error('Error deleting all notices:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};
  
