import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';
import '../stylesheets/Nav.css';

function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
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
      )}
    </ThemeConsumer>
  );
}

export default Nav;
