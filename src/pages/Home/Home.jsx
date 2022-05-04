import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Icon from '../../components/Icon';
import './Home.scss';
import { useTitle } from '../../hooks/useTitle';
import { CITY_API, WEATHER_API } from '../../constants/api';
import { fetchApi } from '../../utils/fetchApi';
import { useSelector } from 'react-redux';
import Suggestion from '../../components/Suggestions';

const Home = () => {
  useTitle(`MeteoJourney: Прогноз погоды`);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const favorites = useSelector((state) => state.favorites);

  const fetchCities = useCallback(async () => {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + CITY_API.KEY,
      },
      body: JSON.stringify({
        query: searchValue,
        from_bound: { value: 'city' },
        to_bound: { value: 'city' },
        locations: [
          {
            city_type_full: 'город',
          },
          // {
          //   country: '*',
          // },
        ],
        restrict_value: true,
      }),
    };
    const cityData = await fetchApi(CITY_API.URL, options);
    console.log(cityData.suggestions);
    setSuggestions(cityData.suggestions);
  }, [searchValue]);

  const handleChange = useCallback(
    (e) => {
      if (e.target.value.length > 2) {
        fetchCities();
      }
      setSearchValue(e.target.value);
    },
    [searchValue]
  );

  return (
    <main className="home">
      <section className="container">
        <div className="home__wrapper">
          <Input
            type="search"
            className="input home__search"
            value={searchValue}
            name="search"
            autoComplete="off"
            placeholder="Найти на сайте"
            onChange={handleChange}
          />

          {searchValue.length > 0 && (
            <Suggestion searchValue={searchValue} suggestions={suggestions} />
          )}
        </div>

        {favorites.length <= 0 ? (
          <div className="home__info">
            <Icon name="arrow" className="icon home__info-arrow" width={24} height={24} />
            <p className="home__info-text">Начните вводить город или место</p>
          </div>
        ) : (
          <Card favorites={favorites} />
        )}
      </section>
    </main>
  );
};

export default Home;
