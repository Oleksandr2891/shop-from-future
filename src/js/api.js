import config from '../config.json';

export default class Api {
  #data = {};

  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  async send(path = this.path, method = 'GET') {
    console.log(path);
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    return await fetch(config.apiUrl + path)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  async getData(path = this.path) {
    const res = await this.send(path);
    if (res.length < 1) return Promise.reject('Нет данных');

    return res;
  }


  get data() {
    return this.#data;
  }

  set data(data) {
    return this.#data = data;
  }

  // async getData(id) {
  //   await this.send(id);
  // }
}
