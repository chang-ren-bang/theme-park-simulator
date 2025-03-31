import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = '錯誤',
  message,
  onClose
}) => {
  return (
    <div className="error-message" role="alert">
      <svg
        className="error-message-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12" y2="16" />
      </svg>
      
      <div className="error-message-content">
        <div className="error-message-title">{title}</div>
        <div className="error-message-description">{message}</div>
      </div>

      {onClose && (
        <button
          className="error-message-close"
          onClick={onClose}
          aria-label="關閉錯誤訊息"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};
