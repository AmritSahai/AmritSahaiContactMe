import React from 'react';
import './Success.css';
import Moon from './Moon';
import Stars from './Stars';

const Success = ({ onGoBack }) => {
  return (
    <div className="success-container">
      <Stars />
      <Moon />
      <div className="success-content">
        <div className="success-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="none"/>
            <path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="success-title">Form Submitted Successfully!</h1>
        
        <div className="success-message">
          <p>Thank you!</p>
          <p>Your message has been sent.</p>
          <p>I will reply to you soon!</p>
        </div>
        
        <button onClick={onGoBack} className="go-back-button">
          Go back
        </button>
      </div>
    </div>
  );
};

export default Success;
