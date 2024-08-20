export default class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _returnResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      /*return Promise.reject(`Ошибка: ${res.status}`);*/
      return res.text().then((text) => {
        return Promise.reject({
          statusError: res.statusCode,
          error: JSON.parse(text).message,
        });
      });
    }
  }

  //метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._returnResponse);
  }

  //получение информации о пользователе
  getUsers() {
    return this._request(`${this._url}/users/`, {
      headers: this._headers,
    });
  }

  //редактирование профиля


}