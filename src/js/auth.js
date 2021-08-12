import config from '../config.json';
import { api } from './functions';
import { refs } from './refs';

// import validator from 'validator';

const getUserData = () => {
  const inputEmail = document.querySelector('#email');
  const inputEmailValue = inputEmail.value.trim();
  const inputPassword = document.querySelector('#password');
  const inputPasswordValue = inputPassword.value.trim();

  return {
    data: {
      email: inputEmailValue,
      password: inputPasswordValue,
    },
    auth: false,
  };
};
export function registr() {
  api.postData(config.auth.register.link, getUserData()).then(data => {
    // console.log(data);
    if (data.registrationDate && data.email && data.id) {
      refs.modal.innerHTML = '';
      // logIn();
      console.log(data.email);
    }
    if (data.message) console.log(data.message);
    // console.log(data);
  });

  // if (data.accessToken) {
  //   console.log(data.accessToken);
  // refs.modal.innerHTML = '';
  // }
  // form.reset();
}

export function logIn() {
  api.postData(config.auth.login.link, getUserData()).then(data => {
    console.log(data);
    if (data.message) console.log(data.message);
    if (data.accessToken) {
      // console.log(data.accessToken);
      refs.modal.innerHTML = '';
    }
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('sid', data.sid);
    api.data.user = data.user;
    console.log(api.data);
    // return data;
    //
  });
}
export function logOut() {
  console.log(api.data);
  const objLogOut = {
    auth: true,
    body: false,
  };
  api.postData(config.auth.logout.link, objLogOut).then(data => {
    console.log(data);
  });
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('sid');
}

// form.reset();
