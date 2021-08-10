import config from '../config.json';

export default class Api {
  #data = {};

  constructor(name, path, obj = {}) {
    this.name = name;
    this.path = path;
    this.obj = obj;
  }

  async send(path = this.path, method = 'GET', obj) {
    console.log(path);
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    };
    return await fetch(config.apiUrl + path, method === 'GET' ? {} : options)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  async getData(path = this.path) {
    const res = await this.send(path);
    if (res.length < 1) return Promise.reject('Нет данных');

    return res;
  }
  async postData(path = this.path, obj = this.obj) {
    console.log(obj);
    console.log(path);

    const res = await this.send(path, 'POST', obj);
    return res;
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    return (this.#data = data);
  }

  // async getData(id) {
  //   await this.send(id);
  // }
}
