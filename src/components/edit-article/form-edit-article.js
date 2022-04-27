import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';

import BlogService from '../../services/blog-services';

const FormEditArticle = ({ articlesData, slug, updateData }) => {
  const service = new BlogService();
  const articleData = articlesData.filter((item) => item.slug === slug);
  const { body, title, tagList, description } = articleData[0];
  const [articleTitle, setArticleTitle] = useState(title);
  const [articleDescription, setArticleDescription] = useState(description);
  const [articleBody, setArticleBody] = useState(body);
  const [tags, setTags] = useState(tagList);
  const [tagValue, setTagValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const valval = (e) => {
    setTagValue(e.target.value);
  };

  const tagsList = (tags) => {
    if (tags !== null) {
      return tags.map((item, idx) => {
        return (
          <div key={idx} className="create-article__tag-add-panel">
            <input disabled={true} onChange={valval} value={item} type="text" placeholder="tag"></input>
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
    updateData();
    const articleData = { ...data, tagList: tags };
    await service.updateArticle(articleData, slug);
  };

  if (!isSubmitSuccessful) {
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
              <input value={tagValue} onChange={valval} type="text" placeholder="tag"></input>
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
  }
  return <Redirect to="/" />;
};

export default FormEditArticle;
