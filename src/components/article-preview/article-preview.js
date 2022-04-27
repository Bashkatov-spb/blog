import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import TagList from '../tag-list/tag-list';
import BlogService from '../../services/blog-services';

const ArticlePreview = ({ data, isLoggedIn }) => {
  const service = new BlogService();
  const [favoritesCount, setFavoritesCount] = useState(data.favoritesCount);
  const [isFavorited, setIsFavorited] = useState(data.favorited);
  const { slug, title, tagList, author, createdAt, description } = data;

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
    setIsFavorited(data.favorited);
  }, [data]);

  return (
    <div className="main__article-item">
      <div className="main__article-info">
        <div className="main__article-header">
          <div className="main__article-header--container">
            <Link to={`/articles/${slug}`}>
              <h3 className="main__article-title">{title}</h3>
            </Link>
            <img
              onClick={() => onToggleLike(data.slug)}
              src={isLoggedIn && isFavorited ? '/like-full.svg' : '/like-empty.svg'}
              className="main__article-heart"
              alt="heart"
            ></img>
            <div className="main__article-likes">{favoritesCount}</div>
          </div>
          <TagList tags={tagList} />
        </div>
        <div className="main__article-author">
          <div className="main__article-author--info">
            <h4 className="main__article-author--name">{author.username}</h4>
            <p className="main__article-date">{format(new Date(createdAt), 'MMMM d, y')}</p>
          </div>
          <img src={author.image} className="main__article-author--img" alt="user-img"></img>
        </div>
      </div>
      <div className="main__article-description">{description}</div>
    </div>
  );
};

export default ArticlePreview;
