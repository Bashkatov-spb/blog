import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';

import './form-sign-in.scss';
import BlogService from '../../services/blog-services';

const FormSignIn = ({ checkUserAuth, isLoggedIn }) => {
  const service = new BlogService();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await service.getUserToken(data);
    localStorage.setItem('token', res.user.token);
    checkUserAuth(res.user);
    reset();
  };

  if (!isLoggedIn) {
    return (
      <div className="sign-in__container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2 className="sign-in__title">Sign In</h2>
          <div className="sign-in__control">
            <label htmlFor="email">Email address</label>
            <input
              {...register('email', { required: 'Поле обязятельно к заполнению' })}
              type="email"
              placeholder="Email address"
            ></input>
            {errors?.email && <small>{errors?.email?.message || 'Error'}</small>}
          </div>
          <div className="sign-in__control">
            <label htmlFor="password">Password</label>
            <input
              {...register('password', { required: 'Поле обязятельно к заполнению' })}
              type="password"
              placeholder="Password"
            ></input>
            {errors?.password && <small>{errors?.password?.message || 'Error'}</small>}
          </div>
          <button type="submit" className="sign-in__btn">
            Login
          </button>
          <div className="sign-in__sign-in">
            <p>
              Don t have an account? <Link to="/sign-up">Sign Up.</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
  return <Redirect to="/" />;
};

export default FormSignIn;
