import React from 'react';
import Icons from './../../../public/images/icons/sprites.svg';

const Icon = ({
  name,
  width,
  height,
  ...attrs
}) => {
  return (
    <svg width={width} height={height} {...attrs}>
      <use xlinkHref={`${Icons}#${name}`} />
    </svg>
  );
};

export default Icon;
