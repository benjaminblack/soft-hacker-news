import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '../contexts/theme';
import '../stylesheets/App.css';
import Nav from './Nav';
import Post from './Post';
import Stories from './Stories';
import User from './User';

class App extends React.Component {
  state = {
    theme: 'light',
  };

  render() {
    const { theme } = this.state;

    const themeContext = {
      theme,
      toggleTheme: () => this.setState(({ theme }) => ({ theme: theme === 'light' ? 'dark' : 'light' })),
    };

    return (
      <ThemeProvider value={themeContext}>
        <Router>
          <main className={theme}>
            <div className="container">
              <Nav />
              <Switch>
                <Route exact path="/" render={(props) => <Stories key="top" {...props} endpoint="top" />} />
                <Route path="/new" render={(props) => <Stories key="new" {...props} endpoint="new" />} />
                <Route path="/post" component={Post} />
                <Route path="/user" component={User} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </main>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
