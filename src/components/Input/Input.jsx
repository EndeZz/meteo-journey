import './Input.scss';
import React from 'react';

const Input = ({
  type='text',
  id,
  className = '',
  value = '',
  onChange,
  ...attrs
}) => {
  const handleChange = (event) => {
    if (onChange) onChange(event);
  };

  return (
    <input
      type={type}
      id={id}
      className={className}
      value={value}
      onChange={handleChange}
      {...attrs}
    />
  );
};

export default Input;
