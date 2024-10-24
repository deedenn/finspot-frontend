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
  authorization(body) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  //проверка токена
  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._returnResponse)
  }
}

// блок подключения к апи

const auth = new Auth({
  baseUrl: "//localhost:3000",
});

export default auth