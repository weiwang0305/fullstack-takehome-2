import './SizeInput.css';
import { useState } from 'react';

export const SizeInput = () => {
  const [size, setSize] = useState('0');
  const maxSize = '1,458.173';

  return (
    <div className='size-input'>
      <div className='size-input-label'>
        <label className='size-input-description'>Size</label>
      </div>

      <div className='size-input-container'>
        <input
          type='number'
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className='size-input-field'
        />
        <span className='size-input-currency'>USDC</span>
      </div>

      <div className='size-input-max'>Up to {maxSize}</div>
    </div>
  );
};
