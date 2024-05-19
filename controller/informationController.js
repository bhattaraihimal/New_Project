import { HttpStatus } from "../config/httpStatusCodes.js";
import { informationService } from "../services/index.js";

export const createInformation = async (req, res, next) => {
    try {
      const { title, description, post, type, content, user_id } = req.body;
  
      // Check if required fields are provided
      if (!title || !description || !post || !type || !content || !user_id) {
        return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
      }
  
      // Create new information
      const information = await informationService.createInformationService({ title, description, post, type, content, user_id });
      res.json({ message: 'Information created successfully'});
    } catch (error) {
      console.error('Error creating information:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewAllInformation = async (req, res, next) => {
    try {
      const informations = await informationService.getAllInformationService();
      res.json({ informations });
    } catch (error) {
      console.error('Error viewing informations:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewInformation = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find ad by id
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

export const updateInformation = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, post, type, content } = req.body;
  
      // Find information by id
      const information = await informationService.getInformationByIdService(id);
      if (!information) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Information not found' });
      }
  
      // Update information
      information.title = title;
      information.description = description;
      information.post = post;
      information.type = type;
      information.content = content;
      await information.save();
  
      res.json({ message: 'Information updated successfully'});
    } catch (error) {
      console.error('Error updating information:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const deleteInformation = async (req, res, next) => {
    try {
      const { id } = req.params;
  
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

export const deleteAllInformation = async (req, res) => {
    try {
      // Find all information and delete them
      const informations = await informationService.getAllInformationService();
      for (const information of informations) {
        await informationService.deleteAllInformationService();
      }
  
      res.json({ message: 'All Informations deleted successfully' });
    } catch (error) {
      console.error('Error deleting all informations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


