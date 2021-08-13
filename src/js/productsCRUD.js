import { api } from './functions';
import config from '../config.json';
import { getUserData } from './auth';
import { renderCabinet } from './renderCabinet';
import { refs } from './refs';
import { renderModals } from './renderModals';
import { pnotify } from '../index';

export const addToFavourites = id => {
  if (api.data.user.email === undefined) {
    refs.modal.innerHTML = '';
    renderModals.auth();
    pnotify.error({ text: 'auth first', delay: 1000 });
    return false;
  }
  api.postData(config.favourites_URL + '/' + id, { data: false, auth: true }).then(data => {
    getUserData();
    const modalGoods = document.querySelector('#card-goods');
    modalGoods.querySelector('.card-goods-icon').textContent = 'favorite';
    modalGoods.querySelector('.card-goods-icon').classList.add('card-goods-icon-active');
    modalGoods.querySelector('.card-goods__btn-favorites').dataset.action =
      'remove-from-favourites';
  });

  console.log(api.data.user);
};

export const removeFromFavourites = id => {
  api.deleteData(config.favourites_URL + '/' + id, { data: false, auth: true }).then(data => {
    getUserData();
    const modalGoods = document.querySelector('#card-goods');
    modalGoods.querySelector('.card-goods-icon').textContent = 'favorite_border';
    modalGoods.querySelector('.card-goods-icon').classList.remove('card-goods-icon-active');
    modalGoods.querySelector('.card-goods__btn-favorites').dataset.action = 'add-to-favourites';

    if (location.pathname === '/favourites') {
      getUserData().then(data => {
        console.log(data);
        renderCabinet();
      });
    }
  });
  console.log(api.data.user);
};

export const addPost = () => {
  const addModalNode = document.querySelector('#add-post-form');

  const inputsValueNewProduct = {
    title: addModalNode.querySelector('#product-title').value,
    description: addModalNode.querySelector('#product-description').value,
    category: addModalNode.querySelector('#product-category').value,
    price: addModalNode.querySelector('#product-price').value,
    phone: addModalNode.querySelector('#product-phone').value,
    file: addModalNode.querySelector('#first').files[0],
  };
  console.log(inputsValueNewProduct);
  sendData('https://callboard-backend.goit.global/call', inputsValueNewProduct);
  async function sendData(url, data) {
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    });
  }
};
