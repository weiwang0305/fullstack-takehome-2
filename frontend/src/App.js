import './App.css';
import { AssetInfo } from './components/AssetInfo/AssetInfo';
import { Header } from './components/Header/Header';
import { useState } from 'react';
import { useTickerData } from './hooks/useTickerData';
import { TradingChart } from './components/TradingChart/TradingChart';

function App() {
  const [ticker, setTicker] = useState('ETH-PERP');
  const [startTime, setStartTime] = useState(Date.now() - 60 * 60 * 1000);
  const [endTime, setEndTime] = useState(Date.now());
  const [limit, setLimit] = useState(50);
  const [interval, setInterval] = useState('1h');

  const { tickerData, isLoading, error } = useTickerData(ticker);

  return (
    <div className='App'>
      <Header />
      <AssetInfo tickerData={tickerData} />
      <TradingChart
        ticker={ticker}
        startTime={startTime}
        endTime={endTime}
        limit={limit}
        interval={interval}
      />
    </div>
  );
}

export default App;
