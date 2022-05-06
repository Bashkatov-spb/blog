import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './app.scss';
import { BrowserRouter, Route } from 'react-router-dom';

import BlogService from '../services/blog-services';

import ArticlesList from './articles-list/articles-list';
import Article from './article/article';
import FormSignUp from './sing-up/form-sign-up';
import FormSignIn from './sign-in/form-sign-in';
import EditProfile from './edit-profile/edit-profile';
import Header from './header/header';
import FormCreateArticle from './create-article/form-create-article';
import FormEditArticle from './edit-article/form-edit-article';
import Loader from './loader/loader';

const App = () => {
  const service = new BlogService();

  const [userData, setUserData] = useState(null);
  const [articlesData, setArticlesData] = useState([]);
  const [articlesCount, setArticlesCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [updateDataArticles, setUpdateDataArticles] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getInfoAboutLogin = () => {
    if (localStorage.getItem('token') !== null) {
      service.getLogIn(localStorage.getItem('token')).then((res) => {
        setUserData(res.user);
        setIsLoggedIn(true);
      });
    }
  };

  const getArticles = (currentPage) => {
    service.getArticles(currentPage).then((res) => {
      setArticlesData(res.articles);
      setArticlesCount(res.articlesCount);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getInfoAboutLogin();
  }, [isLoggedIn]);

  useEffect(() => {
    getArticles();
  }, [userData, isLoggedIn, updateDataArticles]);

  const updatePageNumber = (page) => {
    setCurrentPage(page);
    getArticles(page);
  };

  const checkUserAuth = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const updateData = () => {
    getArticles();
    setUpdateDataArticles(true);
  };

  const articleList = isLoading ? (
    <Loader />
  ) : (
    <ArticlesList
      updatePageNumber={updatePageNumber}
      currentPage={currentPage}
      articlesCount={articlesCount}
      articlesData={articlesData}
      isLoggedIn={isLoggedIn}
      updateData={updateData}
    />
  );

  return (
    <div>
      <BrowserRouter>
        <Header getArticles={getArticles} isLoggedIn={isLoggedIn} onLogout={onLogout} userData={userData} />
        <main className="main">
          <Route path="/" render={() => articleList} exact />
          <Route path="/articles" render={() => articleList} exact />
          <Route path="/sign-in" render={() => <FormSignIn isLoggedIn={isLoggedIn} checkUserAuth={checkUserAuth} />} />
          <Route path="/sign-up" component={FormSignUp} />
          <Route
            path="/articles/:slug"
            render={() => {
              return (
                <Article
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  articlesData={articlesData}
                  updateData={updateData}
                />
              );
            }}
          />
          <Route
            path="/profile"
            render={() => <EditProfile userData={userData} getInfoAboutLogin={getInfoAboutLogin} />}
          />
          <Route path="/new-article" render={() => <FormCreateArticle updateData={updateData} />} />
          <Route
            path="/edit-article/:slug"
            render={() => {
              return (
                <FormEditArticle
                  getArticles={getArticles}
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  articlesData={articlesData}
                  updateData={updateData}
                />
              );
            }}
          />
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
