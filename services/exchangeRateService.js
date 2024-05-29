import axios from 'axios';
import { ExchangeRates } from '../models/model.js';


export const fetchExchangeRates = async () => {
  try {
      
    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

        // Construct the URL with the current date
    const url = `https://www.nrb.org.np/api/forex/v1/rates?page=1&from=${currentDate}&to=${currentDate}&per_page=100`;

        // Fetch the exchange rates
    const response = await axios.get(url); 
    console.log(response.data.data.payload[0].rates);

    if (response.data.data.payload && response.data.data.payload.length > 0) {

    const rates = response.data.data.payload[0].rates; 

    for (const rate of rates) {
      ExchangeRates[rate.currency.iso3] = {
        rate: parseFloat(rate.buy),
        unit: rate.currency.unit
      };
    }
    console.log('Fetched exchange rates:', ExchangeRates);
  } else {
    console.error('No payload found in API response');
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
