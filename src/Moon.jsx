import React from 'react';
import './Moon.css';

const Moon = () => {
  return (
    <div className="moon-container">
      <div className="moon">
        <div className="moon-glow"></div>
        <div className="moon-craters">
          <div className="crater crater-1"></div>
          <div className="crater crater-2"></div>
          <div className="crater crater-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Moon;
