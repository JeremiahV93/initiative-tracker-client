import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.jpg';
import './LandingPage.scss';

class LandingPage extends React.Component {
  render() {
    return (
      <div className='container'>
          <h1>Initiative Tracker!</h1>
        <div className='row-cols-2 buttons'>
          <Link to={'/login'} className="btn-info">Log In</Link>
          <Link to={'/newUser'} className="btn-success"> Create an Account</Link>
        </div>
          <img src={logo} alt='Wax Seal' height={500}/>
        {/* <div className='row-cols-2'>
          <Link>Enter Room Code</Link>
        </div> */}
      </div>
    );
  }
}

export default LandingPage;
