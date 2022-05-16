import './Suggestions.scss';
import React from 'react';
import { v4 as createId } from 'uuid';
import { Link } from 'react-router-dom';

const Suggestions = ({ suggestions, searchValue }) => {
  return (
    <ul className="suggestions__list">
      {suggestions && searchValue.length > 3 ? (
        suggestions.map((item) => (
          <li className="suggestions__item" key={createId()}>
            <Link to={`/city/${item.data.city}`} className="suggestions__link">
              <span className="suggestions__current">{item.data.city}</span>
            </Link>
          </li>
        ))
      ) : (
        <li className="suggestions__item" key={createId()}>
          <span className="suggestions__notice">
            Пожалуйста, уточните запрос (минимум 3 символа)
          </span>
        </li>
      )}
    </ul>
  );
};

export default Suggestions;
