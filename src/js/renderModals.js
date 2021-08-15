import { refs } from './refs';
import modalTpl from '../tpl/components/modal.hbs';
import { api, previewFile, stringToCamelCase } from './functions';
import Handlebars from '../helpers';

import 'swiper/swiper-bundle.css';
import Swiper from 'swiper/bundle';
import swiperConfigCategories from '../configSwiper.json';

import SwiperCore, { Navigation, Pagination } from 'swiper/core';
SwiperCore.use([Navigation, Pagination]);

export const renderModals = {
  auth: () => {
    const contentForModal = require('../tpl/components/modals/auth.hbs').default;
    const arr = [1, 2, 3];
    const sprite = require('../images/sprite.svg');

    const modalContent = contentForModal({ arr, sprite });

    refs.modal.innerHTML = modalTpl({ modalContent });
  },
  createEditProduct: (method, id) => {
    const contentForModal = require('../tpl/components/modals/createEditProduct.hbs').default;
    const modalContent = contentForModal({ category: api.data.categories }, Handlebars);
    refs.modal.innerHTML = modalTpl({ modalContent });
    if(method === 'PATCH'){
      document.querySelector('.modal-create__heading').textContent = 'Изменить объявление'
      document.querySelector('#addPostProduct').textContent = 'Изменить'
      document.querySelector('#addPostProduct').dataset.action = 'edit-post'
      document.querySelector('#addPostProduct').dataset.id = id
      const item = api.data.user.calls.find(item => id === item._id)
      console.log(item)
      const addModalNode = document.querySelector('#add-post-form');
      addModalNode.querySelector('#product-title').value = item.title;
      addModalNode.querySelector('#product-description').value = item.description;
      addModalNode.querySelector('#product-category').value = item.category
      addModalNode.querySelector('#product-price').value = item.price;
      addModalNode.querySelector('#product-phone').value = item.phone
      const images = []
      item.imageUrls.forEach(item => images.push(item));
      console.log(images)
      const imagesNodes = addModalNode.querySelectorAll('img')
      const inputNodes = addModalNode.querySelectorAll('.inputfile')
      addModalNode.querySelector('img').setAttribute('src', item.imageUrls[0])
      for(let i = 0; i < images.length; i++){
        imagesNodes[i].setAttribute('src', images[i])
        inputNodes[i].file = images[i]
      }
    }
    refs.modal.querySelectorAll('.inputfile').forEach(input => {
      input.addEventListener('change', previewFile);
    });
  },

  cardOneGood: (id, category) => {
    const contentForModal = require('../tpl/components/modals/cardOneGood.hbs').default;
    const normalizeCategory = stringToCamelCase(category);
    const categories = [];
    Object.keys(api.data.content).forEach(item => categories.push(item));
    console.log(api.data.user);
    let item = {};
    if (location.pathname === '/cabinet') {
      if (category === "trade") {
        item = api.data.user.calls.find(item => id === item._id);
      } else {
        item = api.data.user.favourites.find(item => id === item._id);
      }
    } else if (!categories.includes(normalizeCategory) && location.pathname !== '/favourites') {
      item = api.data.content.sales.find(item => id === item._id);
    } else {
      item = api.data.content[normalizeCategory].find(item => id === item._id);
    }

    const modalContent = contentForModal(item);
    refs.modal.innerHTML = modalTpl({ modalContent });
    new Swiper('.swiper-container', swiperConfigCategories.card);

    if (
      api.data.user.favourites !== undefined &&
      api.data.user.favourites.find(item => id === item._id)
    ) {
      const modalGoods = document.querySelector('#card-goods');
      modalGoods.querySelector('.card-goods-icon').textContent = 'favorite';
      modalGoods.querySelector('.card-goods-icon').classList.add('card-goods-icon-active');
      modalGoods.querySelector('.card-goods__btn-favorites').dataset.action = 'remove-from-favourites';
    }
  },

  goItStudents: () => {
    const contentForModal = require('../tpl/components/modals/goItStudents.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },
  productCard: () => {
    const contentForModal = require('../tpl/components/modals/productCard.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },

  modalExit: () => {
    const contentForModal = require('../tpl/components/modals/modalExit.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },

  closeModal: () => {

    refs.modal.innerHTML = '';
  },
};
