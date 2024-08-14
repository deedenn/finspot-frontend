const BASE_IMG_LINK = 'http://api.finspot.ru';

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

  //добавление в избранное
  favoriteMovie(movie) {
    return this._request(`${this._url}/movies`, {
      method: 'POST',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: BASE_IMG_LINK + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: BASE_IMG_LINK + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
      headers: this._headers,
    });
  }

  //удалить из избранного
  deleteMovie(id) {
    return this._request(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
}