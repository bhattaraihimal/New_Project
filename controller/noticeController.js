import { HttpStatus } from "../config/httpStatusCodes.js";
import { noticeService } from "../services/index.js";

export const createNotice = async (req, res, next) => {
    try {
      const { title, user_id } = req.body;
  
      // Check if required fields are provided
      if (!title || !user_id) {
        return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
      }
  
      // Create new notice
      const notice = await noticeService.createNoticeService({ title, user_id });
      res.json({ message: 'Notice created successfully'});
    } catch (error) {
      console.error('Error creating notice:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewAllNotices = async (req, res, next) => {
    try {
      const notices = await noticeService.getAllNoticeService();
      res.json({ notices });
    } catch (error) {
      console.error('Error viewing notices:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewNotice = async (req, res, next) => {
    try {
      const { id } = req.params;
  
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

export const updateNotice = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
  
      // Find notice by id
      const notice = await noticeService.getNoticeByIdService(id);
      if (!notice) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Notice not found' });
      }
  
      // Update notice
      notice.title = title;
      await notice.save();
  
      res.json({ message: 'Notice updated successfully'});
    } catch (error) {
      console.error('Error updating notice:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const deleteNotice = async (req, res, next) => {
    try {
      const { id } = req.params;
  
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

export const deleteAllNotices = async (req, res) => {
    try {
      // Find all notices and delete them
      const notices = await noticeService.getAllNoticeService();
      for (const notice of notices) {
        await noticeService.deleteAllNoticeService();
      }
  
      res.json({ message: 'All notices deleted successfully' });
    } catch (error) {
      console.error('Error deleting all notices:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


