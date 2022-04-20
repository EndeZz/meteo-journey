import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import Button from '../Button';
import './CardItem.scss';
import useToggle from '../../hooks/useToggle';

const CardItem = ({ data }) => {
  const [isFavorite, onFavorite] = useToggle(true);

  const navigate = useNavigate();

  const goToPages = useCallback(
    (e) => {
      e.preventDefault();
      navigate(`/city/` + data.city);
    },
    [navigate]
  );

  return (
    <article className="card-item__item">
      <Button className="btn card-item__favorite" onClick={onFavorite}>
        <Icon
          className="icon card-item__favorite_icon"
          name={isFavorite ? 'favorite' : 'unfavorite'}
          width={24}
          height={24}
        />
      </Button>

      <span className="card-item__pic">
        <Icon name="cloud" width={78} height={78} />
      </span>

      <div className="card-item__desc">
        <span className="card-item__temp">{data.temp}</span>
        <h3 className="card-item__city">{data.name}</h3>
        <div className="card-item__meta">
          <p className="card-item__date">{data.date}</p>
          <p className="card-item__time">Сейчас {data.time}</p>
        </div>
      </div>

      <Link to="city" className="btn card-item__btn_more" onClick={goToPages}>
        Подробнее <Icon className="icon" name="right_arrow" width={24} height={24} />
      </Link>
    </article>
  );
};

export default CardItem;
