import { useState } from 'react';
import './TradingPanel.css';
import { PositionSelector } from './PositionSelector/PositionSelector';
import { OrderTypeDropdown } from './OrderTypeDropdown/OrderTypeDropdown';
import { OpenPriceDisplay } from './OpenPriceDisplay/OpenPriceDisplay';
import { SizeInput } from './SizeInput/SizeInput';
import { LeverageSlider } from './LeverageSlider/LeverageSlider';
import { RiskParameters } from './RiskParameters/RiskParameters';

export const TradingPanel = () => {
  const [position, setPosition] = useState('LONG');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const getButtonText = () => {
    if (position === 'LONG') return 'BUY / LONG';
    return 'SELL / SHORT';
  };

  return (
    <div className='trading-panel'>
      <PositionSelector position={position} setPosition={setPosition} />
      <div className='order-detail-container'>
        <OrderTypeDropdown />
        <OpenPriceDisplay />
      </div>
      <SizeInput />
      <LeverageSlider />
      <RiskParameters />

      <button
        className='trading-panel-advanced-toggle'
        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
      >
        Advanced
        <img
          src='./TradingPanel/arrow-down.svg'
          alt='arrow down'
          className={`trading-panel__advanced-arrow ${
            isAdvancedOpen ? 'trading-panel-advanced-arrow--open' : ''
          }`}
        />
      </button>

      {isAdvancedOpen && <div className='trading-panel-advanced-content'></div>}

      <button
        className={`trading-panel-submit-button ${
          position === 'LONG'
            ? 'trading-panel-submit-button--buy'
            : 'trading-panel-submit-button--sell'
        }`}
      >
        {getButtonText()}
      </button>
    </div>
  );
};
