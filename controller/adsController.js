import { HttpStatus } from "../config/httpStatusCodes.js";
import { adsService } from "../services/index.js";

export const createAd = async (req, res, next) => {
    try {
      const { title, imageUrl, user_id } = req.body;
  
      // Check if required fields are provided
      if (!title || !imageUrl || !user_id) {
        return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Please provide all the required information' });
      }
  
      // Create new ad
      const ads = await adsService.createAdService({ title, imageUrl, user_id });
      res.json({ message: 'Ad created successfully'});
    } catch (error) {
      console.error('Error creating ad:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewAllAds = async (req, res, next) => {
    try {
      const adss = await adsService.getAllAdsService();
      res.json({ adss });
    } catch (error) {
      console.error('Error viewing ads:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

export const viewAd = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find ad by id
      const ads = await adsService.getAdByIdService(id);
      if (!ads) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Ad not found' });
      }
  
      res.json({ ads });
    } catch (error) {
      console.error('Error viewing ad:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

// export const updateAd = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { title, imageUrl } = req.body;
  
//       // Find ad by id
//       const ads = await adsService.getAdByIdService(id);
//       if (!ads) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Ads not found' });
//       }
  
//       // Update Ad
//       ads.title = title;
//       ads.imageUrl = imageUrl;
//       await ads.save();
  
//       res.json({ message: 'Ad updated successfully'});
//     } catch (error) {
//       console.error('Error updating ad:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const updateAd = async (req, res, next) => {
  try {
      const { id } = req.params;
      const { title, imageUrl } = req.body;

      // Find ad by id
      const ad = await adsService.getAdByIdService(id);
      if (!ad) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Ad not found' });
      }

      // Prepare data to send for updating
      const dataToUpdate = { title, imageUrl };

      // Update Ad using updateAdService
      let response = await adsService.updateAdService(id, dataToUpdate);

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
    try {
      const { id } = req.params;
  
      // Find ads by id
      const ads = await adsService.getAdByIdService(id);
      if (!ads) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Ad not found' });
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
    try {
      // Find all ads and delete them
      const adss = await adsService.getAllAdsService();
      for (const ads of adss) {
        await adsService.deleteAllAdsService();
      }
  
      res.json({ message: 'All ads deleted successfully' });
    } catch (error) {
      console.error('Error deleting all ads:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


