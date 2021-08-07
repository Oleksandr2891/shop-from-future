import config from '../config.json';
import { refs } from './refs';
// export const isJSON = data => {
//   try {
//     JSON.parse(data);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };

export const getDataServer = (path = '/') => {
  return fetch(config.apiUrl + path)
    .then(response => response.json())
    .catch(err => console.log(err));
};

const getHeader = () => {
  getDataServer(config.baseTpl.header.getCategories).then(data => {
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
  getDataServer(config.componentsTpl.ads.getAds).then(data => {
    const adsTpl = require('../tpl/components/ads.hbs').default;
    refs.ads.innerHTML = adsTpl(data);
    console.log(data);
  });
  getDataServer(config.componentsTpl.goods.getGoods).then(data => {
    const goodsTpl = require('../tpl/components/goods.hbs').default;
    refs.content.innerHTML = goodsTpl(data);
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
  getDataServer(path).then(data => {
    const categoryTpl = require('../tpl/category.hbs').default;
    document.querySelector('#content').innerHTML = categoryTpl(data);

    console.log(data);

    return data;
  });
};
