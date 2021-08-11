import config from '../config.json';
import { api } from './functions';

const getInputData = () => {
  const inputEmailValue = document.querySelector('#email').value.trim();
  const inputPasswordValue = document.querySelector('#password').value.trim();
  return {
    data: {
      email: inputEmailValue,
      password: inputPasswordValue,
    },
    auth: false,
  };
};
export function registr() {
  api.postData(config.auth.register.link, getInputData()).then(data => console.log(data));

  // form.reset();
}

export function logIn() {
  api.postData(config.auth.login.link, getInputData()).then(data => {
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('sid', data.sid);
    //
  });
}
export function logOut() {
  console.log(api.data);
  const objLogOut = {
    auth: true,
    body: false,
  };

  api.postData(config.auth.logout.link, objLogOut).then(data => data);
}
export const getUserData = () => {
  api
    .getData('/user', {
      auth: true,
      body: false,
    })
    .then(data => {
      api.data.user = data;
      console.log(api.data);
    });
};
// form.reset();
