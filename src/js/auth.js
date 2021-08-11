import config from '../config.json';
import { api } from './functions';

const getUserData = () => {
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
export const registr = () =>{
  api.postData(config.auth.register.link, getUserData()).then(data => console.log(data));

  // form.reset();
}

export const logIn = () => {
  api.postData(config.auth.login.link, getUserData()).then(data => {
    console.log(data);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('sid', data.sid);
    api.data.user = data.user;
    console.log(api.data);
    //
  });
}
export const logOut =()=> {
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

export const signInWithGoogle = () => {
  fetch(config.apiUrl + '/auth/google')
  .then(res => {
    
    return res.json()
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
}
