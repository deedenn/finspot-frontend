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

  // добавить организацию
  addOrganization() {
    return this._request(`${this._url}/organizations/add`, {
      method: "POST",
      headers: this._headers,
    });
  }

  //получение cписка всех пользователей
  getUsers() {
    return this._request(`${this._url}/users/`, {
      headers: this._headers,
    });
  }

  //получение информации о пользователе
  getInfoUser() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  //регистрация пользователя
  addUser(data) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }


  //редактирование профиля


  //получение всех заявок пользователя
  getRequests() {
    return this._request(`${this._url}/requests`, {
      headers: this._headers,
    });
  }

    //открыть одну заявку
    getRequestByID(id) {
      return this._request(`${this._url}/requests/${id}`, {
        headers: this._headers,
      });
    }

  //добавление заявки
  addRequest(data) {
    return this._request(`${this._url}/requests/add`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

    //редактирование заявки
    editRequest(data) {
      return this._request(`${this._url}/requests/edit`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      });
    }

  //получение всех реестров пользователя
  getRegistries() {
    return this._request(`${this._url}/registries/all`, {
      headers: this._headers,
    });
  }

  //создание реестра
  addRegistry() {
    return this._request(`${this._url}/registries/add`, {
      method: "POST",
      headers: this._headers,
    });
  }

}

const mainApi = new MainApi();

export default mainApi;