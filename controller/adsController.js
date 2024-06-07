import { HttpStatus } from "../config/httpStatusCodes.js";
import { adsService, rolePermissionService, roleService } from "../services/index.js";
import cloudinary from "../utils/cloudinary.js";


export const createAd = async (req, res, next) => {
  const role_id =  res.locals.role_id
  const user_id = res.locals.user_id

  try {
      const { title } = req.body;

      // Check if required fields are provided
      // if (!title || !req.file) {
      //     return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
      // }
   
      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'ads' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to create an ad' });
      }

      let imageUrl = req.body.images

      if(req.file && req.file.path){
        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
        imageUrl = uploadResult.secure_url;
      }

            

      // Create new ad
      const ad = await adsService.createAdService({ title, imageUrl: imageUrl, user_id: user_id });
      res.json({ message: 'Ad created successfully', ad });
  } catch (error) {
      console.error('Error creating ad:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};



export const viewAllAds = async (req, res, next) => {
  const role_id =  res.locals.role_id

  try {
         
      // Retrieve all ads
      const ads = await adsService.getAllAdsService();
      res.json({ ads });
  } catch (error) {
      console.error('Error viewing ads:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};


export const viewAd = async (req, res, next) => {
  const role_id =  res.locals.role_id

  try {
      const { id } = req.params;

     

      // Check if the user has the required permission
      const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'ads' });
      if (!hasPermission) {
          return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view this ad' });
      }

      // Find ad by id
      const ad = await adsService.getAdByIdService(id);
      if (!ad) {
          return res.status(HttpStatus.NOT_FOUND_404).json({ error: 'Ad not found' });
      }

      res.json({ ad });
  } catch (error) {
      console.error('Error viewing ad:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const viewUserAds = async (req, res, next) => {
  const role_id = res.locals.role_id;
  const user_id = res.locals.user_id; 

  try {
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'ads' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to view ads' });
    }

    // Fetch and return all ads created by the current user
    const adss = await adsService.getAdsByUserIdService(user_id);
    res.json({ adss });
  } catch (error) {
    console.error('Error viewing user ads:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const updateAd = async (req, res, next) => {
  const role_id =  res.locals.role_id
  const user_id = res.locals.user_id;

  try {
    const { id } = req.params;
    const { title, images } = req.body;

   
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'ads' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to update ads' });
    }

    // Find ad by id
    const ad = await adsService.getAdByIdService(id);
    if (!ad) {
      return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Ad not found' });
    }

    // Check if the user is a 'Super Admin' or if the ad was created by the current user
    const userRole = await roleService.getRoleByIdService(role_id);
    if (userRole.title !== 'Super Admin' && ad.user_id !== user_id) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'Why are you trying to update others ads ??  You can not do that !!!' });
    }


    // Prepare data to send for updating
    const dataToUpdate = { title,imageUrl : images };

     // Handle image upload if a file is provided
     if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = uploadResult.secure_url;
      dataToUpdate.imageUrl = imageUrl;
    }

    // Update Ad using updateAdService
    const response = await adsService.updateAdService(id, dataToUpdate);

    // Check response and send appropriate message
    if (response[0] > 0) { // Check if at least one row was updated
      res.status(HttpStatus.SUCCESS_200).json({ message: 'Ad updated successfully' });
    } else {
      res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
    }
  } catch (error) {
    console.error('Error updating ad:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};


export const deleteAd = async (req, res, next) => {
  const role_id =  res.locals.role_id
  const user_id = res.locals.user_id;

  try {
    const { id } = req.params;

    
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'ads' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete ads' });
    }

    // Find ad by id
    const ad = await adsService.getAdByIdService(id);
    if (!ad) {
      return res.status(HttpStatus.NOT_FOUND_404).json({ error: 'Ad not found' });
    }

    // Check if the user is a 'Super Admin' or if the ad was created by the current user
    const userRole = await roleService.getRoleByIdService(role_id);
    if (userRole.title!== 'Super Admin' && ad.user_id!== user_id) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'Why are you trying to delete others ads. You can only delete ads that you have created !!!' });
    }

    // Delete ad
    await adsService.deleteAdByIdService(id);

    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};



export const deleteAllAds = async (req, res) => {
  const role_id =  res.locals.role_id
  const user_id = res.locals.user_id;

  try {
    
    // Check if the user has the required permission
    const hasPermission = await rolePermissionService.getRolePermissionByIdService({ role_id, requiredPermission: 'ads' });
    if (!hasPermission) {
      return res.status(HttpStatus.FORBIDDEN_403).json({ error: 'You do not have permission to delete ads' });
    }

    // Find all ads and delete them
    const ads = await adsService.getAllAdsService();
    for (const ad of ads) {
      const userRole = await roleService.getRoleByIdService(role_id);
        if (userRole.title !== 'Super Admin' && ad.user_id !== user_id) {
          continue;
        }

      await adsService.deleteAdByIdService(ad.id);
    }

    res.json({ message: 'All ads deleted successfully' });
  } catch (error) {
    console.error('Error deleting all ads:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};


