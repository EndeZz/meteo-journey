import './Card.scss';
import React from 'react';
import CardItem from '../CardItem/CardItem';
import { v4 as createId } from 'uuid';

const Card = ({ favorites }) => {
  return (
    <div className="cards">
      {favorites.map((item) => (
        <CardItem item={item} key={createId()} />
      ))}
    </div>
  );
};

export default Card;
