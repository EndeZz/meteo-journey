import './Header.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';

function Header() {
  return (
    <header className="header">
      <div className="container header__wrapper">
        <Link to="/" className="header__link">
          <h1 className="header__title">
            <span>Meteo</span>Journey
          </h1>
        </Link>
        <div className="header__btn-group">
          <Link to="/auth" className="btn btn__primary">
            <Icon className="icon" name="user" width={24} height={24} />
            <p>Войти</p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
