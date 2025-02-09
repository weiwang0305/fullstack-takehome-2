import './App.css';
import { AssetInfo } from './components/AssetInfo/AssetInfo';
import { Header } from './components/Header/Header';
import { useState, useEffect } from 'react';
import { vestService } from './services/api';
import { useTickerData } from './hooks/useTickerData';

function App() {
  const [ticker, setTicker] = useState('ETH-PERP');

  const { tickerData, isLoading, error } = useTickerData(ticker);

  console.log('tickerdata', tickerData);
  return (
    <div className='App'>
      <Header />
      <AssetInfo tickerData={tickerData} />
      <TradingChart />
    </div>
  );
}

export default App;
