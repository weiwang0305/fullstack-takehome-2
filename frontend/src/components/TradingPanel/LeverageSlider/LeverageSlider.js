import { useState } from 'react';
import './LeverageSlider.css';

export const LeverageSlider = () => {
  const [leverage, setLeverage] = useState(2);
  const leverageOptions = [2, 5, 10, 25, 50, 100, 128];

  const handleChange = (e) => {
    const index = parseInt(e.target.value);
    setLeverage(leverageOptions[index]);
  };

  return (
    <div className='leverage-slider'>
      <div className='leverage-slider-header'>
        <span>Leverage</span>
        <span>{leverage},00X</span>
      </div>

      <div className='leverage-slider-container'>
        <div className='leverage-slider-track'>
          <div className='leverage-slider-trackline' />
          <input
            type='range'
            min={0}
            max={leverageOptions.length - 1}
            value={leverageOptions.indexOf(leverage)}
            onChange={handleChange}
            className='leverage-slider-input'
          />
          {leverageOptions.map((value, index) => (
            <div
              key={value}
              className='leverage-slider-marker-container'
              style={{
                left: `${(index / (leverageOptions.length - 1)) * 100}%`,
              }}
            >
              <div
                className={`leverage-slider-marker ${
                  leverage >= value ? 'leverage-slider-marker--active' : ''
                }`}
              />
              <span className='leverage-slider-tick-label'>{value}X</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
