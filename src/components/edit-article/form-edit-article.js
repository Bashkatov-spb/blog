import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import BlogService from '../../services/blog-services';
import Loader from '../loader/loader';

const FormEditArticle = ({ articlesData, updateData, userData }) => {
  const service = new BlogService();
  const { slug } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [articleTitle, setArticleTitle] = useState(null);
  const [articleDescription, setArticleDescription] = useState(null);
  const [articleBody, setArticleBody] = useState(null);
  const [tags, setTags] = useState(null);
  const [tagValue, setTagValue] = useState('');

  useEffect(() => {
    getArticleInfo(slug);
  }, [articlesData]);

  const getArticleInfo = async (slug) => {
    const res = await service.getArticle(slug);
    setArticleData(res.article);
    setArticleTitle(res.article.title);
    setArticleDescription(res.article.description);
    setArticleBody(res.article.body);
    setTags(res.article.tagList);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
  });

  const onChangeTagValue = (e) => {
    setTagValue(e.target.value);
  };

  const tagsList = (tags) => {
    if (tags !== null) {
      return tags.map((item, idx) => {
        return (
          <div key={idx} className="create-article__tag-add-panel">
            <input disabled={true} onChange={onChangeTagValue} value={item} type="text" placeholder="tag"></input>
            <button id={idx + 1} onClick={deleteTag} type="button" className="create-article__tag-delete">
              Delete
            </button>
          </div>
        );
      });
    }
  };

  const addTag = (value) => {
    if (value === '') {
      return;
    }
    if (tags === null) {
      setTags([value]);
    } else {
      setTags([...tags, value]);
    }
    setTagValue('');
  };

  const deleteTag = (e) => {
    const newTags = tags.filter((item, idx) => {
      if (idx + 1 === +e.target.id) return false;
      return true;
    });
    setTags(newTags);
  };

  const onSubmit = async (data) => {
    const articleData = { ...data, tagList: tags };
    await service.updateArticle(articleData, slug);
    updateData();
  };

  if (!isSubmitSuccessful) {
    if (articleData !== null && userData !== null) {
      if (articleData.author.username !== userData.username) {
        return <Redirect to="/" />;
      }
      return (
        <div className="create-article__container">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h2 className="create-article__title">Edit article</h2>
            <div className="create-article__control">
              <label>Title</label>
              <input
                {...register('title', { required: 'Поле обязятельно к заполнению' })}
                onChange={(e) => setArticleTitle(e.target.value)}
                value={articleTitle}
                type="text"
                placeholder="Title"
              ></input>
              {errors?.title && <small>{errors?.title?.message || 'Error'}</small>}
            </div>
            <div className="create-article__control">
              <label>Short description</label>
              <input
                {...register('description', { required: 'Поле обязятельно к заполнению' })}
                onChange={(e) => setArticleDescription(e.target.value)}
                value={articleDescription}
                type="text"
                placeholder="Short description"
              ></input>
              {errors?.description && <small>{errors?.description?.message || 'Error'}</small>}
            </div>
            <div className="create-article__control">
              <label>Text</label>
              <textarea
                {...register('body', { required: 'Поле обязятельно к заполнению' })}
                onChange={(e) => setArticleBody(e.target.value)}
                value={articleBody}
                className="create-article__text-area"
                placeholder="text"
              ></textarea>
              {errors?.body && <small>{errors?.body?.message || 'Error'}</small>}
            </div>
            <div className="create-article__control tags">
              <label>Tags</label>
              {tagsList(tags)}
              <div className="create-article__tag-add-panel">
                <input value={tagValue} onChange={onChangeTagValue} type="text" placeholder="tag"></input>
                <button type="button" className="create-article__tag-delete">
                  Delete
                </button>
                <button onClick={() => addTag(tagValue)} type="button" className="create-article__tag-add">
                  Add tag
                </button>
              </div>
            </div>
            <button type="submit" className="create-article__btn">
              Send
            </button>
          </form>
        </div>
      );
    } else {
      return <Loader />;
    }
  } else {
    return <Redirect to="/" />;
  }
};

export default FormEditArticle;
