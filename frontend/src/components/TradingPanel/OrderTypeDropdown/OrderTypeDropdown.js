import './OrderTypeDropdown.css';
import { useState } from 'react';

export const OrderTypeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('MARKET');

  const orderTypes = ['MARKET', 'LIMIT', 'STOP'];

  return (
    <div className='order-type'>
      <span className='order-type-title'>Order Type</span>
      <button className='order-type-button' onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedType}</span>
        <img
          src='./TradingPanel/arrow-down.svg'
          alt='arrow down'
          className={`order-type-arrow ${
            isOpen ? 'order-type-arrow--open' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='order-type-dropdown'>
          {orderTypes.map((type) => (
            <div
              key={type}
              className={`order-type-option ${
                selectedType === type ? 'order-type-option--selected' : ''
              }`}
              onClick={() => {
                setSelectedType(type);
                setIsOpen(false);
              }}
            >
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
