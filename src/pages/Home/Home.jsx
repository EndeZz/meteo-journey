import React, { useState } from 'react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Icon from '../../components/Icon';
import './Home.scss';

const Home = () => {
  const [inputValue, setInputValue] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputValue);
  };

  return (
    <main className="home">
      <section className="container">
        <form action="#" className="home__form" onSubmit={handleSubmit}>
          <Input
            type="text"
            className="input home__search"
            value={inputValue}
            placeholder="Введите город"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <div className="home__info">
          <Icon name="arrow" className="icon home__info-arrow" width={24} height={24} />

          <p className="home__info-text">Введите город или место</p>
        </div>

        <Card />
      </section>
    </main>
  );
};

export default Home;
