import './OpenPriceDisplay.css';

export const OpenPriceDisplay = ({ latestData }) => {
  return (
    <div className='open-price-container'>
      <p>Open Price</p>
      <p>{latestData?.close}</p>
      <p>USD</p>
    </div>
  );
};
