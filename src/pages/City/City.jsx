import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { useTitle } from '../../hooks/useTitle';
import useToggle from '../../hooks/useToggle';
import './City.scss';

const City = () => {
  const [isFavorite, onFavorite] = useToggle(true);
  const navigate = useNavigate();
  const { name } = useParams();
  useTitle(`MeteoJourney: Погода в городе`);

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      navigate(-1);
    },
    [navigate]
  );

  return (
    <main className="city container">
      <section className="city__section">
        <ul className="city__list">
          <li className="city__item">
            <Button className="btn city__back-link" onClick={goBack}>
              <Icon
                name="left_arrow_circle"
                className="icon"
                width={24}
                height={24}
                aria-hidden={true}
              />

              <p className="city__back-link_caption">Назад</p>
            </Button>
          </li>
          <li className="city__item city__favorite">
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
          <h2 className="city__title">{name}</h2>
          <p className="city__date">Среда, 20 апреля</p>
          <p className="city__time">Сейчас 18:00</p>
          <div className="city__degree">
            <Icon name="cloud" className="icon" width={120} height={120} aria-hidden={true} />

            <p className="city__degree-text">+16&#176;</p>
          </div>

          <p className="city__pressure">756 мм рт. ст.</p>

          <p className="city__subtitle">Облачно с прояснениями</p>
        </div>
      </section>

      <aside className="city__sidebar">
        <ul className="city__sidebar_wrapper">
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <div className="city__sidebar_degree">
              <span>+16&#176;</span>
              <Icon name="cloud" className="icon" width={24} height={24} aria-hidden={true} />
            </div>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <div className="city__sidebar_degree">
              <span>+16&#176;</span>
              <Icon name="cloud" className="icon" width={24} height={24} aria-hidden={true} />
            </div>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <div className="city__sidebar_degree">
              <span>+16&#176;</span>
              <Icon name="cloud" className="icon" width={24} height={24} aria-hidden={true} />
            </div>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <div className="city__sidebar_degree">
              <span>+16&#176;</span>
              <Icon name="cloud" className="icon" width={24} height={24} aria-hidden={true} />
            </div>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <div className="city__sidebar_degree">
              <span>+16&#176;</span>
              <Icon name="cloud" className="icon" width={24} height={24} aria-hidden={true} />
            </div>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <div className="city__sidebar_degree">
              <span>+16&#176;</span>
              <Icon name="cloud" className="icon" width={24} height={24} aria-hidden={true} />
            </div>
          </li>
          <li className="city__sidebar_item">
            <div className="city__sidebar_meta">
              <h3 className="city__sidebar_weekday">Понедельник</h3>
              <p className="city__sidebar_date">20 апреля</p>
            </div>
            <div className="city__sidebar_degree">
              <span>+16&#176;</span>
              <Icon name="cloud" className="icon" width={24} height={24} aria-hidden={true} />
            </div>
          </li>
        </ul>
      </aside>
    </main>
  );
};

export default City;
