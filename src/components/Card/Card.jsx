import './Card.scss';
import React from 'react';
import CardItem from '../CardItem/CardItem';

const Card = ({ favorites }) => {
  return (
    <div className="cards">
      {favorites.map((item) => (
        <CardItem item={item} key={item.name} />
      ))}
    </div>
  );
};

export default Card;
