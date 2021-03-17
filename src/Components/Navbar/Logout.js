import React from 'react';

class Logout extends React.Component {
    logoutFunc = (e) => {
      e.preventDefault();
      localStorage.removeItem('authed');
      localStorage.removeItem('token');
      localStorage.removeItem('lu_token');

      this.props.authToggle();
    };

    render() {
      return (
        <div className="button">
            <button className="btn btn-primary" onClick={this.logoutFunc}>Logout</button>
        </div>
      );
    }
}

export default Logout;
