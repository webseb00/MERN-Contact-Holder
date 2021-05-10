import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { AlertContext } from '../../context/alert/AlertState';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const history = useHistory();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if(isAuthenticated) {
      history.push('/');
    }

    if(error === 'Invalid credentials!') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  )
};

export default Login;