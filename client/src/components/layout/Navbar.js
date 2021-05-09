import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';
import { ContactContext } from '../../context/contacts/ContactState';

const Navbar = ({ title, icon }) => {

  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearContacts } = contactContext;

  useEffect(() => {
    loadUser();
  }, []);

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;