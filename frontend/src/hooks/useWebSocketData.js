import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';

export const useWebSocketData = (ticker, interval) => {
  const [latestData, setLatestData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const connectWebSocket = async () => {
      try {
        await wsService.connect(ticker, interval, (message) => {
          if (
            isSubscribed &&
            message.channel === `${ticker}@kline_${interval}`
          ) {
            setLatestData({
              time: message.data[0] / 1000,
              open: Number(message.data[1]),
              high: Number(message.data[2]),
              low: Number(message.data[3]),
              close: Number(message.data[4]),
            });
          }
        });
      } catch (err) {
        if (isSubscribed) {
          setError(err.message);
        }
      }
    };

    if (ticker && interval) {
      connectWebSocket();
    }
  }, [interval, ticker]);

  return { latestData, error };
};
