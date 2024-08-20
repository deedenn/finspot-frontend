class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _returnResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      return Promise.reject({
        statusError: res.statusCode,
        error: JSON.parse(text).message,
      });
    });
  }

  //регистрация пользователя
  register(name, fullname, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${name}`,
        fullname: `${fullname}`,
        email: `${email}`,
        password: `${password}`,
      }),
    }).then(this._returnResponse);
  }

  //авторизация
  authorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    })
      .then(this._returnResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          return data;
        }
      });
  }

  //проверка токена
  checkToken() {
    return fetch(`${this._baseUrl}/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this._returnResponse)
      .then((data) => data);
  }
}

// блок подключения к апи

const auth = new Auth({
  baseUrl: "https://api.finspot.ru",
});

export default auth