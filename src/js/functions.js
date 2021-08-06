import config from '../config.json';
// export const isJSON = data => {
//   try {
//     JSON.parse(data);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };
export const getDataServer = (path = '/') => {
  return fetch(config.apiUrl + path)
    .then(response => response.json())
    .catch(err => console.warn(err));
};
export const renderContent = path => {
  if (path.allPath === '/') {
    config.mainPage.forEach(item =>
      getDataServer(item).then(data => {
        console.log(data);
        return data;
      }),
    );
    return false;
  }
  getDataServer('/call/categories').then(data => console.log(data));
  getDataServer((path = path.allPath)).then(data => {
    console.log(data);
    history.pushState(null, null, path);
    return data;
  });
};
