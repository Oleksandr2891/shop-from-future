import './sass/main.scss';
import { refs } from './js/refs';
import { renderContent, getMainPage } from './js/functions';
import { renderModals } from './js/renderModals';
import 'material-icons/iconfont/material-icons.css';
import { animateModal } from './js/animation-modal';

import { addToFavourites, removeFromFavourites ,addPost } from './js/productsCRUD';

import validator from 'validator';

import { renderCabinet } from './js/renderCabinet';
import { registr, logIn, logOut, signInWithGoogle } from './js/auth';
import { api } from './js/functions';
import config from './config.json';
import { getNextPage } from './js/nextPage';
const sales = '/call/specific/sales';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, success } from '@pnotify/core';
import userDataTpl from './tpl/components/userData.hbs';

const getPath = () => {
  return location.pathname + location.search;
};

renderContent(getPath());
let counter = 1;

document.addEventListener('click', e => {
  const linkTag = e.target.closest('a');
  const buttonTag = e.target.closest('button');

  if (e.target.dataset.action === 'close-modal-backdrop') {
    refs.modal.innerHTML = '';
  }


  if (!linkTag && !buttonTag) return false;
  if (linkTag) {
    if (linkTag.dataset.action !== 'sign-in-with-google') {
      e.preventDefault();
    }

    if (linkTag.dataset.action === 'show-main-img') {
      const srcChangeImg = linkTag.firstElementChild.getAttribute('src');
      document.querySelector('#mainImg').setAttribute('src', srcChangeImg);
    }


    if (linkTag.dataset.action === 'open-main')
      refs.linkPaginationWrapper.classList.remove('hidden');
    if (linkTag.dataset.action === 'load-more') {
      const amountCategoriesWithSales = api.data.categories.length + 1;
      const amountCategoriesOnMainPages = Object.keys(api.data.content).length;
      if (amountCategoriesWithSales <= amountCategoriesOnMainPages) {
        refs.linkPaginationWrapper.classList.add('hidden');
        counter = 1;
        api.data.counterMainPage = [counter];
        return false;
      } else {
        counter += 1;
        api.data.counterMainPage = [counter];
        const path = config.componentsTpl.goods.getGoods + counter;
        getNextPage(path);
      }
    } else if (linkTag.dataset.action === 'open-cabinet') {
      renderCabinet();
    } else if (linkTag.dataset.id === undefined) {
      if (linkTag.getAttribute('href') === sales) {
        refs.linkPaginationWrapper.classList.add('hidden');
        const categoryTpl = require('./tpl/category.hbs').default;
        const card = require('./tpl/components/productCard.hbs').default;
        refs.ads.innerHTML = '';
        const categoryData = card(api.data.content.sales);
        refs.content.innerHTML = categoryTpl({ categoryData });

      } else {
        const path = linkTag.getAttribute('href');

        renderContent(path);
      }
    } else {
      renderModals.cardOneGood(linkTag.dataset.id, linkTag.dataset.category);
    }
  } else if (buttonTag) {
    e.preventDefault();

    if (buttonTag.dataset.action === 'open-modal') {
      renderModals[e.target.dataset.value]();
      animateModal();

      refs.modal.querySelector('input').focus();

      if (document.querySelector('#user-log-in') && document.querySelector('#user-register')) {
        document.querySelector('#user-log-in').disabled = true;
        document.querySelector('#user-register').disabled = true;
      }
    }
    if (buttonTag.dataset.action === 'close-modal') {
      refs.modal.innerHTML = '';
    }

    if (buttonTag.dataset.action === 'sign-in-with-google') {
      signInWithGoogle();
    }

    if (buttonTag.dataset.action === 'user-register') {
      registr();
    }

    if(buttonTag.dataset.action === 'add-post'){
      addPost();
    }
    //
    if (e.target.dataset.action === 'user-log-in') {
      e.preventDefault();
      logIn();
      renderCabinet();
    }
    if (buttonTag.dataset.action === 'log-out') {
      logOut();

      getMainPage();
    }
    if (buttonTag.dataset.action === 'open-filter') {
      const filterMenuNode = refs.header.querySelector('.mobile-menu');
      if (filterMenuNode.classList.contains('hidden')) {
        filterMenuNode.classList.remove('hidden');
      } else {
        filterMenuNode.classList.add('hidden');
      }
    }
    if (buttonTag.dataset.action === 'close-filter') {
      refs.linkPaginationWrapper.classList.remove('hidden');
      refs.header.querySelector('.mobile-menu').classList.add('hidden');
      refs.header.querySelector('.tablet-menu').classList.add('hidden');
      refs.content.innerHTML = '';
      const path = '/'
      history.pushState(null, null, path);
      getMainPage();
    }

    if (buttonTag.dataset.action === 'open-cabinet') {
      const openMyCabinet = refs.header.querySelector('.modal-cabinet');
      if (openMyCabinet.classList.contains('hidden')) {
        openMyCabinet.classList.remove('hidden');
      } else {
        openMyCabinet.classList.add('hidden');
      }
    }
    if (buttonTag.dataset.action === 'open-cabinet-mobile') {
      const openMyCabinetMob = refs.header.querySelector('.modal-cabinet-mobile');
      if (openMyCabinetMob.classList.contains('hidden')) {
        openMyCabinetMob.classList.remove('hidden');
      } else {
        openMyCabinetMob.classList.add('hidden');
      }
    }
    if (buttonTag.dataset.action === 'open-filter') {
      const filterMenuNode = refs.header.querySelector('.tablet-menu');
      if (filterMenuNode.classList.contains('hidden')) {
        filterMenuNode.classList.remove('hidden');
      } else {
        filterMenuNode.classList.add('hidden');
      }
    }

    if (buttonTag.dataset.action === 'add-to-favourites') {
      addToFavourites(e.target.closest('button').dataset.id);
    }

    if (buttonTag.dataset.action === 'remove-from-favourites') {
      removeFromFavourites(buttonTag.dataset.id);
    }

    if (buttonTag.dataset.action === 'show-user-data') {
      const path = '/user/' + e.target.closest('button').dataset.userid;

      function findUserData() {
        return fetch(config.apiUrl + path)
          .then(response => {
            return response.json();
          })
          .then(userData => {
            document.querySelector('.user-data').innerHTML = userDataTpl(userData);
          });
      }
      findUserData();
    }

    if (buttonTag.dataset.search === 'search') {
      const input = refs.header.querySelector('.header__find');
      const path = input.dataset.search + input.value;

      function findGood() {
        return fetch(config.apiUrl + path)
          .then(response => {
            return response.json();
          })
          .then(good => {
            if (good.length < 1) {
              error({ text: 'Your request is incorrect!', delay: 1500 });
            }
            if (good.length > 0) {
              success({ text: `Goods were found.`, delay: 1000 });
            }
          });
      }
      findGood();

      if (input.value != '') {
        const path = input.dataset.search + input.value;
        renderContent(path);
      } else {
        error({ text: 'Please enter the date', delay: 1500 });
      }
    }
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    refs.modal.innerHTML = '';
  }
  if (e.key === 'Enter') {
  }
});

// Слушатель для input
document.addEventListener('input', e => {
  if (e.target.dataset.action === 'register-email') {
    if (!validator.isEmail(e.target.value)) {
      if (e.target.classList.contains('valid')) {
        e.target.classList.remove('valid');
      }
      e.target.classList.add('invalid');
      document.querySelector('#user-log-in').disabled = true;
      document.querySelector('#user-register').disabled = true;
    }
    if (validator.isEmail(e.target.value)) {
      if (e.target.classList.contains('invalid')) {
        e.target.classList.remove('invalid');
      }
      e.target.classList.add('valid');
    }
  }
  if (e.target.dataset.action === 'register-password') {
    // if ()
    if (e.target.value.length < 4) {
      if (e.target.classList.contains('valid')) {
        e.target.classList.remove('valid');
      }
      e.target.classList.add('invalid');
      document.querySelector('#user-log-in').disabled = true;
      document.querySelector('#user-register').disabled = true;
    }
    if (e.target.value.length >= 4) {
      if (e.target.classList.contains('invalid')) {
        e.target.classList.remove('invalid');
      }
      e.target.classList.add('valid');
      document.querySelector('#user-log-in').disabled = false;
      document.querySelector('#user-register').disabled = false;
    }
  }
});
