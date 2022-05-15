import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import Icon from '../Icon/Icon';
import Button from '../Button';
import Dropdown from '../Dropdown/Dropdown';
import LogoImg from '../../../public/logo.png';
import { signOut } from '../../redux/auth/actions';
import { authSelector } from '../../redux/auth/authSelectors';
import './Header.scss';

function Header() {
  const auth = useSelector(authSelector);
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);
  const refToggleDropDown = useRef(null);
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    const listener = (event) => {
      if (refToggleDropDown.current) {
        if (!refToggleDropDown.current.contains(event.target)) {
          setIsVisibleDropDown(false);
        }
      }
      return;
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);

  const handleToggleDropDown = () => {
    setIsVisibleDropDown((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="container header__wrapper">
        <Link to="/" className="header__link">
          <h1 className="hidden">MeteoJourney</h1>
          <img className="header__logo-pic" src={LogoImg} alt="Логотип" />
        </Link>

        <div className="header__btn-group" ref={refToggleDropDown}>
          {auth.uid ? (
            <>
              <div>
                <Button
                  className={`btn header__user ${isVisibleDropDown ? 'header__user_active' : ''}`}
                  onClick={handleToggleDropDown}>
                  <Icon
                    className="header__user_pic"
                    name="user"
                    width={48}
                    height={48}
                    aria-hidden={true}
                  />
                </Button>
                {isVisibleDropDown && (
                  <Dropdown handleSignOut={handleSignOut} userEmail={auth.email} />
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn btn_primary">
                <Icon className="icon" name="user" width={24} height={24} />
                <p>Войти</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
