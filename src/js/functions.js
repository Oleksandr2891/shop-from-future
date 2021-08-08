import config from '../config.json';
import { refs } from './refs';
import Api from './api';
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

    refs.header.innerHTML = headerTpl(data);
    console.log(data);
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
    refs.content.innerHTML = goodsTpl(data);
    const swiper = require('../js/swiper').default;

    console.log(data);
  });
};

export const renderContent = path => {
  console.log(refs.ads);
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
    refs.content.innerHTML = categoryTpl(data);

    console.log(data);

    return data;
  });
};
