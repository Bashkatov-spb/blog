const BASE_API = 'https://kata.academy:8021/api';

export default class BlogService {
  async getResource(url, method) {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error(res.status);
    }
    return await res.json();
  }

  async postResource(url, data, method) {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    if (res.status === 422) {
      alert('Неправильный пароль или email');
    }
    if (!res.ok) {
      throw new Error(res.status);
    }
    return await res.json();
  }

  getArticles = async (currentPage = 1) => {
    const res = await fetch(`${BASE_API}/articles?offset=${currentPage > 1 ? (currentPage - 1) * 10 : 0}&limit=10&`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    return await res.json();
  };

  getArticle = (slug) => {
    return this.getResource(`${BASE_API}/articles/${slug}`);
  };

  registerUser = (data) => {
    const userData = { user: data };
    return this.postResource(`${BASE_API}/users`, userData, 'POST');
  };

  updateUser = (data) => {
    const userData = { user: data };
    return this.postResource(`${BASE_API}/user`, userData, 'PUT');
  };

  getUserToken = (data) => {
    const userData = { user: data };
    return this.postResource(`${BASE_API}/users/login`, userData, 'POST');
  };

  getLogIn = async (token) => {
    const response = await fetch(`${BASE_API}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    return await response.json();
  };

  postArticle = async (data) => {
    const articleData = { article: data };
    await this.postResource(`${BASE_API}/articles`, articleData, 'POST');
  };

  updateArticle = async (data, slug) => {
    const articleData = { article: data };
    await this.postResource(`${BASE_API}/articles/${slug}`, articleData, 'PUT');
  };

  deleteArticle = async (slug) => {
    await this.getResource(`${BASE_API}/articles/${slug}`, 'DELETE');
  };

  setLike = async (item) => {
    await this.getResource(`${BASE_API}/articles/${item}/favorite`, 'DELETE');
  };

  setDislike = async (item) => {
    await this.getResource(`${BASE_API}/articles/${item}/favorite`, 'POST');
  };
}
