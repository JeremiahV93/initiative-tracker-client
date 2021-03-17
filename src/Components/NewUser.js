import React from 'react';
import authData from '../Helpers/data/userData';

class NewUser extends React.Component {
  state = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
  }

  usernameChange = (e) => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  passwordChange = (e) => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  firstnameChange = (e) => {
    e.preventDefault();
    this.setState({ first_name: e.target.value });
  }

  lastnameChange = (e) => {
    e.preventDefault();
    this.setState({ last_name: e.target.value });
  }

  emailChange = (e) => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  createUser = (e) => {
    e.preventDefault();
    const {
      // eslint-disable-next-line camelcase
      username, first_name, last_name, email, password,
    } = this.state;
    const userObj = {
      username, first_name, last_name, email, password,
    };
    const jsonObj = JSON.stringify(userObj);
    authData.newUser(jsonObj)
      .then((res) => {
        if (res.data.valid === true) {
          localStorage.setItem('authed', true);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user_id', res.data.user_id);
          this.props.authToggle();
        } else {
          console.error('incorrecct password and/or username');
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <form>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="Email">Email</label>
          <input type="email" className="form-control" onChange={this.emailChange} id="Email" placeholder="Email"/>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="Password">Password</label>
          <input type="password" className="form-control" onChange={this.passwordChange} id="Password" placeholder="Password"/>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
            <label htmlFor="First Name">First Name</label>
            <input type="text" className="form-control" onChange={this.firstnameChange} id="First Name" />
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="Last Name">Last Name</label>
            <input type="text" className="form-control" onChange={this.lastnameChange} id="Last Name" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="Username">Username</label>
          <input type="text" className="form-control" onChange={this.usernameChange} id="Username"/>
        </div>
      </div>
        <button onClick={this.createUser} className="btn btn-primary">Create Account</button>
      </form>
    );
  }
}

export default NewUser;
