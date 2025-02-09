import './App.css';
import { AssetInfo } from './components/AssetInfo/AssetInfo';
import { Header } from './components/Header/Header';
import { useState } from 'react';
import { useTickerData } from './hooks/useTickerData';
import { TradingChart } from './components/TradingChart/TradingChart';
import { ChartSelector } from './components/TradingChart/ChartSelector/ChartSelector';
import { TradingPanel } from './components/TradingPanel/TradingPanel';

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
      <ChartSelector />
      <div className='trading-container'>
        <TradingChart
          ticker={ticker}
          startTime={startTime}
          endTime={endTime}
          limit={limit}
          interval={interval}
        />
        <TradingPanel />
      </div>
    </div>
  );
}

export default App;
