import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';

export const useWebSocketData = (symbol) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const connectWebSocket = async () => {
      try {
        await wsService.connect(symbol, (message) => {
          if (isSubscribed) {
            const newData = {
              time: new Date(message.data[0]).getTime(),
              open: parseFloat(message.data[1]),
              high: parseFloat(message.data[2]),
              low: parseFloat(message.data[3]),
              close: parseFloat(message.data[4]),
            };
            setData((prev) => [...prev, newData]);
          }
        });
      } catch (err) {
        if (isSubscribed) {
          setError(err.message);
        }
      }
    };
    if (symbol) {
      connectWebSocket();
    }
  }, [symbol]);

  console.log('data', data);

  return { data, error };
};
