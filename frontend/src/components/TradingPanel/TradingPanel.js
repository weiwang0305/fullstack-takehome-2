import { useState } from 'react';
import './TradingPanel.css';

export const TradingPanel = () => {
  const [position, setPosition] = useState('LONG');

  return (
    <div className='trading-panel'>
      <div className='position-selector'>
        <span
          className={`position-button ${
            position === 'LONG' ? 'position-button--active' : ''
          }`}
          onClick={() => setPosition('LONG')}
        >
          LONG
        </span>
        <span
          className={`position-button ${
            position === 'SHORT' ? 'position-button--active' : ''
          }`}
          onClick={() => setPosition('SHORT')}
        >
          SHORT
        </span>
      </div>
    </div>
  );
};
