import React from 'react';
import { useForm } from 'react-hook-form';
import './edit-profile.scss';
import { Redirect } from 'react-router-dom';

import BlogService from '../../services/blog-services';

const EditProfile = ({ getInfoAboutLogin, userData }) => {
  const service = new BlogService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({});

  const onSubmit = (data) => {
    service.updateUser(data);
    getInfoAboutLogin();
  };

  if (!isSubmitSuccessful) {
    return (
      <div className="form__container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2 className="form__title">Edit Profile</h2>
          <div className="form__control">
            <label htmlFor="username">Username</label>
            <input
              {...register('username', {
                required: 'Поле обязятельно к заполнению',
                maxLength: { value: 20, message: 'Максимум 20 символов' },
                minLength: { value: 3, message: 'Минимум 3 символа' },
              })}
              type="text"
              placeholder="Username"
              defaultValue={userData !== null ? userData.username : ''}
            ></input>
            {errors?.username && <small>{errors?.username?.message || 'Error'}</small>}
          </div>
          <div className="form__control">
            <label htmlFor="email">Email address</label>
            <input
              {...register('email', {
                required: 'Поле обязятельно к заполнению',
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              type="text"
              id="email"
              placeholder="Email address"
              defaultValue={userData !== null ? userData.email : ''}
            ></input>
            {errors?.email && <small>{errors?.email?.message || 'Введен некорректный Email'}</small>}
          </div>
          <div className="form__control">
            <label htmlFor="password">Password</label>
            <input
              {...register('password', {
                required: 'Поле обязятельно к заполнению',
                maxLength: { value: 40, message: 'Максимум 40 символов' },
                minLength: { value: 6, message: 'Минимум 6 символа' },
              })}
              type="password"
              placeholder="Password"
            ></input>
            {errors?.password && (
              <small>{errors?.password?.message || 'Длина пароля должна быть не менее 6 символов'}</small>
            )}
          </div>
          <div className="form__control">
            <label htmlFor="image">Avatar image (url)</label>
            <input
              {...register('image', {
                pattern: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
              })}
              type="text"
              id="avatar"
              placeholder="Avatar image"
              defaultValue={userData !== null ? userData.image : ''}
            ></input>
            {errors?.image && <small>{errors?.image?.message || 'Введите корректный URL'}</small>}
          </div>
          <button type="submit" className="form__btn">
            Save
          </button>
        </form>
      </div>
    );
  }
  return <Redirect to="/" />;
};

export default EditProfile;
