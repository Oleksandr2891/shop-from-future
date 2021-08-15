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
    let modalGoods = document.querySelector(`button[data-id='${id}']`);
    if (refs.modal.childElementCount !== 0) {
      modalGoods = refs.modal.querySelector(`button[data-id='${id}']`);
    }
    console.log("добавили в избранное");
    modalGoods.querySelector('.card-goods-icon').textContent = 'favorite';
    modalGoods.querySelector('.card-goods-icon').classList.add('card-goods-icon-active');
    modalGoods.dataset.action = 'remove-from-favourites';
  });

};

export const removeFromFavourites = id => {
  api.deleteData(config.favourites_URL + '/' + id, { data: false, auth: true }).then(data => {
    console.log("Удалили из избранного");
    getUserData();
    let modalGoods = document.querySelector(`button[data-id='${id}']`);
    if (refs.modal.childElementCount !== 0) {
      modalGoods = refs.modal.querySelector(`button[data-id='${id}']`);
    }
    modalGoods.querySelector('.card-goods-icon').textContent = 'favorite_border';
    modalGoods.querySelector('.card-goods-icon').classList.remove('card-goods-icon-active');
    modalGoods.dataset.action = 'add-to-favourites';

    if (location.pathname === '/cabinet') {
      getUserData().then(data => {
        refs.modal.innerHTML = "";
        renderCabinet();
      });
    }
  });

};

export const editPost = () => {
  const addModalNode = document.querySelector('#add-post-form')

}

export const createEditPost = (method = 'POST', path = '') => {
  console.log(path)
  const addModalNode = document.querySelector('#add-post-form');
  const images = [];
  let imageCounter = 0;
  addModalNode.querySelectorAll('.inputfile').forEach(item => {
    if (item.files[0] !== undefined) {
      images.push(item.files[0]);
      imageCounter += 1;
    }
  });

  // if (images.length === 0) {
  //   pnotify.error({ text: 'add images', delay: 1000 });
  //   return false;
  // }
  const inputsValueNewProduct = {
    title: addModalNode.querySelector('#product-title').value,
    description: addModalNode.querySelector('#product-description').value,
    category: addModalNode.querySelector('#product-category').value,
    price: addModalNode.querySelector('#product-price').value,
    phone: addModalNode.querySelector('#product-phone').value,
  };
  sendData('https://callboard-backend.goit.global/call' + `${path}`, inputsValueNewProduct);
  async function sendData(url, data) {
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }if(images !== 0){
      images.forEach(item => formData.append('file', item));
    }
    
    const response = await fetch(url, {
      method: method,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    }).then(data => {
      pnotify.success({ text: 'seccess', delay: 1000 });
      refs.modal.innerHTML = '';
    });
  }
};

export const deletePost = (id) => { 
  api.deleteData('/call/' + id, { data: false, auth: true }).then(data => {
    refs.modal.innerHTML =  ''
    getUserData().then(data =>{ 
      renderCabinet()})
  })
}