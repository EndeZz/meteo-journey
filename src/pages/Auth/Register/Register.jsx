import React from 'react';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import Input from '../../../components/Input';
import useToggle from '../../../hooks/useToggle';

function Register({ formValues, formErrors, handleChange, handleSubmit, authUserErrors }) {
  const [isPasswordVisible, togglePasswordVisible] = useToggle(true);
  const [isConfirmPasswordVisible, toggleConfirmPasswordVisible] = useToggle(true);

  return (
    <>
      <h2 className="auth__title">Регистрация</h2>
      <span className="auth__caption">Никому не сообщайте Ваш пароль!</span>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label">
          <Input
            type="email"
            name="email"
            className={`input ${formErrors.email || authUserErrors ? 'input_error' : ''}`}
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
            className={`input ${formErrors.password ? 'input_error' : ''}`}
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
        <label className="auth__label">
          <Input
            type={isConfirmPasswordVisible ? 'password' : 'text'}
            name="confirmPassword"
            className={`input ${formErrors.confirmPassword ? 'input_error' : ''}`}
            value={formValues.confirmPassword}
            placeholder="Повторите пароль"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <span
            className="btn auth__label_password-mode"
            onClick={toggleConfirmPasswordVisible}
            title={isConfirmPasswordVisible ? 'Показать пароль' : 'Скрыть пароль'}>
            <Icon
              name={isConfirmPasswordVisible ? 'eye-not-visible-icon' : 'eye-visible-icon'}
              width={24}
              height={24}
              aria-hidden={true}
            />
          </span>
        </label>
        {formErrors.confirmPassword && (
          <span className="auth__caption auth__caption_error">{formErrors.confirmPassword}</span>
        )}
        {authUserErrors && (
          <span className="auth__caption auth__caption_error">{authUserErrors}</span>
        )}
        <Button className="btn btn_primary auth__btn" type="submit">
          Создать аккаунт
        </Button>
      </form>
    </>
  );
}

export default Register;
