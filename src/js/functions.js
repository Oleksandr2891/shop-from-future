import config from '../config.json';
import { refs } from './refs';
import Api from './api';
import 'swiper/swiper-bundle.css';
import Swiper from 'swiper/bundle';
import swiperConfigCategories from '../configSwiper.json';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import Handlebars from '../helpers';
SwiperCore.use([Navigation, Pagination]);



// export const isJSON = data => {
//   try {
//     JSON.parse(data);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };



const api = new Api();

const getHeader = () => {
  api.getData(config.baseTpl.header.getCategories).then(data => {
    const headerTpl = require('../tpl/header.hbs').default;
    const logo = require('../images/logo.svg');
    const obj = { data, logo };
    refs.header.innerHTML = headerTpl(obj, Handlebars);
    console.log(obj);
    console.log(obj.data);
  });
};

const getFooter = () => {
  const footerTpl = require('../tpl/footer.hbs').default;
  refs.footer.innerHTML = footerTpl();
};

const getMainPage = () => {
  api.getData(config.componentsTpl.ads.getAds).then(data => {
    const adsTpl = require('../tpl/components/ads.hbs').default;
    refs.ads.innerHTML = adsTpl(data);
    console.log(data);
  });
  api.getData(config.componentsTpl.goods.getGoods).then(data => {
    const goodsTpl = require('../tpl/components/goods.hbs').default;

    const categorySales = function (obj) {
      console.log(goods);
      let text = [];
      // goods.forEach((obj) => {
      if (obj.name === "sales") {
        obj.data.forEach(item => text.push(__(item.category)));
      };
      // });
      // console.log(text);
      text = text.filter((item, index) => text.indexOf(item) === index);
      // console.log(text);
      return !text.length ? false : text.join(", ");
    };

    const goods = [];
    console.log(data);

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
    // console.log(goods);

    refs.content.innerHTML = goodsTpl(goods, Handlebars);
    new Swiper('.swiper-container', swiperConfigCategories.card);
  });
};

export const renderContent = path => {
  console.log(refs.ads);
  console.log(location.pathname);
  if (path === '/') {
    history.pushState(null, null, path);
    getHeader();

    getMainPage();
    getFooter();
    return false;
  }
  if (refs.ads.childElementCount > 0) {
    refs.ads.innerHTML = '';
  }
  if (refs.header.childElementCount === 0) {
    getHeader();
  }
  if (refs.footer.childElementCount === 0) {
    getFooter();
  }
  api.getData(path).then(data => {
    const categoryTpl = require('../tpl/category.hbs').default;
    const card = require('../tpl/components/productCard.hbs').default;

    const categoryData = card(data);

    refs.content.innerHTML = categoryTpl({ categoryData });

    console.log(data);

    return data;
  });
};

export const __ = (key) => {
  const lang = "ru"; /* соединить с выбором языка из localstorage*/
  const vocabulary = {
    ru: require('../i18n/ru.json')
  };
  return vocabulary[lang]?.[key] ? vocabulary[lang][key] : key;
}
