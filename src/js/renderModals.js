import { refs } from './refs';
import modalTpl from '../tpl/components/modal.hbs';

export const renderModals = {
  auth: () => {
    const contentForModal = require('../tpl/components/modals/auth.hbs').default;
    const arr = [1, 2, 3];
    const sprite = require('../images/sprite.svg');

    const modalContent = contentForModal({ arr, sprite });

    refs.modal.innerHTML = modalTpl({ modalContent });
  },
  createEditProduct: () => {
    const contentForModal = require('../tpl/components/modals/createEditProduct.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },
  cardOneGood: () => {
    const contentForModal = require('../tpl/components/modals/cardOneGood.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },

  goItStudents: () => {
    const contentForModal = require('../tpl/components/modals/goItStudents.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },
  productCard: () => {
    const contentForModal = require('../tpl/components/modals/productCard.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },

  modalExit: () => {
    const contentForModal = require('../tpl/components/modals/modalExit.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },

  closeModal: () => {
    refs.modal.innerHTML = '';
  },
};
