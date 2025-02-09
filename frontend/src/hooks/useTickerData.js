import { useState, useEffect } from 'react';
import { vestService } from '../services/api';

export const useTickerData = (symbol) => {
  const [tickerData, setTickerData] = useState({
    symbol: null,
    price: null,
    hourlyFunding: null,
    priceChange24Hr: null,
    priceChangePercent24Hr: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [latestResponse, dailyResponse] = await Promise.all([
          vestService.getLatestTicker(symbol),
          vestService.get24HourTicker(symbol),
        ]);

        const latestTicker = latestResponse.tickers[0];
        const dailyTicker = dailyResponse.tickers[0];

        setTickerData({
          symbol: latestTicker?.symbol,
          price: latestTicker?.markPrice,
          hourlyFunding: latestTicker?.oneHrFundingRate,
          priceChange24Hr: dailyTicker?.priceChange,
          priceChangePercent24Hr: dailyTicker?.priceChangePercent,
        });
      } catch (error) {
        setError('Failed to fetch ticker data');
        console.error('Error fetching ticker data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (symbol) {
      fetchTickerData();
    }
  }, [symbol]);

  return { tickerData, isLoading, error };
};
