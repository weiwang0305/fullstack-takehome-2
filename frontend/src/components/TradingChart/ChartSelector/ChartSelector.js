import './ChartSelector.css';

export const ChartSelector = ({ chartType }) => {
  return (
    <div className='chart-selector'>
      <span
        className={`chart-selector-option ${
          chartType === 'PRICE' ? 'chart-selector-option--active' : ''
        }`}
      >
        PRICE
      </span>
      <span
        className={`chart-selector-option ${
          chartType === 'FUNDING' ? 'chart-selector-option--active' : ''
        }`}
      >
        FUNDING
      </span>
    </div>
  );
};
