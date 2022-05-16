import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Suggestions from '../../components/Suggestions';
import { useTitle } from '../../hooks/useTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCity } from '../../redux/city/actions';
import { useFirestoreConnect } from 'react-redux-firebase';
import { fetchWeather } from '../../redux/weather/actions';
import { authUidSelector } from '../../redux/auth/authSelectors';
import {
  weatherCitiesSelector,
  weatherLoadingSelector,
} from '../../redux/weather/weatherSelectors';
import { favoriteValuesSelector } from '../../redux/favorite/favoriteSelectors';
import { citySuggestionsSelector } from '../../redux/city/citySelectors';
import { useInterval } from '../../hooks/useInterval';
import './Home.scss';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const weatherCities = useSelector(weatherCitiesSelector);
  const loading = useSelector(weatherLoadingSelector);
  const cities = useSelector(citySuggestionsSelector);
  const favoriteValues = useSelector(favoriteValuesSelector);
  const authUid = useSelector(authUidSelector);
  const dispatch = useDispatch();

  useTitle(`MeteoJourney: Прогноз погоды`);
  useFirestoreConnect(() => [
    {
      collection: 'favorites',
      where: ['authorId', '==', authUid ?? ''],
      orderBy: ['date', 'desc'],
    },
  ]);

  // Через каждый промежуток времени обновлять данные о погоде
  useInterval(() => {
    dispatch(fetchWeather(favoriteValues));
  }, 1000 * 15);

  // Получение "избранных" городов из firebase
  useEffect(() => {
    if (!favoriteValues || favoriteValues.length === 0) return <Loader />;

    dispatch(fetchWeather(favoriteValues));
  }, [dispatch, favoriteValues]);

  const handleChange = useCallback(
    (e) => {
      if (e.target.value.length > 3) {
        dispatch(fetchCity(searchValue));
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

          {searchValue.length > 0 && <Suggestions searchValue={searchValue} suggestions={cities} />}
        </div>

        {favoriteValues && favoriteValues.length > 0 ? (
          <Card favorites={weatherCities} />
        ) : (
          <div className="home__info">
            <Icon
              name="arrow"
              className="home__info-arrow"
              width={24}
              height={24}
              aria-hidden={true}
            />
            <p className="home__info-text">Начните вводить город или место</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
