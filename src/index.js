import './sass/main.scss';
import { refs } from './js/refs';
import { renderContent } from './js/functions';
import { renderModals } from './js/renderModals';
import 'material-icons/iconfont/material-icons.css';
import { animateModal } from './js/animation-modal';
import { registr, logIn, logOut } from './js/auth';

const getPath = () => {
  return location.pathname + location.search;
};

renderContent(getPath());

document.addEventListener('click', e => {
  if (e.target.closest('a')) {
    e.preventDefault();
    const path = e.target.closest('a').getAttribute('href');
    history.pushState(null, null, path);
    renderContent(path);
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
      // console.log('ok');
      registr();
    }
    if (e.target.dataset.action === 'user-log-in') {
      e.preventDefault();
      // console.log('ok');
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
