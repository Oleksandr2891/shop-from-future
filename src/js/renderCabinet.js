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
  new Swiper('.swiper-container', swiperConfigCategories.cabinet);
  if (refs.ads.childElementCount > 0) {
    refs.linkPaginationWrapper.classList.add('hidden');
    refs.ads.innerHTML = '';
  }
  if (api.data.user.favourites !== undefined && api.data.user.favourites.length < 1) {
    document.querySelector('.swiper-container.favourite').classList.add('hidden');
  }
  if (api.data.user.calls !== undefined && api.data.user.calls.length < 1) {
    document.querySelector('.swiper-container.calls').classList.add('hidden');
  }

  history.pushState(null, null, '/favourites');
  api.data.content = {};
};
