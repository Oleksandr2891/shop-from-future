import Api from './api';
import config from '../config.json';
const api = new Api();
const getUserData = () => {
  const inputEmailValue = document.querySelector('#email').value.trim();
  const inputPasswordValue = document.querySelector('#password').value.trim();
  return {
    email: inputEmailValue,
    password: inputPasswordValue,
  };
};
export function registr() {
  api.postData(config.auth.register.link, getUserData()).then(data => console.log(data));

  // form.reset();
}

export function logIn() {
  api.postData(config.auth.login.link, getUserData()).then(data => {
    console.log(data);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('sid', data.sid);
    //
  });

  // form.reset();
}
