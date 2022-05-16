import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { useTitle } from '../../hooks/useTitle';
import { getWeatherIcon } from '../../utils/getWeatherIcon';
import { v4 as createId } from 'uuid';
import { changeDay, fetchWeatherMore } from '../../redux/weather/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favorite/actions';
import Loader from '../../components/Loader';
import { getFullDate, getFullTime, getRandomCities, getWeekDay } from '../../utils/helpers';
import { useFirestoreConnect } from 'react-redux-firebase';
import { favoriteSelectors, favoriteValuesSelector } from '../../redux/favorite/favoriteSelectors';
import {
  weatherCurrentDaySelector,
  weatherDataSelector,
  weatherDaysSelector,
  weatherLoadingSelector,
} from '../../redux/weather/weatherSelectors';
import { useCityNameParam } from '../../hooks/useCityNameParam';
import './City.scss';
import { authUidSelector } from '../../redux/auth/authSelectors';
import { addToCities } from '../../redux/city/actions';
import { citiesValuesSelectors, cityAlreadyExistsSelectors } from '../../redux/city/citySelectors';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const City = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const [selected, setSelected] = useState(0);
  const [randomCities, setRandomCities] = useState([]);
  const name = useCityNameParam();
  const weatherData = useSelector(weatherDataSelector);
  const weatherDays = useSelector(weatherDaysSelector);
  const currentDay = useSelector(weatherCurrentDaySelector);
  const loading = useSelector(weatherLoadingSelector);
  const favoriteValues = useSelector(favoriteValuesSelector);
  const citiesValues = useSelector((state) => citiesValuesSelectors(state, name));
  const cityAlreadyExists = useSelector((state) => cityAlreadyExistsSelectors(state, name));
  const currentFavoriteValues = useSelector((state) => favoriteSelectors(state, name));
  const authUid = useSelector(authUidSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const randomCitiesValues = citiesValues && getRandomCities(citiesValues);

  useTitle(`MeteoJourney: Погода в городе`);
  useFirestoreConnect(() => [
    {
      collection: 'favorites',
      where: ['authorId', '==', authUid ?? ''],
    },
  ]);
  useFirestoreConnect(() => [{ collection: 'cities' }]);

  // получение информации о погоде в выбранном городе
  useEffect(() => {
    dispatch(fetchWeatherMore(name));
    setSelected(0);
  }, [name]);

  // Обновление иконки "избранного"
  useEffect(() => {
    if (currentFavoriteValues) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [name, favoriteValues]);

  // Сохранение рекомендаций в неизменном виде
  // Todo: исправить на более элегантный вариант
  useEffect(() => {
    setRandomCities(randomCitiesValues);
  }, [citiesValues]);

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      navigate(-1);
    },
    [navigate]
  );

  // Добавить город в избранное или удалить его, если данный город уже есть в избранном
  const handleFavorite = useCallback(() => {
    if (currentFavoriteValues) {
      dispatch(removeFromFavorites(currentFavoriteValues));
    } else {
      if (!cityAlreadyExists) {
        dispatch(addToCities({ name }));
      }
      dispatch(addToFavorites({ name }));
    }
    setIsFavorite((prev) => !prev);
  }, [dispatch, currentFavoriteValues]);

  // Отобразить конкретный день недели
  const handleChangeDays = useCallback(
    (day) => {
      setSelected(day);
      dispatch(changeDay(day));
    },
    [dispatch]
  );

  if (loading) return <Loader />;

  return (
    <main className="city container">
      {JSON.stringify(weatherData) !== '{}' && JSON.stringify(currentDay) !== '{}' && (
        <>
          <div className="city__container">
            <section className="city__section">
              <ul className="city__list">
                <li className="city__item">
                  <Button className="btn city__back-link" onClick={goBack}>
                    <Icon name="arrow-left-circle" width={24} height={24} aria-hidden={true} />

                    <p className="city__back-link_caption">Назад</p>
                  </Button>
                </li>
                <li className="city__item">
                  <Button
                    className="btn city__favorite"
                    onClick={handleFavorite}
                    disabled={!authUid}
                    data-tip
                    data-for="favorite-hints">
                    <Icon
                      name={isFavorite ? 'favorite' : 'unfavorite'}
                      width={24}
                      height={24}
                      aria-hidden={true}
                    />
                  </Button>
                  <ReactTooltip id="favorite-hints" effect="solid">
                    {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                  </ReactTooltip>
                </li>
              </ul>

              <div className="city__content">
                <h2 className="city__title">{name}</h2>
                <div className="city__date">
                  <p>
                    {getFullDate(currentDay.dt)}, {getWeekDay(currentDay.dt)}
                  </p>
                  <p>{currentDay.temp.day ? 'Погода днем' : 'Сейчас'}</p>
                </div>

                <div className="city__degree">
                  <img
                    src={getWeatherIcon(currentDay.weather[0].main)}
                    alt="Weather icon"
                    className="city_day-icon"
                  />
                  <p className="city__degree-text">
                    {Math.round(currentDay.temp.day ?? currentDay.temp)}&#176;C
                  </p>
                </div>
                <p className="city__desc">{currentDay.weather[0].description}</p>
                <ul className="city__annotation">
                  <li className="city__annotation-item">
                    <Icon name="pressure" width={24} height={24} aria-hidden={true} />
                    <p className="city__caption">Давление</p>
                    <p className="city__caption_value">
                      {Math.round(currentDay.pressure / 1.33322)} мм рт. ст.
                    </p>
                  </li>
                  <li className="city__annotation-item">
                    <Icon name="rainy" width={24} height={24} aria-hidden={true} />
                    <p className="city__caption">Влажность</p>
                    <p className="city__caption_value">{currentDay.humidity}%</p>
                  </li>
                  <li className="city__annotation-item">
                    <Icon name="wind" width={24} height={24} aria-hidden={true} />
                    <p className="city__caption">Ветер</p>
                    <p className="city__caption_value">{currentDay.wind_speed} мм/с</p>
                  </li>
                </ul>
              </div>
            </section>
            {citiesValues && citiesValues.length > 0 && (
              <section className="city__section">
                <p className="city__caption">Рекомендации</p>
                <div className="city__group-down">
                  {randomCities &&
                    randomCities.map((item) => (
                      <Link
                        to={`/city/${item}`}
                        className="btn btn_outline city__link"
                        key={createId()}>
                        {item}
                      </Link>
                    ))}
                </div>
              </section>
            )}
          </div>

          <aside className="city__sidebar">
            <div className="city__sidebar_caption">
              <Button
                className={`btn${isToday ? ' btn_secondary' : ' btn_outline'}`}
                onClick={() => setIsToday(true)}>
                3 дня
              </Button>
              <Button
                className={`btn${isToday ? ' btn_outline' : ' btn_secondary'}`}
                onClick={() => setIsToday(false)}>
                Неделя
              </Button>
            </div>
            <div className="city__sidebar_wrapper">
              <ul className="city__sidebar_list">
                {!isToday
                  ? weatherDays.map((item, index) => (
                      <li
                        className={`city__sidebar_item ${
                          selected === index ? 'city__sidebar_item_active' : ''
                        }`}
                        key={createId()}
                        onClick={() => handleChangeDays(index)}>
                        <div className="city__sidebar_meta">
                          <h3 className="city__sidebar_weekday">{getWeekDay(item.dt)}</h3>
                          <p className="city__sidebar_date">{getFullDate(item.dt)}</p>
                        </div>
                        <div className="city__sidebar_temp">
                          <span className="city__sidebar_temp_max">
                            {Math.round(item.temp.max)}&#176;
                          </span>
                          <span className="city__sidebar_temp_min">
                            {Math.round(item.temp.min)}&#176;
                          </span>
                          <img
                            src={getWeatherIcon(item.weather[0].main)}
                            alt="Weather icon"
                            className="city__sidebar_day-icon"
                          />
                        </div>
                      </li>
                    ))
                  : weatherData.hourly.map((item, index) => (
                      <li className="city__sidebar_item_today" key={createId()}>
                        <div className="city__sidebar_meta_flex">
                          <p className="city__sidebar_date">{getFullDate(item.dt)} -</p>
                          <p className="city__sidebar_time">{getFullTime(item.dt)}</p>
                        </div>
                        <div className="city__sidebar_temp">
                          <span className="city__sidebar_temp_current">
                            {Math.round(item.temp)}&#176;
                          </span>
                          <img
                            src={getWeatherIcon(item.weather[0].main)}
                            alt="Weather icon"
                            className="city__sidebar_day-icon"
                          />
                        </div>
                      </li>
                    ))}
              </ul>
            </div>
          </aside>
        </>
      )}
    </main>
  );
};

export default City;
