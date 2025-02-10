const WS_BASE_URL =
  'wss://devws.vest.exchange/ws-api?version=1.0&xwebsocketserver=restserver0';

let ws = null;
let pingInterval = null;
let connectionPromise = null;
let isConnecting = false;
let reconnectAttempts = 0;
let reconnectTimeout = null;
let currentSymbol = null;

const CONFIG = {
  maxReconnectAttempts: 5,
  baseReconnectDelay: 1000,
  pingInterval: 30000,
};

const cleanup = () => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
  }

  if (ws) {
    ws.onclose = null;
    ws.onerror = null;
    ws.onmessage = null;
    ws.onopen = null;

    if (
      ws.readyState === WebSocket.OPEN ||
      ws.readyState === WebSocket.CONNECTING
    ) {
      ws.close();
    }
    ws = null;
  }

  connectionPromise = null;
  isConnecting = false;
  reconnectAttempts = 0;
  currentSymbol = null;
};

const startPingInterval = () => {
  if (pingInterval) clearInterval(pingInterval);

  pingInterval = setInterval(() => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          method: 'PING',
          params: [],
          id: 0,
        })
      );
    }
  }, CONFIG.pingInterval);
};

const handleWebSocketMessage = async (event, onMessage) => {
  try {
    let data;
    if (event.data instanceof Blob) {
      const arrayBuffer = await event.data.arrayBuffer();
      const decompressed = await new Response(arrayBuffer).text();
      data = JSON.parse(decompressed);
    } else {
      data = JSON.parse(event.data);
    }

    if (data.data === 'PONG') return;

    onMessage(data);
  } catch (error) {
    console.error('Error processing WebSocket message:', error);
  }
};

const subscribe = async (symbol, interval) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    throw new Error('WebSocket is not connected');
  }

  const subscribeMessage = {
    method: 'SUBSCRIBE',
    params: [`${symbol}@kline_${interval}`],
    id: 1,
  };

  console.log('Sending subscribe message:', subscribeMessage);
  ws.send(JSON.stringify(subscribeMessage));
};

const attemptReconnect = (symbol, interval, onMessage) => {
  if (symbol !== currentSymbol) return;

  if (reconnectAttempts < CONFIG.maxReconnectAttempts) {
    reconnectAttempts++;
    const delay =
      CONFIG.baseReconnectDelay * Math.pow(2, reconnectAttempts - 1);
    console.log(`Attempting to reconnect in ${delay}ms...`);

    reconnectTimeout = setTimeout(() => {
      if (symbol === currentSymbol) {
        wsService.connect(symbol, interval, onMessage).catch(console.error);
      }
    }, delay);
  }
};

const setupWebSocket = (url, symbol, interval, onMessage) => {
  return new Promise((resolve, reject) => {
    try {
      ws = new WebSocket(url);

      ws.onopen = async () => {
        console.log('WebSocket Connected');
        isConnecting = false;
        reconnectAttempts = 0;
        currentSymbol = symbol;
        startPingInterval();

        try {
          await subscribe(symbol, interval);
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        isConnecting = false;
        reject(error);
      };

      ws.onmessage = (event) => handleWebSocketMessage(event, onMessage);

      ws.onclose = (event) => {
        console.log('WebSocket Disconnected:', event.code, event.reason);
        if (symbol === currentSymbol) {
          cleanup();
          attemptReconnect(symbol, interval, onMessage);
        }
      };
    } catch (error) {
      console.error('Connection error:', error);
      cleanup();
      reject(error);
    }
  });
};

export const wsService = {
  connect: async (symbol, interval, onMessage) => {
    if (!symbol) return;

    if (currentSymbol !== symbol) {
      cleanup();
    }

    if (isConnecting) {
      return connectionPromise;
    }

    console.log('Connecting to WebSocket...');
    isConnecting = true;
    currentSymbol = symbol;

    try {
      const url = WS_BASE_URL;
      console.log('Connecting to URL:', url);
      connectionPromise = setupWebSocket(url, symbol, interval, onMessage);
      return await connectionPromise;
    } catch (error) {
      cleanup();
      throw error;
    }
  },

  disconnect: cleanup,
};
