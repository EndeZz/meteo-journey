import './Auth.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useTitle } from '../../hooks/useTitle';
import { signIn, signUp } from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from '../../utils/validate';
import Login from './Login';
import Register from './Register';
import { authSelector, authUserErrorSelector } from '../../redux/auth/authSelectors';
import useToggle from '../../hooks/useToggle';

function Auth() {
  const [isLogin, updateIsLoginMode] = useToggle(true);
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const auth = useSelector(authSelector);
  const authUserErrors = useSelector(authUserErrorSelector);
  const dispatch = useDispatch();

  useTitle(`MeteoJourney: ${isLogin ? 'Авторизация' : 'Регистрация'}`);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      if (JSON.stringify(formErrors) === '{}') {
        if (isLogin) {
          dispatch(signIn({ email: formValues.email, password: formValues.password }));
        } else {
          if (formValues.password === formValues.confirmPassword) {
            dispatch(signUp({ email: formValues.email, password: formValues.password }));
          }
        }
      }
    },
    [dispatch, formValues, formErrors, isLogin]
  );

  const handleChange = useCallback(
    (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    },
    [formValues]
  );

  return (
    <>
      {auth.uid ? (
        <Navigate to={-1} replace />
      ) : (
        <main className="auth">
          <section className="auth__section">
            <div className="auth__content">
              {isLogin ? (
                <>
                  <Login
                    formValues={formValues}
                    formErrors={formErrors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    authUserErrors={authUserErrors}
                  />
                  <Button className="btn btn_outline" onClick={updateIsLoginMode}>
                    Регистрация
                  </Button>
                </>
              ) : (
                <>
                  <Register
                    formValues={formValues}
                    formErrors={formErrors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    authUserErrors={authUserErrors}
                  />
                  <Button className="btn btn_outline" onClick={updateIsLoginMode}>
                    Уже есть аккаунт?
                  </Button>
                </>
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default Auth;
