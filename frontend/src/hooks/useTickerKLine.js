import { useState, useEffect } from 'react';
import { vestService } from '../services/api';

export const useTickerKLine = (symbol, startTime, endTime, limit, interval) => {
  const [tickerKLineData, setTickerKLineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickerKLine = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const KLineResponse = await vestService.getKLines(
          symbol,
          startTime,
          endTime,
          limit,
          interval
        );
        setTickerKLineData(KLineResponse);
      } catch (error) {
        setError('Failed to fetch ticker data');
        console.error('Error fetching ticker data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (symbol) {
      fetchTickerKLine();
    }
  }, [endTime, interval, limit, startTime, symbol]);

  return { tickerKLineData, isLoading, error };
};
