import { HttpStatus } from "../config/httpStatusCodes.js";
import { noticeService, rolePermissionService, roleService } from "../services/index.js";

export const createNotice = async (req, res, next) => {
    const role_id =  res.locals.role_id
  const user_id = res.locals.user_id

  try {
    const { title } = req.body;

    if (!title) {
      return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
    }

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


export const viewAllNotices = async (req, res, next) => {
    // const role_id =  res.locals.role_id

  try {
      

      // Fetch and return all notices
      const notices = await noticeService.getAllNoticeService();
      res.json({ notices });
  } catch (error) {
      console.error('Error viewing notices:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};


export const viewNotice = async (req, res, next) => {
    const role_id =  res.locals.role_id

  try {
      const { id } = req.params;

      
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

export const viewUserNotices = async (req, res, next) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id; 

  try {
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view notices' });
    }

    // Fetch and return all notices created by the current user
    const notices = await noticeService.getNoticesByUserIdService(user_id);
    res.json({ notices });
  } catch (error) {
    console.error('Error viewing user notices:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const updateNotice = async (req, res, next) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id;

  try {
    const { id } = req.params;
    const { title } = req.body;

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

    // Check if the user is a 'Super Admin' or if the notice was created by the current user
    const userRole = await roleService.getRoleByIdService(role_id);
    if (userRole.title !== 'Super Admin' && notice.user_id !== user_id) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'Why are you trying to update others notice ??  You can not do that !!!' });
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



export const deleteNotice = async (req, res, next) => {
    const role_id =  res.locals.role_id
    const user_id = res.locals.user_id;


  try {
      const { id } = req.params;

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

      // Check if the user is a 'Super Admin' or if the notice was created by the current user
    const userRole = await roleService.getRoleByIdService(role_id);
    if (userRole.title!== 'Super Admin' && notice.user_id!== user_id) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'Why are you trying to delete others notice. You can only delete notices that you have created !!!' });
    }

      // Delete notice
      await noticeService.deleteNoticeByIdService(id);

      res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
      console.error('Error deleting notice:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};



export const deleteAllNotices = async (req, res) => {
    const role_id =  res.locals.role_id
    const user_id = res.locals.user_id;


  try {
     

      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'notice' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete all notices' });
      }

      // Find all notices and delete them
      const notices = await noticeService.getAllNoticeService();
      
      for (const notice of notices) {
        const userRole = await roleService.getRoleByIdService(role_id);
        if (userRole.title !== 'Super Admin' && notice.user_id !== user_id) {
          continue;
        }

          await noticeService.deleteNoticeByIdService(notice.id);
      }

      res.json({ message: 'All notices deleted successfully' });
  } catch (error) {
      console.error('Error deleting all notices:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};
  
