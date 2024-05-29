import express from 'express';
import { currencyController } from '../controller/index.js';
import { scheduleExchangeRateUpdates } from '../middleware/exchangeRateUpdater.js';

const exchangeRouter = express.Router();

scheduleExchangeRateUpdates();

exchangeRouter.get('/convert', currencyController.convertCurrencyHandler);

export default exchangeRouter;

