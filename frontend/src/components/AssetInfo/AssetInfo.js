import './AssetInfo.css';

export const AssetInfo = ({ tickerData }) => {
  return (
    <div className='asset-info'>
      <div className='asset-info-block'>
        <p className='asset-ticker'>{tickerData?.symbol}</p>
      </div>
      <div className='asset-info-block'>
        <p className='asset-description'>PRICE</p>
        <p className='asset-value'>${tickerData?.price}</p>
      </div>
      <div className='asset-info-block'>
        <p className='asset-description'>24H CHANGE</p>
        <p className='asset-value'>{`${tickerData?.priceChange24Hr}`}</p>
      </div>
      <div className='asset-info-block'>
        <p className='asset-description'>1H FUNDING</p>
        <p className='asset-value'>{`${tickerData?.hourlyFunding * 100}%`}</p>
      </div>
      <div className='asset-info-block'>
        <p className='asset-description'>LONG OPEN INTEREST</p>
        <p className='asset-value'>{tickerData?.hourlyFunding}</p>
      </div>
      <div className='asset-info-block'>
        <p className='asset-description'>SHORT OPEN INTEREST</p>
        <p className='asset-value'>{tickerData?.hourlyFunding}</p>
      </div>
    </div>
  );
};
