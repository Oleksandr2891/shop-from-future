import { refs } from './refs';
import modalTpl from '../tpl/components/modal.hbs';
import { api, previewFile } from './functions';

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
    refs.modal.querySelectorAll('.inputfile').forEach(input => {
      input.addEventListener('change', previewFile);
    });
  },

  cardOneGood: id => {
    const contentForModal = require('../tpl/components/modals/cardOneGood.hbs').default;
    const item = api.data.content.find(item => id === item._id);
    console.log(item);
    const modalContent = contentForModal(item);
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
