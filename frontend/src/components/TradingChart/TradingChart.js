import './TradingChart.css';
import { createChart } from 'lightweight-charts';
import { useRef, useEffect, useCallback } from 'react';
import { useTickerKLine } from '../../hooks/useTickerKLine';
import { ChartControls } from './ChartControls/ChartControls';

export const TradingChart = ({
  ticker,
  startTime,
  endTime,
  limit,
  interval,
}) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const { tickerKLineData } = useTickerKLine(
    ticker,
    startTime,
    endTime,
    limit,
    interval
  );

  const transformKLineData = useCallback((klineData) => {
    if (!klineData || !Array.isArray(klineData)) {
      return [];
    }

    try {
      const timeMap = new Map();

      klineData.forEach((candle) => {
        const utcDate = new Date(Number(candle[0]));
        const utcTimestamp =
          Date.UTC(
            utcDate.getUTCFullYear(),
            utcDate.getUTCMonth(),
            utcDate.getUTCDate(),
            utcDate.getUTCHours(),
            utcDate.getUTCMinutes()
          ) / 1000;

        if (
          !timeMap.has(utcTimestamp) ||
          Number(candle[0]) > timeMap.get(utcTimestamp).originalTime
        ) {
          timeMap.set(utcTimestamp, {
            time: utcTimestamp,
            originalTime: Number(candle[0]),
            open: Number(candle[1]),
            high: Number(candle[2]),
            low: Number(candle[3]),
            close: Number(candle[4]),
          });
        }
      });

      return Array.from(timeMap.values())
        .sort((a, b) => a.time - b.time)
        .map((candle) => ({
          time: candle.time,
          open: candle.open,
          high: candle.high,
          low: candle.low,
          close: candle.close,
        }));
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
  }, []);

  useEffect(() => {
    if (!candlestickSeriesRef.current || !tickerKLineData?.length) return;

    const formattedData = transformKLineData(tickerKLineData);
    if (formattedData.length > 0) {
      candlestickSeriesRef.current.setData(formattedData);
      chartRef.current?.timeScale().fitContent();
    }
  }, [tickerKLineData, transformKLineData]);

  return (
    <div className='trading-chart'>
      <ChartControls />
      <div ref={chartContainerRef} className='chart-container' />
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
            <span>O: {tickerKLineData[tickerKLineData.length - 1][1]}</span>
            <span>H: {tickerKLineData[tickerKLineData.length - 1][2]}</span>
            <span>L: {tickerKLineData[tickerKLineData.length - 1][3]}</span>
            <span>C: {tickerKLineData[tickerKLineData.length - 1][4]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingChart;
