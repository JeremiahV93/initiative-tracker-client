import React from 'react';

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './App.scss';

// import userData from '../Helpers/data/userData';
import Navbar from '../Components/Navbar/NavBar';
import Home from '../Components/Home';
import LandingPage from '../Components/LandingPage/LandingPage';
import Login from '../Components/Auth/Auth';
import NewUser from '../Components/NewUser';
import Encounters from '../Components/Encounters/Encounters';
import Campaigns from '../Components/Campaigns/Campaigns';
import Monsters from '../Components/Monsters/Monsters';
import MonsterForm from '../Components/Monsters/MonsterForm';
import Characters from '../Components/PlayerCharacters/PlayerCharacters';
import CharacterForm from '../Components/PlayerCharacters/CharacterForm';
import UpdateForm from '../Components/PlayerCharacters/UpdateForm';

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

const RoutesContainer = ({ authed, authToggle }) => (
    <div>
      <Switch>
        <PrivateRoute path="/home" component={Encounters} authed={authed} />
        <PrivateRoute path="/encounters" component={Encounters} authed={authed} />
        <PrivateRoute path="/encounters/:campaignId" component={Encounters} authed={authed} />
        <PrivateRoute path="/monsters" component={Monsters} authed={authed} />
        <PrivateRoute path="/campaigns" component={Campaigns} authed={authed} />
        <PrivateRoute path="/monster-form" component={MonsterForm} authed={authed} />
        <PrivateRoute path="/characters" component={Characters} authed={authed} />
        <PrivateRoute path="/character-form" component={CharacterForm} authed={authed} />
        <PrivateRoute path="/update/:characterId" component={UpdateForm} authed={authed} />

        <PublicRoute path='/landingPage' component={LandingPage} authed={authed} />
        <PublicRoute path='/login' component={Login} authed={authed} authToggle={authToggle}/>
        <PublicRoute path='/newUser' component={NewUser} authed={authed} authToggle={authToggle} />

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
          <Navbar authed={authed} authToggle={this.authToggle} />
          <RoutesContainer authed={authed} authToggle={this.authToggle} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
