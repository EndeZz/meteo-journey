import './Card.scss';
import React from 'react';
import CardItem from '../CardItem/CardItem';

const cardData = [
  {
    name: 'Москва',
    date: '20.04.2022',
    time: '18:30',
    temp: '-13',
    desc: 'Облачно с прояснениями',
  },
  {
    name: 'Ижевск',
    date: '20.04.2022',
    time: '18:30',
    temp: '-13',
    desc: 'Облачно с прояснениями',
  },
  {
    name: 'Саратов',
    date: '20.04.2022',
    time: '18:30',
    temp: '-13',
    desc: 'Облачно с прояснениями',
  },
  {
    name: 'Питер',
    date: '20.04.2022',
    time: '18:30',
    temp: '-13',
    desc: 'Облачно с прояснениями',
  },
  {
    name: 'Лондон',
    date: '20.04.2022',
    time: '18:30',
    temp: '-13',
    desc: 'Облачно с прояснениями',
  },
  {
    name: 'Киев',
    date: '20.04.2022',
    time: '18:30',
    temp: '-13',
    desc: 'Облачно с прояснениями',
  },
];

const Card = () => {
  return (
    <div className="cards">
      {cardData.map((data, i) => (
        <CardItem data={data} key={i} />
      ))}
    </div>
  );
};

export default Card;
