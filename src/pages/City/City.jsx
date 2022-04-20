import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import useToggle from '../../hooks/useToggle';
import './City.scss';

const City = () => {
  const [isFavorite, onFavorite] = useToggle(true);
  const navigate = useNavigate();

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      navigate('/');
    },
    [navigate]
  );

  return (
    <main className="city container">
      <section className="city__section">
        <div className="city__wrapper">
          <ul className="city__list">
            <li className="city__item">
              <Button className="btn city__back-link" onClick={goBack}>
                <p className="city__back-link_caption">Назад</p>
              </Button>
            </li>
            <li className="city__item city__bookmark">
              <Button className="btn" onClick={onFavorite}>
                <Icon
                  name={isFavorite ? `favorite` : `unfavorite`}
                  className="icon"
                  width={24}
                  height={24}
                />{' '}
              </Button>
            </li>
          </ul>

          <div className="city__content">
            <h2 className="city__title">Москва</h2>
            <p className="city__time-caption">Сейчас 18:00</p>
            <div className="city__degree">
              <div className="city__degree-img">
                <Icon name="cloud" className="icon" width={120} height={120} aria-hidden={true} />
              </div>
              <p className="city__degree-text">-13&#176;</p>
            </div>
            <div className="city__pressure">
              <p className="city__pressure-text">756 мм рт. ст.</p>
            </div>

            <p className="city__subtitle">Облачно с прояснениями</p>
          </div>
        </div>
      </section>

      <aside className="city__sidebar">
        <ul className="city__sidebar_wrapper">
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <span className="city__sidebar_degrees">+16&#176;</span>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <span className="city__sidebar_degrees">+16&#176;</span>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <span className="city__sidebar_degrees">+16&#176;</span>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <span className="city__sidebar_degrees">+16&#176;</span>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <span className="city__sidebar_degrees">+16&#176;</span>
          </li>
        </ul>
      </aside>
    </main>
  );
};

export default City;
