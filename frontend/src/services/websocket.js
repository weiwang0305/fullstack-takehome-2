const WS_BASE_URL = 'wss://devws.vest.exchange/ws-api?version=1.0';

let ws = null;
let pingInterval = null;

const webSocketURL = `${WS_BASE_URL}&xwebsocketserver=restserver{0}`;
