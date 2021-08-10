import 'swiper/swiper-bundle.css';
import Swiper from 'swiper/bundle';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
SwiperCore.use([Navigation, Pagination]);

export const adsSwiper = new Swiper('.hero', {
  effect: 'cube',
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});
