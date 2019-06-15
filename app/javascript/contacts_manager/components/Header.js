// component to display the app's title

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>
      <Link to="/contacts">Contact Manager</Link>
    </h1>
  </header>
);

export default Header;
