import './sass/main.scss';
import { refs } from './js/refs';
import { renderContent } from './js/functions';
import { renderModals } from './js/renderModals';
import 'material-icons/iconfont/material-icons.css';
import { animateModal } from './js/animation-modal';
import { registr, logIn, logOut } from './js/auth';
import validator from 'validator';

const getPath = () => {
  return location.pathname + location.search;
};

renderContent(getPath());

document.addEventListener('click', e => {
  if (e.target.closest('a')) {
    e.preventDefault();
    if (e.target.closest('a').dataset.id === undefined) {
      const path = e.target.closest('a').getAttribute('href');
      history.pushState(null, null, path);
      renderContent(path);
    } else {
      renderModals.cardOneGood(e.target.closest('a').dataset.id);
    }
  } else if (e.target.closest('button')) {
    e.preventDefault();
    if (e.target.dataset.action === 'open-modal') {
      renderModals[e.target.dataset.value]();
      animateModal();
      // console.log(refs.modal);
      refs.modal.querySelector('input').focus();
      document.querySelector('#user-log-in').disabled = true;
      document.querySelector('#user-register').disabled = true;
      // if (document.querySelector('#formRegister')) {
      //   const formRegister = document.querySelector('#formRegister');
      //   console.log(formRegister);
      //   formRegister.addEventListener('submit', e => {
      //     console.log(e.target);
      //     e.preventDefault();
      //     console.log(e.target);
      //   });
      // }
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
      // console.log(data);
    }
    if (e.target.dataset.action === 'user-log-in') {
      e.preventDefault();
      // console.log('ok');
      logIn();
      // refs.modal.innerHTML = '';
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
  // const key = e.key;
  if (e.key === 'Escape') {
    refs.modal.innerHTML = '';
  }
  if (e.key === 'Enter') {
    // refs.modal.querySelector('form')?.submit();
  }
});

// Слушатель для input
document.addEventListener('input', e => {
  // console.log(e.target);
  if (e.target.dataset.action === 'register-email') {
    // console.log(e.target.value);
    // console.log(validator.isStrongPassword);
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

// console.log(localStorage.getItem(accessToken));
// const token = localStorage.getItem(accessToken);
// console.log(token);
