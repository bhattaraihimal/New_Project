import { exchangeRateService } from '../services/index.js';

export const convertCurrencyHandler = async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || isNaN(amount) || !currency) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {

      // Fetch the latest exchange rates
      await exchangeRateService.fetchExchangeRates();

    const nprAmount = parseFloat(amount);
    const convertedAmount = exchangeRateService.convertCurrency(nprAmount, currency);
    res.json({ amount: nprAmount, currency, convertedAmount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
