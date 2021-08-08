import { refs } from './refs';
import modalTpl from '../tpl/components/modal.hbs';

export const renderModals = {
  auth: () => {
    // handlebars
    const contentForModal = require('../tpl/components/modals/auth.hbs').default;
    const arr = [1, 2, 3];
    // add modal content to hbs if need
    const modalContent = contentForModal({ arr });
    // add modal to html
    refs.modal.innerHTML = modalTpl({ modalContent });
  },
  createEditProduct: () => {
    const contentForModal = require('../tpl/components/modals/createEditProduct.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },
  productCard: () => {
    const contentForModal = require('../tpl/components/modals/productCard.hbs').default;

    const modalContent = contentForModal();
    refs.modal.innerHTML = modalTpl({ modalContent });
  },

  closeModal: () => {
    refs.modal.innerHTML = '';
  },
};
