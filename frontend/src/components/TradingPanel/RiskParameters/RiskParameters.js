import './RiskParameters.css';

export const RiskParameters = () => {
  return (
    <div className='risk-parameters'>
      <div className='risk-parameter-row'>
        <span>Liquidation Price</span>
        <span>300,212 USDC</span>
      </div>

      <div className='risk-parameter-row'>
        <span>Slippage</span>
        <span>
          1.20 USDC <span className='risk-parameter-percent'>(0.3%)</span>
        </span>
      </div>

      <div className='risk-parameter-row'>
        <span>Fee</span>
        <span>
          2.00 USDC <span className='risk-parameter-percent'>(0.05%)</span>
        </span>
      </div>
    </div>
  );
};
