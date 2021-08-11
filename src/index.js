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
  const linkTag = e.target.closest('a') || e.target.querySelector('a');
  const buttonTag = e.target.closest('button');
  console.log(linkTag)
  if (linkTag) {
    e.preventDefault();
    if (linkTag.dataset.id === undefined) {
      const path = linkTag.getAttribute('href');
      history.pushState(null, null, path);
      renderContent(path);
    } else {
      renderModals.cardOneGood(linkTag.dataset.id, linkTag.dataset.category);
    }
  } else if (buttonTag) {
    e.preventDefault();
    
    if (buttonTag.dataset.action === 'open-modal') {
      renderModals[e.target.dataset.value]();
      animateModal();
    }
    if (buttonTag.dataset.action === 'close-modal') {
      refs.modal.innerHTML = '';
    }
    if (buttonTag.dataset.action === 'user-register') {
      registr();
    }
    if (buttonTag.dataset.action === 'user-log-in') {
      logIn();
      refs.modal.innerHTML = '';
    }
    if (buttonTag.dataset.action === 'log-out') {
      logOut();
    }
    if (buttonTag.dataset.action === 'open-filter') {
      const filterMenuNode = refs.header.querySelector('.mobile-menu');
      if (filterMenuNode.classList.contains('hidden')) {
        filterMenuNode.classList.remove('hidden');
      } else {
        filterMenuNode.classList.add('hidden');
      }
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
    if (buttonTag.dataset.search === 'search') {
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










