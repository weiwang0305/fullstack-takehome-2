const API_URL = 'http://localhost:3001';
const VEST_BASE_URL = 'https://server-mmdev.vest.exchange/v2/';

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
    return fetch(`${API_URL}/${ticker}/24hr`, {
      method: 'GET',
      headers: DEFAULT_HEADER,
    }).then(handleResponse);
  },
};
