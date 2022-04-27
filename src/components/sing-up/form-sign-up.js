import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, Link } from 'react-router-dom';

import BlogService from '../../services/blog-services';
import './form-sign-up.scss';

const FormSignUp = () => {
  const service = new BlogService();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    service.registerUser(data);
    reset();
  };

  if (!isSubmitSuccessful) {
    return (
      <div className="sign-up__container">
        <form onSubmit={handleSubmit(onSubmit)} className="sign-up">
          <h2 className="sign-up__title">Create new account</h2>
          <div className="sign-up__control">
            <label htmlFor="username">Username</label>
            <input
              {...register('username', {
                required: 'Поле обязятельно к заполнению',
                maxLength: { value: 20, message: 'Максимум 20 символов' },
                minLength: { value: 3, message: 'Минимум 3 символа' },
              })}
              type="text"
              placeholder="Username"
            ></input>
            {errors?.username && <small>{errors?.username?.message || 'Error'}</small>}
          </div>
          <div className="sign-up__control">
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
            ></input>
            {errors?.email && <small>{errors?.email?.message || 'Введен некорректный Email'}</small>}
          </div>
          <div className="sign-up__control">
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
          <div className="sign-up__control">
            <label htmlFor="password2">Repeat password</label>
            <input
              {...register('password2', {
                required: 'Поле обязятельно к заполнению',
                maxLength: { value: 40, message: 'Максимум 40 символов' },
                minLength: { value: 6, message: 'Минимум 6 символа' },
              })}
              type="password"
              placeholder="Password"
            ></input>
            {errors?.password2 && <small>{errors?.password2?.message || 'Пароли должны совпадать'}</small>}
          </div>
          <div className="sign-up__agree">
            <label>
              <input
                {...register('agreement', { required: 'Вы должны согласиться с условиями регистрации' })}
                className="sign-up__agree-checkbox"
                type="checkbox"
              ></input>
            </label>
            <div className="sign-up__agree-text">I agree to the processing of my personal information</div>
          </div>
          {errors?.agreement && <small className="sign-up__agree-error">{errors?.agreement?.message}</small>}
          <button type="submit" className="sign-up__btn">
            Create
          </button>
          <div className="sign-up__sign-in">
            <p>
              Already have an account? <Link to="/sign-in">Sign In.</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
  return <Redirect to="/sign-in" />;
};

export default FormSignUp;
