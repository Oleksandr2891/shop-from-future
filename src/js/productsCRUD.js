import { api } from './functions';
import config from '../config.json';
import { getUserData } from './auth';
import { renderCabinet } from './renderCabinet';

export const addToFavourites = id => {
  if(!api.data.user.favourites) return false;
  api.postData(config.favourites_URL + '/' + id, { data: false, auth: true }).then(data => {
    getUserData();
    const modalGoods = document.querySelector('#card-goods')
    modalGoods.querySelector('.card-goods-icon').textContent = 'favorite'
    modalGoods.querySelector('.card-goods-icon').classList.add('card-goods-icon-active')
    modalGoods.querySelector('.card-goods__btn-favorites').dataset.action = 'remove-from-favourites'
    
  });

  console.log(api.data.user);
};

export const removeFromFavourites = id => {
  api.deleteData(config.favourites_URL + '/' + id, {data: false, auth: true}).then(data => {
    getUserData();
    const modalGoods = document.querySelector('#card-goods')
    modalGoods.querySelector('.card-goods-icon').textContent = 'favorite_border'
    modalGoods.querySelector('.card-goods-icon').classList.remove('card-goods-icon-active')
    modalGoods.querySelector('.card-goods__btn-favorites').dataset.action = 'add-to-favourites'
    if(location.pathname === '/favourites'){
      console.log('hello');
      // document.querySelector('#content').innerHTML = '';
      getUserData()
      .then(data => {
        console.log(data);
        renderCabinet()
      });
      
    }
      
  });
  console.log(api.data.user)
};