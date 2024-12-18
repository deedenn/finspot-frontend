class MainApi {


  _url = "//localhost:3000"
  _headers = {
    "Content-Type": "application/json",
  }

  async _returnResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        { status: res.status, message: await res.text() }
      )
    }
  }

  //метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._returnResponse);
  }


  //получение списка организаций
  getOrganizations() {
    return this._request(`${this._url}/organizations`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  //открыть одну организацию
  getOrganizationByID(id) {
    return this._request(`${this._url}/organizations/${id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  // добавить организацию
  addOrganization({ inn, name }) {
    return this._request(`${this._url}/organizations/add`, {
      method: "POST",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify({ inn, name })
    });
  }

  // изменить согласователей заявок и реестров
  updateOrganizationApprovers(id, approveUsers) {
    return this._request(`${this._url}/organizations/updateApproveList`, {
      method: "PATCH",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify({ id, approveUsers })
    });
  }

  //получение cписка всех пользователей
  getUsers() {
    return this._request(`${this._url}/users/`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //получение cписка всех пользователей организации
  getUsersByOrg(id) {
    return this._request(`${this._url}/organizations/users/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //получение информации об авторизованном пользователе
  getInfoUser() {
    return this._request(`${this._url}/users/me`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //получение информации о пользователе по ID
  getInfoUserByID(id) {
    return this._request(`${this._url}/users/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //получение информации о пользователе по email
  getInfoUserByEmail(email) {
    return this._request(`${this._url}/users/email/check`, {
      method: "POST",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify({ email })
    });
  }

  //регистрация пользователя
  addUser(data) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify(data)
    });
  }

  //добавление пользователей в организацию
  patchUserByOrg(id, newUser) {
    return this._request(`${this._url}/organizations/addusers`, {
      method: "PATCH",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify({ id, newUser })
    });
  }

  //редактирование профиля


  //получение всех заявок пользователя
  getRequests() {
    return this._request(`${this._url}/requests`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }


  //получение всех заявок, доступ к которым имеет пользователь
  getUserRequests(id) {
    return this._request(`${this._url}/requests/approve/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }


  //получение всех заявок организации
  getRequestsByOrgID(id) {
    return this._request(`${this._url}/requests/org/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //получение всех утвержденных заявок
  getRequestsApproved(id) {
    return this._request(`${this._url}/requests/approved/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //открыть одну заявку
  getRequestByID(id) {
    return this._request(`${this._url}/requests/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //добавление заявки
  addRequest(data) {
    return this._request(`${this._url}/requests/add`, {
      method: "POST",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify(data)
    });
  }

  //редактирование заявки
  editRequest(data) {
    return this._request(`${this._url}/requests/edit`, {
      method: "PATCH",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify(data)
    });
  }

  //утвержение заявки
  checkRequest(data) {
    return this._request(`${this._url}/requests/check`, {
      method: "PATCH",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify(data)
    });
  }

  //отмена заявки
  cancelRequest(data) {
    return this._request(`${this._url}/requests/cancel`, {
      method: "PATCH",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify(data)
    });
  }

  //получение всех реестров пользователя
  getRegistries() {
    return this._request(`${this._url}/registries/`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //получение всех реестров организации по ID
  getRegistriesByOrgID(id) {
    return this._request(`${this._url}/registries/org/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //получение данных реестра по ID
  getRegistryByID(id) {
    return this._request(`${this._url}/registries/${id}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
    });
  }

  //создание реестра
  addRegistry(data) {
    return this._request(`${this._url}/registries/add`, {
      method: "POST",
      headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify(data)
    });
  }

}

const mainApi = new MainApi();

export default mainApi;