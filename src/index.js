import './sass/main.scss';
import { refs } from './js/refs';
import { renderContent } from './js/functions';

const getPath = () => {
  return location.pathname + location.search;
};

renderContent(getPath());
document.addEventListener('click', e => {
  if (e.target.closest('a')) {
    e.preventDefault();
    const path = e.target.getAttribute('href');
    history.pushState(null, null, path);
    renderContent(path);
  } else if (e.target.closest('button')) {
    e.preventDefault();
    const input = refs.header.querySelector('.search__input');
    if (input.value != '') {
      const path = input.dataset.search + input.value;
      renderContent(path);
    }
  } else {
    return false;
  }
});
