import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  fullScreen = false,
  text
}) => {
  const spinner = (
    <>
      <div className="loading-spinner" />
      {text && <span className="loading-text">{text}</span>}
    </>
  );

  if (fullScreen) {
    return (
      <div className="loading-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
};
