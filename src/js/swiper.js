export default {
    direction: 'horizontal',
    // observer: true,
    // observerSlideChildren: true,
    // observerParents: true,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    grabCursor: true,
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
};


