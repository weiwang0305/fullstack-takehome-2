const API_URL = 'http://localhost:3001';
const VEST_BASE_URL = 'https://serverprod.vest.exchange/v2';

const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};
//TODO - Create api.js file

export const vestService = {
  get24HourTicker: async (ticker) => {
    return fetch(`${VEST_BASE_URL}/ticker/24hr?symbols=${ticker}`, {
      method: 'GET',
      headers: DEFAULT_HEADER,
    }).then(handleResponse);
  },
  getLatestTicker: async (ticker) => {
    return fetch(`${VEST_BASE_URL}/ticker/latest?symbols=${ticker}`, {
      method: 'GET',
      headers: DEFAULT_HEADER,
    }).then(handleResponse);
  },
  getKLines: async (ticker, startTime, endTime, limit, interval) => {
    return fetch(
      `${VEST_BASE_URL}/klines?symbol=${ticker}&startTime=${startTime}&endTime=${endTime}&limit=${limit}&interval=${interval}`,
      {
        method: 'GET',
        headers: DEFAULT_HEADER,
      }
    ).then(handleResponse);
  },
};
