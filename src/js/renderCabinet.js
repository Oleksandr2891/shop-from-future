import { api } from './functions';
import { refs } from './refs';

import 'swiper/swiper-bundle.css';
import Swiper from 'swiper/bundle';
import swiperConfigCategories from '../configSwiper.json';

import SwiperCore, { Navigation, Pagination } from 'swiper/core';
SwiperCore.use([Navigation, Pagination]);

export const renderCabinet = () => {
  const cabinet = require('../tpl/components/userCabinet.hbs').default;
  refs.content.innerHTML = cabinet({ userData: api.data.user });
  new Swiper('.swiper-container', swiperConfigCategories.card);
  if (refs.ads.childElementCount > 0) {
    refs.ads.innerHTML = '';
  }
  if (api.data.user.favourites.length < 1) {
    document.querySelector('.favorite').classList.add('hidden');
  }
  if (api.data.user.calls.length < 1) {
    document.querySelector('.calls').classList.add('hidden');
  }
  

  history.pushState(null, null, '/favourites')
  api.data.content = {}

};
