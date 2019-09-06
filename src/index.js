import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import Nav from './components/Nav';
import { ThemeProvider } from './contexts/theme';
import './stylesheets/index.css';

const Top = React.lazy(() => import('./components/TopStories'));
const New = React.lazy(() => import('./components/NewStories'));

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () =>
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light',
      })),
  };

  render() {
    const { theme } = this.state;

    return (
      <Router>
        <ThemeProvider value={this.state}>
          <main className={theme}>
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Top} />
                <Route exact path="/new" component={New} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </React.Suspense>
          </main>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
