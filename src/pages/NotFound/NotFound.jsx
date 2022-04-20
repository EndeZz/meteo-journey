import './NotFound.scss';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="not-found">
      <div className="container">
        <h2 className="not-found__title">
          Ошибка <span>404</span>
        </h2>
        <p className="not-found__subtitle">Страница не найдена.</p>
        <p className="not-found__subtitle">
          Вернуться на&nbsp;
          <Link to='/'> главную страницу</Link>
        </p>
      </div>
    </main>
  );
}

export default NotFound;
