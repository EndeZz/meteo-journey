import './NotFound.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useTitle } from '../../hooks/useTitle';

function NotFound() {
  useTitle(`MeteoJourney: Страница не найдена`);

  return (
    <main className="not-found">
      <div className="container">
        <h2 className="not-found__title">
          Ошибка <span>404</span>
        </h2>
        <p className="not-found__subtitle">Страница не найдена.</p>
        <p className="not-found__subtitle">
          Вернуться на&nbsp;
          <Link to="/" className="not-found_back">
            главную страницу <Icon className="icon" name="right_arrow" width={24} height={24} />
          </Link>
        </p>
      </div>
    </main>
  );
}

export default NotFound;
