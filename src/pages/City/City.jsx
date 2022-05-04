import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { useTitle } from '../../hooks/useTitle';
import useToggle from '../../hooks/useToggle';
import { getWeatherIcon } from '../../utils/getWeatherIcon';
import { v4 as createId } from 'uuid';
import './City.scss';
import { fetchWeatherMore } from '../../redux/weather/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favorite/actions';
import Loader from '../../components/Loader';
import { getCityTime, getFullDate, getWeekDay } from '../../utils/helpers';

const City = () => {
  useTitle(`MeteoJourney: Погода в городе`);
  const { name } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { weatherData } = useSelector((state) => state.weatherInfo);
  const favorites = useSelector((state) => state.favorites);

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      navigate(-1);
    },
    [navigate]
  );

  const getFetchForecast = useCallback(() => dispatch(fetchWeatherMore(name)), [dispatch]);

  // Добавить город в избранное или удалить его, если данный город уже есть в избранном
  const handleFavorites = () => {
    const currentCityName = favorites.find((city) => city.name === name);
    if (currentCityName) {
      dispatch(removeFromFavorites(currentCityName));
    } else {
      dispatch(
        addToFavorites({
          name: name,
          temp: Math.round(weatherData.current.temp - 273.15),
          date: getFullDate(weatherData.current),
          time: getCityTime(),
        })
      );
    }
    setIsFavorite((prev) => !prev);
  };

  // получение информации о погоде в выбранном городе
  useEffect(() => {
    getFetchForecast();
    favorites.find((city) => city.name === name) ? setIsFavorite(true) : setIsFavorite(false);
  }, [name]);

  return (
    <main className="city container">
      {JSON.stringify(weatherData) !== '{}' ? (
        <>
          <section className="city__section">
            <ul className="city__list">
              <li className="city__item">
                <Button className="btn city__back-link" onClick={goBack}>
                  <Icon
                    name="left_arrow_circle"
                    className="icon"
                    width={24}
                    height={24}
                    aria-hidden={true}
                  />

                  <p className="city__back-link_caption">Назад</p>
                </Button>
              </li>
              <li className="city__item city__favorite">
                <Button className="btn" onClick={handleFavorites}>
                  <Icon
                    name={isFavorite ? `favorite` : `unfavorite`}
                    className="icon"
                    width={24}
                    height={24}
                  />
                </Button>
              </li>
            </ul>

            <div className="city__content">
              <h2 className="city__title">{name}</h2>
              <span>Погода: Сейчас</span>
              <p className="city__date">{`${getWeekDay(weatherData.current)} ${getFullDate(
                weatherData.current
              )}`}</p>
              <p className="city__time">Время: </p>
              <div className="city__degree">
                <img
                  src={getWeatherIcon(weatherData.current.weather[0].main)}
                  alt="Weather icon"
                  className="city_day-icon"
                />
                <p className="city__degree-text">
                  {Math.round(weatherData.current.temp - 273)}&#176;
                </p>
              </div>
              <p className="city__pressure">
                {Math.round(weatherData.current.pressure / 1.333)} мм рт. ст.
              </p>
              <p className="city__subtitle">{weatherData.current.weather[0].description}</p>
            </div>
          </section>

          <aside className="city__sidebar">
            <ul className="city__sidebar_wrapper">
              {weatherData.daily.map((item) => (
                <li className="city__sidebar_item" key={createId()}>
                  <div className="city__sidebar_meta">
                    <h3 className="city__sidebar_weekday">{getWeekDay(item)}</h3>
                    <p className="city__sidebar_date">{getFullDate(item)}</p>
                  </div>
                  <div className="city__sidebar_degree">
                    <span>{Math.round(item.temp.day - 273.15)}&#176;</span>
                    <img
                      src={getWeatherIcon(item.weather[0].main)}
                      alt="Weather icon"
                      className="city__sidebar_day-icon"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default City;
