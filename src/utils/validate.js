export const validate = (values) => {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const errors = {};

  if (!regexEmail.test(String(values.email).toLowerCase())) {
    errors.email = 'Некорректная почта';
  }
  if (values.password.length <= 6) {
    errors.password = 'Пароль должен быть от 6 символов';
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Пароли не совпадают';
  }
  return errors;
};
