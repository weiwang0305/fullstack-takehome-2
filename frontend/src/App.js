import './App.css';
import { AssetInfo } from './components/AssetInfo/AssetInfo';
import { Header } from './components/Header/Header';
import { useState, useEffect } from 'react';
import { vestService } from './services/api';

function App() {
  const [ticker, setTicker] = useState('BTC-PERP');
  const [tickerDetails, setTickerDetails] = useState({});

  useEffect(() => {
    const getTickerDetail = async () => {
      try {
        const response = await vestService.get24HourTicker(ticker);
        setTickerDetails(response.data);
      } catch (error) {
        console.error('Failed to get ticker', error);
      }
    };
    getTickerDetail();
  }, [ticker]);

  return (
    <div className='App'>
      <Header />
      <AssetInfo />
    </div>
  );
}

export default App;
