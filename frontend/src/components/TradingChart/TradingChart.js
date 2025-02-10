import './TradingChart.css';
import { createChart } from 'lightweight-charts';
import { useRef, useEffect, useCallback } from 'react';
import { ChartControls } from './ChartControls/ChartControls';
import { ChartToolbar } from './ChartToolbar/ChartToolbar';

export const TradingChart = ({ ticker, tickerKLineData, latestData }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);

  const transformKLineData = useCallback((klineData) => {
    if (!klineData || !Array.isArray(klineData)) {
      return [];
    }

    try {
      return klineData.map((candle) => {
        return {
          time: candle[0] / 1000,
          open: Number(candle[1]),
          high: Number(candle[2]),
          low: Number(candle[3]),
          close: Number(candle[4]),
        };
      });
    } catch (error) {
      console.error('Error transforming data:', error);
      return [];
    }
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) return;

    const chartOptions = {
      layout: {
        background: { color: '#100e0c' },
        textColor: '#AEADAD',
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
      },
      crosshair: {
        mode: 2,
      },
      timeScale: {
        timeVisible: true,
        tickMarkFormatter: (time) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString();
        },
      },
    };

    chartRef.current = createChart(chartContainerRef.current, chartOptions);
    candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#4BC2A3',
      downColor: '#E03737',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth - 30,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        candlestickSeriesRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!candlestickSeriesRef.current || !tickerKLineData?.length) return;

    const formattedData = transformKLineData(tickerKLineData);
    console.log('formattedData', formattedData);
    if (formattedData.length > 0) {
      candlestickSeriesRef.current.setData(formattedData);
      chartRef.current?.timeScale().fitContent();
    }
  }, [tickerKLineData, transformKLineData]);

  useEffect(() => {
    if (!candlestickSeriesRef.current || !latestData) return;
    candlestickSeriesRef.current.update(latestData);
  }, [latestData]);

  return (
    <div className='chart-container'>
      <ChartControls />
      <div className='chart-overview'>
        <ChartToolbar />
        <div ref={chartContainerRef} className='chart' />
        {tickerKLineData && tickerKLineData.length > 0 && (
          <div className='chart-latest-details'>
            <div className='chart-ticker-details'>
              <span>{ticker}</span>
              <span>·</span>
              <span>1H</span>
              <span>·</span>
              <span>Vest</span>
            </div>
            <div className='chart-price-details'>
              <span>O: {latestData?.open}</span>
              <span>H: {latestData?.high}</span>
              <span>L: {latestData?.low}</span>
              <span>C: {latestData?.close}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingChart;
