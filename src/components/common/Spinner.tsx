import { FC } from 'react';

const Spinner: FC = () => (
  <div className="spinner-outer">
    <div className="spinner-inner">
      <svg viewBox="22 22 44 44" className="spinner-svg">
        <circle className="spinner-circle" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
      </svg>
    </div>
  </div>
);

export default Spinner;

