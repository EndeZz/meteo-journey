import './Button.scss';
import React from 'react';

const Button = ({
  children,
  className = '',
  disabled = false,
  onClick = () => {},
  ...attrs
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...attrs}>
      {children}
    </button>
  );
};

export default Button;
