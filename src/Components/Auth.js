import React from 'react';
import UserData from '../Helpers/data/userData';

class Auth extends React.Component {
  state = {
    username: '',
    password: '',
  }

  usernameChange = (e) => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  passwordChange = (e) => {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  authCheck = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const userObj = {
      username, password,
    };
    const jsonObj = JSON.stringify(userObj);
    UserData.authUser(jsonObj)
      .then((res) => {
        if (res.data.valid) {
          localStorage.setItem('authed', true);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user_id', res.data.user_id);

          this.props.authToggle();
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="Username">Username:</label>
          <input type="name" className="form-control" id="Username" onChange={this.usernameChange} aria-describedby="Username" placeholder="Enter Username"/>
        </div>
        <div className="form-group">
          <label for="Password">Password:</label>
          <input type="password" className="form-control" id="Password" onChange={this.passwordChange} placeholder="Password"/>
        </div>
        <button onClick={this.authCheck} className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default Auth;
