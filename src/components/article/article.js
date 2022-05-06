import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import TagList from '../tag-list/tag-list';
import BlogService from '../../services/blog-services';
import './article.scss';
import Loader from '../loader/loader';

const Article = ({ articlesData, userData, isLoggedIn, updateData }) => {
  let { slug } = useParams();
  const service = new BlogService();
  const [articleData, setArticleData] = useState(null);
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(null);
  const [isFavorited, setIsFavorited] = useState(null);

  const onToggleLike = async (item) => {
    if (isLoggedIn && isFavorited) {
      service.setLike(item);
      setIsFavorited(false);
      setFavoritesCount(favoritesCount - 1);
    }
    if (isLoggedIn && !isFavorited) {
      service.setDislike(item);
      setIsFavorited(true);
      setFavoritesCount(favoritesCount + 1);
    }
  };

  useEffect(() => {
    getArticleInfo(slug);
  }, [articlesData]);

  const getArticleInfo = async (slug) => {
    const res = await service.getArticle(slug);
    setArticleData(res.article);
    setFavoritesCount(res.article.favoritesCount);
    setIsFavorited(res.article.favorited);
  };

  const deleteArticle = async (slug) => {
    await service.deleteArticle(slug);
    console.log('deleted');
    updateData();
  };
  if (articleData !== null) {
    const { title, tagList, author, createdAt, body } = articleData;
    let editPanel = null;
    if (isLoggedIn) {
      editPanel = userData.username === author.username && (
        <div className="main__article-edit">
          <button onClick={() => setShowModalWindow(true)} className="main__article-btn-delete">
            Delete
          </button>
          <Link to={`/edit-article/${slug}`}>
            <button className="main__article-btn-edit">Edit</button>
          </Link>
        </div>
      );
    }
    return (
      <div className="main__article-item full-article">
        <div className="main__article-info">
          <div className="main__article-header">
            <div className="main__article-header--container">
              <h3 className="main__article-title">{title}</h3>
              <img
                onClick={() => onToggleLike(articleData.slug)}
                src={isLoggedIn && isFavorited ? '/like-full.svg' : '/like-empty.svg'}
                className="main__article-heart"
                alt="heart"
              ></img>
              <div className="main__article-likes">{favoritesCount}</div>
            </div>
            <TagList tags={tagList} />
          </div>
          <div className="main__article-author">
            {editPanel}
            {showModalWindow && (
              <div className="main__article-ask-window">
                <div className="main__article-ask-question">
                  <div className="main__article-ask-img"></div>
                  <p>Are you sure to delete this article?</p>
                </div>
                <div className="main__article-ask-buttons">
                  <button onClick={() => setShowModalWindow(false)} className="main__article-ask-no">
                    No
                  </button>
                  <Link to="/articles">
                    <button onClick={() => deleteArticle(slug)} className="main__article-ask-yes">
                      Yes
                    </button>
                  </Link>
                </div>
              </div>
            )}
            <div className="main__article-author--info">
              <h4 className="main__article-author--name">{author.username}</h4>
              <p className="main__article-date">{format(new Date(createdAt), 'MMMM d, y')}</p>
            </div>
            <img src={author.image} className="main__article-author--img" alt="author-pic"></img>
          </div>
        </div>
        <div className="main__article-text">
          <ReactMarkdown>{body}</ReactMarkdown>
          <p></p>
        </div>
      </div>
    );
  }
  return <Loader />;
};

export default Article;
