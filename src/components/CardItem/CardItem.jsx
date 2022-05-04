import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import Button from '../Button';
import './CardItem.scss';
import { useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../redux/favorite/actions';

const CardItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToPages = useCallback(
    (e) => {
      e.preventDefault();
      navigate(`/city/${item.name}`);
    },
    [navigate]
  );

  const handleFavorite = useCallback(() => {
    dispatch(removeFromFavorites(item));
  }, [dispatch]);

  return (
    <article className="card-item__item">
      <Button className="btn card-item__favorite" onClick={handleFavorite}>
        <Icon
          className="icon card-item__favorite_icon"
          name={!!item.name ? 'favorite' : 'unfavorite'}
          width={24}
          height={24}
        />
      </Button>

      <span className="card-item__pic">
        <Icon name="cloud" width={78} height={78} />
      </span>

      <div className="card-item__desc">
        <span className="card-item__temp">{item.temp}</span>
        <h3 className="card-item__city">{item.name}</h3>
        <div className="card-item__meta">
          <p className="card-item__date">{item.date}</p>
          <p className="card-item__time">Сейчас {item.time}</p>
        </div>
      </div>

      <Link to="city" className="btn card-item__btn_more" onClick={goToPages}>
        Подробнее <Icon className="icon" name="right_arrow" width={24} height={24} />
      </Link>
    </article>
  );
};

export default CardItem;
