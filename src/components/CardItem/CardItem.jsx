import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import Button from '../Button';
import './CardItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../../redux/favorite/actions';
import { getWeatherIcon } from '../../utils/getWeatherIcon';
import { favoriteSelectors } from '../../redux/favorite/favoriteSelectors';

const CardItem = ({ item }) => {
  const currentFavoriteValues = useSelector((state) => favoriteSelectors(state, item.name));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToPages = useCallback(
    (e) => {
      e.preventDefault();
      navigate(`/city/${item.name}`);
    },
    [navigate, item.name]
  );

  const handleFavorite = useCallback(() => {
    if (currentFavoriteValues) {
      dispatch(removeFromFavorites(currentFavoriteValues));
    }
  }, [dispatch, currentFavoriteValues]);

  return (
    <article className="card-item__item">
      <Button className="btn card-item__favorite" onClick={handleFavorite}>
        <Icon
          name={!!item.name ? 'favorite' : 'unfavorite'}
          width={24}
          height={24}
          aria-hidden={true}
        />
      </Button>

      <span className="card-item__pic">
        <img
          src={getWeatherIcon(item.weather[0].main)}
          alt="Weather icon"
          className="card-item__pic_icon"
        />
      </span>

      <div className="card-item__desc">
        <span className="card-item__temp">
          {item.temp} {Math.round(item.main.temp)}&#176;
        </span>
        <h3 className="card-item__city">{item.name}</h3>
        <div className="card-item__meta">
          <p className="card-item__date">{item.date}</p>
          <p className="card-item__time">Сейчас {item.time}</p>
        </div>
      </div>

      <Link to="city" className="btn card-item__btn_more" onClick={goToPages}>
        Подробнее <Icon name="arrow-right" width={24} height={24} aria-hidden={true} />
      </Link>
    </article>
  );
};

export default CardItem;
