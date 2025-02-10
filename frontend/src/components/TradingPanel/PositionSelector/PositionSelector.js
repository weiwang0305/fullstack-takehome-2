import './PositionSelector.css';

export const PositionSelector = ({ position, setPosition }) => {
  return (
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
  );
};
