import './Dropdown.scss';
import React from 'react';
import Button from '../Button';
import Icon from '../Icon';

const Dropdown = ({ handleSignOut, userEmail }) => {
  return (
    <>
      <div className="dropdown">
        <ul className="dropdown__list">
          <li className={`dropdown__item`}>
            <p className="dropdown__username">{userEmail}</p>
          </li>
          <li className="dropdown__item">
            <Button className="btn dropdown__btn" onClick={handleSignOut}>
              <Icon name="logout" width={24} height={24} aria-hidden={true} />
              <p>Выйти</p>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
