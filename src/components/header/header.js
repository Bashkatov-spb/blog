import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';

const Header = ({ userData, onLogout, isLoggedIn, getArticles }) => {
  const panel =
    userData && isLoggedIn ? (
      <div className="header__auth">
        <Link to="/new-article" className="header__create-article active">
          Create article
        </Link>
        <div className="header__profile-info">
          <h3 className="header__profile-name">{userData.username}</h3>
          <Link to="/profile">
            <div className="header__profile-img" style={{ backgroundImage: `url(${userData.image})` }}></div>
          </Link>
        </div>
        <Link to="/" onClick={() => onLogout()} className="header__log-out">
          Log Out
        </Link>
      </div>
    ) : (
      <div className="header__auth">
        <Link to="/sign-in" className="header__sign-in">
          Sign In
        </Link>
        <Link to="/sign-up" className="header__sign-up">
          Sing Up
        </Link>
      </div>
    );
  return (
    <header className="header">
      <Link to="/">
        <h3 onClick={() => getArticles()} className="header__title">
          Realworld Blog
        </h3>
      </Link>
      {panel}
    </header>
  );
};

export default Header;
