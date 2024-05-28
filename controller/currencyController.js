import exchangeRateService from '../services/index.js';

export const convertCurrencyHandler = (req, res) => {
  const { amount, currency } = req.query;

  if (!amount || isNaN(amount) || !currency) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  try {
    const nprAmount = parseFloat(amount);
    const convertedAmount = convertCurrency(nprAmount, currency);
    res.json({ amount: nprAmount, currency, convertedAmount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
