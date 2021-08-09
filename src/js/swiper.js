
import 'swiper/swiper-bundle.css';
import Swiper from 'swiper/bundle';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
SwiperCore.use([Navigation, Pagination]);



export const swiper = new Swiper('.swiper-container', {

    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },

        600: {
            slidesPerView: 2,
            spaceBetween: 30,
        },

        1280: {
            slidesPerView: 4,
            spaceBetween: 30,
        },

    }
});


