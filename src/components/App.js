import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../stylesheets/App.css';
import Nav from './Nav';
import Stories from './Stories';
import Post from './Post';
import ThemeContext from '../contexts/theme';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <main className={theme}>
          <div className="container">
            <Nav />
            <Switch>
              <Route exact path="/" render={(props) => <Stories key="top" {...props} type="top" />} />
              <Route path="/new" render={(props) => <Stories key="new" {...props} type="new" />} />
              <Route path="/post" component={Post} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </main>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
