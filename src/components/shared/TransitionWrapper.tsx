import React, { PropsWithChildren } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Transition.css';

interface TransitionWrapperProps {
  in: boolean;
  type?: 'fade' | 'slide' | 'scale';
  timeout?: number;
  unmountOnExit?: boolean;
  onExited?: () => void;
}

export const TransitionWrapper: React.FC<PropsWithChildren<TransitionWrapperProps>> = ({
  children,
  in: inProp,
  type = 'fade',
  timeout = 300,
  unmountOnExit = true,
  onExited
}) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={timeout}
      classNames={type}
      unmountOnExit={unmountOnExit}
      onExited={onExited}
    >
      {children}
    </CSSTransition>
  );
};
