import { useState, useCallback, useRef } from 'react';
import './TradingPanel.css';
import { PositionSelector } from './PositionSelector/PositionSelector';
import { OrderTypeDropdown } from './OrderTypeDropdown/OrderTypeDropdown';
import { OpenPriceDisplay } from './OpenPriceDisplay/OpenPriceDisplay';
import { SizeInput } from './SizeInput/SizeInput';
import { LeverageSlider } from './LeverageSlider/LeverageSlider';
import { RiskParameters } from './RiskParameters/RiskParameters';
import confetti from 'canvas-confetti';

const submitSound = new Audio('./TradingPanel/ping.wav');

export const TradingPanel = ({ latestData }) => {
  const [position, setPosition] = useState('LONG');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const buttonRef = useRef(null);

  const getButtonText = () => {
    if (position === 'LONG') return 'BUY / LONG';
    return 'SELL / SHORT';
  };

  const fireConfetti = (originX, originY) => {
    const count = 200;
    const defaults = {
      origin: { x: originX, y: originY },
      spread: 90,
      ticks: 100,
      gravity: 1.2,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#26a69a', '#00897b', '#00796b', '#00695c', '#004d40'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleSubmit = useCallback(() => {
    submitSound.currentTime = 0;
    submitSound.play();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (rect.x + rect.width / 2) / window.innerWidth;
      const y = (rect.y + rect.height / 2) / window.innerHeight;
      fireConfetti(x, y);
    }
  }, []);

  return (
    <div className='trading-panel'>
      <PositionSelector position={position} setPosition={setPosition} />
      <div className='order-detail-container'>
        <OrderTypeDropdown />
        <OpenPriceDisplay latestData={latestData} />
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
        ref={buttonRef}
        className={`trading-panel-submit-button ${
          position === 'LONG'
            ? 'trading-panel-submit-button--buy'
            : 'trading-panel-submit-button--sell'
        }`}
        onClick={handleSubmit}
      >
        {getButtonText()}
      </button>
    </div>
  );
};
