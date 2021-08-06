import './sass/main.scss';
import config from './config.json';
import { getDataServer, renderContent } from './js/functions';

const getPath = () => {
  const allPath = location.pathname + location.search;
  return { allPath, pathname: location.pathname, search: location.search };
};

renderContent(getPath());
