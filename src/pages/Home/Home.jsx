import React, { useState } from 'react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Icon from '../../components/Icon';
import './Home.scss';
import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';

const CITIES = [
  {
    city_id: '1',
    name: 'Москва',
  },
  {
    city_id: '2',
    name: 'Московия',
  },
];

const Home = () => {
  useTitle(`MeteoJourney: Прогноз погоды`);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  let isTestMode = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue(searchValue);
  };

  const handleChange = (e) => {
    let matches = [];
    if (e.target.value.length > 2) {
      matches = CITIES.sort().filter((city) => {
        const regex = new RegExp(`${e.target.value}`, 'gi');
        return city.name.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchValue(e.target.value);
  };

  return (
    <main className="home">
      <section className="container">
        <form action="#" className="home__form" onSubmit={handleSubmit}>
          <Input
            type="search"
            className="input home__search"
            value={searchValue}
            placeholder="Введите город"
            onChange={handleChange}
          />
          <ul className="home__suggestions_list">
            {suggestions &&
              suggestions.map((item) => {
                const i = item.name.toLowerCase().indexOf(searchValue.toLowerCase());
                return (
                  <li className="home__suggestions_item" key={item.city_id}>
                    <Link to={''} className="home__suggestions_link">
                      <span className="home__suggestions_link_remainder">
                        {item.name.substring(0, i)}
                      </span>

                      <span className="home__suggestions_link_current">
                        {item.name.substring(i, i + searchValue.length)}
                      </span>

                      <span className="home__suggestions_link_remainder">
                        {item.name.substring(i + searchValue.length)}
                      </span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </form>
        {isTestMode ? (
          <div className="home__info">
            <Icon name="arrow" className="icon home__info-arrow" width={24} height={24} />

            <p className="home__info-text">Начните вводить город или место</p>
          </div>
        ) : (
          <Card />
        )}
      </section>
    </main>
  );
};

export default Home;
