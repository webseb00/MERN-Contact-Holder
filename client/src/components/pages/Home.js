import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthState';

const Home = () => {

  const value = useContext(AuthContext);
  console.log(value);


  return (
    <h1>Home component</h1>
  )
};

export default Home;