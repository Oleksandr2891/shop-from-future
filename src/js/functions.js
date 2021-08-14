import config from '../config.json';
import { refs } from './refs';
import Api from './api';
import 'swiper/swiper-bundle.css';
import Swiper from 'swiper/bundle';
import swiperConfigAds from './adsSwiper';
import swiperConfigCategories from '../configSwiper.json';
import { getUserData } from './auth';
import { renderCabinet } from './renderCabinet';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import Handlebars from '../helpers';

export const rerenderLogIn = () => {
  document.querySelector('#register-wraper').classList.add('hide');
  document.querySelector('#cabinet-wraper').classList.remove('hide');
  document.querySelector('#register-wraper-mobile').classList.add('hide');
  document.querySelector('#cabinet-wraper-mobile').classList.remove('hide');
};
export const rerenderLogOut = () => {
  document.querySelector('#cabinet-wraper').classList.add('hide');
  document.querySelector('#register-wraper').classList.remove('hide');
  document.querySelector('#register-wraper-mobile').classList.remove('hide');
  document.querySelector('#cabinet-wraper-mobile').classList.add('hide');
};

SwiperCore.use([Navigation, Pagination]);

export const isJSON = data => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
};

export const stringToCamelCase = str => {
  const newMessage = str.split(' ');
  const newArr = [newMessage[0]];

  for (let i = 1; i < newMessage.length; i++) {
    const newWord = newMessage[i][0].toUpperCase() + newMessage[i].slice(1);
    newArr.push(newWord);
  }
  return newArr.join('');
};

export const api = new Api();

const getHeader = () => {
  if (refs.header.childElementCount !== 0) return false;
  api.getData(config.baseTpl.header.getCategories).then(data => {
    const headerTpl = require('../tpl/header.hbs').default;
    const logo = require('../images/logo.svg');
    const obj = { data, logo };
    refs.header.innerHTML = headerTpl(obj, Handlebars);
    api.data.categories = data;
    if (api.data.user.email === undefined) {
      rerenderLogOut();
    } else {
      rerenderLogIn();
    }
  });
};

const getFooter = () => {
  if (refs.footer.childElementCount !== 0) return false;
  const footerTpl = require('../tpl/footer.hbs').default;
  refs.footer.innerHTML = footerTpl();
};

export const getMainPage = (page = 1) => {
  api.getData(config.componentsTpl.ads.getAds).then(data => {
    const mainAdsArr = [...data.slice(5)];
    const rigthAdsArr = [...data.slice(0, 2)];
    const downAdsArr = [...data.slice(2, 5)];
    const adsTpl = require('../tpl/components/ads.hbs').default;
    refs.ads.innerHTML = adsTpl({ mainAdsArr, rigthAdsArr, downAdsArr });

    new Swiper('.Ads-slider-container', swiperConfigAds);
  });

  api.getData(config.componentsTpl.goods.getGoods + page).then(data => {
    const obj = {};
    Object.keys(data).forEach(item => {
      obj[item] = data[item];
    });
    api.data.content = obj;

    const goodsTpl = require('../tpl/components/goods.hbs').default;

    const categorySales = function (obj) {
      let text = [];

      if (obj.name === 'sales') {
        obj.data.forEach(item => text.push(__(item.category)));
      }
      text = text.filter((item, index) => text.indexOf(item) === index);

      return !text.length ? false : text.join(', ');
    };

    const goods = [];

    Object.keys(data).forEach(item => {
      const obj = {
        name: '',
        data: [],
      };
      obj.name = item;
      obj.data = data[item];
      goods.push(obj);
      obj.text = categorySales(obj);
    });

    refs.content.innerHTML = goodsTpl(goods, Handlebars);
    new Swiper('.swiper-container', swiperConfigCategories.card);
  });
};

const googleRegister = () => {
  const a = new URLSearchParams(location.search.slice(1));
  if (a.get('accessToken')) {
    localStorage.setItem('accessToken', a.get('accessToken'));
    localStorage.setItem('refreshToken', a.get('refreshToken'));
  }
};

export const renderContent = path => {
  googleRegister();
  getUserData().then(data => {
    getHeader();
    getFooter();
    if (path === '/') {
      getMainPage();
      return false;
    }
  });

  history.pushState(null, null, path);
  if (path !== '/') refs.linkPaginationWrapper.classList.add('hidden');

  if (path === '/cabinet') {
    console.log(api.data);
    getUserData().then(data => {
      renderCabinet();
    });
  }
  if (refs.ads.childElementCount > 0) {
    refs.ads.innerHTML = '';
  }
  if (path !== '/') {
    api.getData(path).then(data => {
      history.pushState(null, null, path);

      api.data.content[data[0].category] = data;

      const categoryTpl = require('../tpl/category.hbs').default;
      const card = require('../tpl/components/productCard.hbs').default;
      const categoryData = card(data);
      refs.content.innerHTML = categoryTpl({ categoryData });
    });
  }
};

export const __ = key => {
  const lang = 'ru'; /* соединить с выбором языка из localstorage*/
  const vocabulary = {
    ru: require('../i18n/ru.json'),
  };
  return vocabulary[lang]?.[key] ? vocabulary[lang][key] : key;
};

export function previewFile(event) {
  const preview = event.target.closest('div').querySelector(`[for=${event.target.id}] img`);
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
}
