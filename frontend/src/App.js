import './App.css';
import { AssetInfo } from './components/AssetInfo/AssetInfo';
import { Header } from './components/Header/Header';
import { useState, useMemo, useCallback } from 'react';
import { useTickerData } from './hooks/useTickerData';
import { TradingChart } from './components/TradingChart/TradingChart';
import { ChartSelector } from './components/TradingChart/ChartSelector/ChartSelector';
import { TradingPanel } from './components/TradingPanel/TradingPanel';
import { useTickerKLine } from './hooks/useTickerKLine';
import { useWebSocketData } from './hooks/useWebSocketData';

function App() {
  const [ticker, setTicker] = useState('ETH-PERP');
  const [startTime, setStartTime] = useState(Date.now() - 60 * 60 * 1000);
  const [endTime, setEndTime] = useState(Date.now());
  const [interval, setInterval] = useState('1m');
  const [chartType, setChartType] = useState('PRICE');

  const intervalToMs = (interval) => {
    const value = parseInt(interval);
    const unit = interval.slice(-1);

    switch (unit) {
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      case 'w':
        return value * 7 * 24 * 60 * 60 * 1000;
      case 'M':
        return value * 30 * 24 * 60 * 60 * 1000; // Approximate
      default:
        return 60 * 1000; // Default to 1m
    }
  };

  const calculateLimit = useCallback((startTime, endTime, interval) => {
    const intervalMs = intervalToMs(interval);
    const timeRange = endTime - startTime;
    return Math.ceil(timeRange / intervalMs);
  }, []);

  const limit = useMemo(
    () => calculateLimit(startTime, endTime, interval),
    [calculateLimit, startTime, endTime, interval]
  );

  const { tickerData } = useTickerData(ticker);
  const { tickerKLineData } = useTickerKLine(
    ticker,
    startTime,
    endTime,
    limit,
    interval
  );
  const { latestData } = useWebSocketData(ticker, interval);

  console.log('latestData', latestData);

  return (
    <div className='App'>
      <Header setTicker={setTicker} />
      <AssetInfo tickerData={tickerData} />
      <ChartSelector chartType={chartType} />
      <div className='trading-container'>
        <TradingChart
          ticker={ticker}
          tickerKLineData={tickerKLineData}
          latestData={latestData}
        />
        <TradingPanel latestData={latestData} />
      </div>
    </div>
  );
}

export default App;
