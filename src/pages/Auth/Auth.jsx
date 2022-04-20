import './Auth.scss';
import React, { useState } from 'react';
import Button from '../../components/Button';

function Auth() {
  const [login, setLogin] = useState(true);

  return (
    <main className="container">
      <div className="auth__wrapper">
        <Button className="btn btn__primary" onClick={() => setLogin(!login)}>
          {login ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </div>
    </main>
  );
}

export default Auth;
