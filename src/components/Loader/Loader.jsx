import './Loader.scss';
import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__wrapper">
        <div className="loader__inner"><div></div><div></div><div></div><div></div></div>
        <p className="loader__title">Подождите, идет загрузка</p>
      </div>
    </div>
  );
};

export default Loader;
