class MainApi {


  _url = "https://api.finspot.ru"
  _headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
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


  //получение список организаций
  getOrganizations() {
    return this._request(`${this._url}/organizations`, {
      headers: this._headers,
    });
  }

  addOrganizations() {
    return this._request(`${this._url}/organizations/add`, {
      headers: this._headers,
    });
  }

  //получение информации о пользователе
  getInfoUser() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  //редактирование профиля


  //получение всех заявок пользователя
  getRequests() {
    return this._request(`${this._url}/requests`, {
      headers: this._headers,
    });
  }

  //добавление заявки
  addRequests() {
    return this._request(`${this._url}/requests/add`, {
      headers: this._headers,
    });
  }

}

const mainApi = new MainApi();

export default mainApi;