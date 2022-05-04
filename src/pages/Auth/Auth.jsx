import './Auth.scss';
import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import { useTitle } from '../../hooks/useTitle';

function Auth() {
  useTitle(`MeteoJourney: Авторизация`);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="auth">
      <section className="auth__section">
        <div className="auth__content">
          <h2 className="auth__title">Авторизация</h2>
          <form action="#" className="auth__form" onSubmit={handleSubmit}>
            <Input
              type="email"
              className="input"
              value={email}
              placeholder="Введите почту"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              className="input"
              value={password}
              placeholder="Введите пароль"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="btn btn__primary" type="submit">
              Войти
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Auth;
