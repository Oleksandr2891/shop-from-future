import './sass/main.scss';
import { refs } from './js/refs';
import { renderContent } from './js/functions';
import { renderModals } from './js/renderModals';
import 'material-icons/iconfont/material-icons.css';
import { animateModal } from './js/animation-modal';
import { registr, logIn, logOut } from './js/auth';
import { api } from './js/functions';
import config from './config.json';
import { getNextPage } from './js/nextPage';
const sales = "/call/specific/sales";

const getPath = () => {
  return location.pathname + location.search;
};

renderContent(getPath());
let counter = 1;

document.addEventListener('click', e => {
  if (e.target.closest('a')) {
    e.preventDefault();
    if (e.target.closest('a').dataset.action === "load-more") {
      if (counter === 3) counter = 2;
      else counter += 1;
      api.data.counterMainPage = [counter];
      const path = config.componentsTpl.goods.getGoods + counter;
      getNextPage(path);
      if (counter === 3) e.target.closest('a').classList.add('isDisabled');
      // history.pushState(null, null, path);


    } else if (e.target.closest('a').dataset.id === undefined) {
      if (e.target.closest('a').getAttribute('href') === sales) {
        const categoryTpl = require('./tpl/category.hbs').default;
        const card = require('./tpl/components/productCard.hbs').default;
        refs.ads.innerHTML = "";
        const categoryData = card(api.data.content.sales);
        refs.content.innerHTML = categoryTpl({ categoryData });

        // console.log(api.data.content.sales);
      } else {
        const path = e.target.closest('a').getAttribute('href');


        renderContent(path);
      }
    }

    else {
      renderModals.cardOneGood(e.target.closest('a').dataset.id);
    }
  } else if (e.target.closest('button')) {
    e.preventDefault();
    if (e.target.dataset.action === 'open-modal') {
      renderModals[e.target.dataset.value]();
      animateModal();
    }
    if (e.target.closest('button').dataset.action === 'close-modal') {
      // can add style for animation before close modal window

      // close modal
      refs.modal.innerHTML = '';
    }
    if (e.target.dataset.action === 'user-register') {
      e.preventDefault();
      registr();
    }
    if (e.target.dataset.action === 'user-log-in') {
      e.preventDefault();
      logIn();
      refs.modal.innerHTML = '';
    }
    if (e.target.dataset.action === 'log-out') {
      e.preventDefault();
      logOut();
    }
    if (e.target.closest('button').dataset.action === 'open-filter') {
      const filterMenuNode = refs.header.querySelector('.mobile-menu');
      if (filterMenuNode.classList.contains('hidden')) {
        filterMenuNode.classList.remove('hidden');
      } else {
        filterMenuNode.classList.add('hidden');
      }
    }
    if (e.target.closest('button').dataset.action === 'open-cabinet') {
      const openMyCabinet = refs.header.querySelector('.modal-cabinet');
      if (openMyCabinet.classList.contains('hidden')) {
        openMyCabinet.classList.remove('hidden');
      } else {
        openMyCabinet.classList.add('hidden');
      }
    }
    if (e.target.closest('button').dataset.action === 'open-cabinet-mobile') {
      const openMyCabinetMob = refs.header.querySelector('.modal-cabinet-mobile');
      if (openMyCabinetMob.classList.contains('hidden')) {
        openMyCabinetMob.classList.remove('hidden');
      } else {
        openMyCabinetMob.classList.add('hidden');
      }
    }
    if (e.target.closest('button').dataset.action === 'open-filter') {
      const filterMenuNode = refs.header.querySelector('.tablet-menu');
      if (filterMenuNode.classList.contains('hidden')) {
        filterMenuNode.classList.remove('hidden');
      } else {
        filterMenuNode.classList.add('hidden');
      }
    }
    if (e.target.dataset.search === 'search') {
      const input = refs.header.querySelector('.search__input');
      if (input.value != '') {
        const path = input.dataset.search + input.value;
        renderContent(path);
      }
    }
  } else if (e.target) {
    //   Закрытие модалки по нажатию на backdrop
    if (e.target.classList.contains('backdrop')) {
      refs.modal.innerHTML = '';
    }
  } else {
    return false;
  }
});

document.addEventListener('keydown', e => {
  if (e.keyCode === 27) {
    refs.modal.innerHTML = '';
  }
});

// console.log(localStorage.getItem(accessToken));
// const token = localStorage.getItem(accessToken);
// console.log(token);
