import './ChartControls.css';

export const ChartControls = () => {
  return (
    <div className='chart-controls'>
      <div className='left-controls'>
        <span>
          <img src='./add-circle.svg' alt='add-circle' />
        </span>
        <span>1H</span>
        <span>
          <img src='./candels.svg' alt='candels' />
        </span>
        <span>
          <img src='./Vector_fx.svg' alt='FX' />
          INDICATORS
        </span>
      </div>
      <div className='right-controls'>
        <img src='./ChartControls/setting.svg' alt='chart settings button' />
        <img src='./ChartControls/scan.svg' alt='chat zoom button' />
        <img src='./ChartControls/camera.svg' alt='chat camera button' />
      </div>
    </div>
  );
};
