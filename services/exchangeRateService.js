import axios from 'axios';
import ExchangeRates from '../models/model.js';


export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get('https://www.nrb.org.np/api/forex/v1/rates?page=1&from=2024-05-20&to=2024-05-20&per_page=100'); 
    const rates = response.data.payload[0].rates; 

    for (const rate of rates) {
      ExchangeRates[rate.currency.iso3] = {
        rate: parseFloat(rate.buy),
        unit: rate.currency.unit
      };
    }

    console.log('Exchange rates updated successfully');
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
  }
};

export const convertCurrency = (amount, currency) => {
  if (!ExchangeRates[currency]) {
    throw new Error('Currency not supported');
  }

  const rate = ExchangeRates[currency].rate;
  const unit = ExchangeRates[currency].unit;
  return (amount / rate) * unit;
};
