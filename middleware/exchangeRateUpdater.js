import cron from 'node-cron';
import { exchangeRateService } from '../services/index.js';

export const scheduleExchangeRateUpdates = () => {
  // Fetch exchange rates initially when the server starts
  exchangeRateService.fetchExchangeRates();

  // // Schedule a task to fetch exchange rates every 24 hours
  // cron.schedule('0 0 * * *', exchangeRateService.fetchExchangeRates);
};
