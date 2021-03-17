import React from 'react';

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './App.scss';

// import userData from '../Helpers/data/userData';

import Home from '../Components/Home';
import LandingPage from '../Components/LandingPage/LandingPage';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/landingPage', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const RoutesContainer = ({ authed }) => (
    <div>
      <Switch>
        <PrivateRoute path="/home" component={Home} authed={authed} />

        <PublicRoute path='/landingPage' component={LandingPage} authed={authed} />

        <Redirect from='*' to='/home' />
      </Switch>
    </div>
);

class App extends React.Component {
  state = {
    authed: null,
  }

  componentDidMount() {
    if (localStorage.getItem('authed') === 'true') {
      this.setState({ authed: true });
    } else {
      this.setState({ authed: false });
    }
  }

  authToggle = () => {
    const { authed } = this.state;
    this.setState({ authed: !authed });
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
            <RoutesContainer authed={authed} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
