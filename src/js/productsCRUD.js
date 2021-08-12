import { api } from './functions';
import config from '../config.json';
import { getUserData } from './auth';

export const addToFavourites = id => {
  api.postData(config.favourites_URL + '/' + id, { data: false, auth: true }).then(data => {
    getUserData();
  });

  console.log(api.data.user);
};

export const removeFavourite = id => {
  
}