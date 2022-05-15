import './Suggestions.scss';
import React from 'react';
import { v4 as createId } from 'uuid';
import { Link } from 'react-router-dom';

const Suggestions = ({ suggestions, searchValue }) => {
  return (
    <ul className="home__suggestions_list">
      {suggestions && searchValue.length > 3 ? (
        suggestions.map((item) => (
          <li className="home__suggestions_item" key={createId()}>
            <Link to={`/city/${item.data.city}`} className="home__suggestions_link">
              <span className="home__suggestions_current">{item.data.city}</span>
            </Link>
          </li>
        ))
      ) : (
        <li className="home__suggestions_item" key={createId()}>
          <span className="home__suggestions_notice">
            Пожалуйста, уточните запрос (минимум 3 символа)
          </span>
        </li>
      )}
    </ul>
  );
};

export default Suggestions;
