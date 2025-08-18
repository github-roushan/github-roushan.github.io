import React from 'react';
import logo from '../assets/images/mockito_logo.png'; // adjust path as needed

const MockitLogo = (props) => (
  <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Mockit Logo</title>
    <image href={logo} x="0" y="0" width="200" height="50" />
  </svg>
);

export default MockitLogo;
