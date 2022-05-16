import React from 'react';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import Input from '../../../components/Input';
import useToggle from '../../../hooks/useToggle';

function Login({ formValues, formErrors, handleChange, handleSubmit, authUserErrors }) {
  const [isPasswordVisible, togglePasswordVisible] = useToggle(true);

  return (
    <>
      <h2 className="auth__title">Вход</h2>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label">
          <Input
            type="email"
            name="email"
            className="input"
            value={formValues.email}
            placeholder="Введите почту"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        {formErrors.email && (
          <span className="auth__caption auth__caption_error">{formErrors.email}</span>
        )}
        <label className="auth__label">
          <Input
            type={isPasswordVisible ? 'password' : 'text'}
            name="password"
            className="input"
            value={formValues.password}
            placeholder="Введите пароль"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span
            className="btn auth__label_password-mode"
            onClick={togglePasswordVisible}
            title={isPasswordVisible ? 'Показать пароль' : 'Скрыть пароль'}>
            <Icon
              name={isPasswordVisible ? 'eye-not-visible-icon' : 'eye-visible-icon'}
              width={24}
              height={24}
              aria-hidden={true}
            />
          </span>
        </label>
        {formErrors.password && (
          <span className="auth__caption auth__caption_error">{formErrors.password}</span>
        )}
        {authUserErrors && (
          <span className="auth__caption auth__caption_error">{authUserErrors}</span>
        )}
        <Button className="btn btn_primary auth__btn" type="submit">
          Войти
        </Button>
      </form>
    </>
  );
}

export default Login;
