import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import PatternPage from './PatternPage';
import PatternCard from './PatternCard';
import UserPage from './UserPage/UserPage';
import HomePage from './HomePage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/user" component={UserPage} />
          <Route
            path="/patterns/:pattern_id"
            render={({ match, location, history }) => (
              <PatternPage match={match} location={location} history={history} />
            )}
          />
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
