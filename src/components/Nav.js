import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../contexts/theme';
import '../stylesheets/Nav.css';

const Nav = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Top
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="active">
            New
          </NavLink>
        </li>
        <li>
          <button onClick={toggleTheme}>{theme === 'light' ? '🔦' : '💡'}</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
