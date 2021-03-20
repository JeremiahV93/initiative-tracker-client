import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import logo from '../../Assets/logo.jpg';
import Logout from './Logout';

class MyNavbar extends React.Component {
  state ={
    isOpen: false,
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { authed, authToggle } = this.props;

    const buildNavBar = () => {
      if (authed) {
        return (
          <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/campaigns'>Campaigns</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/encounters'>Encounters</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/characters'>Player Characters</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/monsters'>Monsters</NavLink>
          </NavItem>
          <NavItem>
            <Logout authToggle={authToggle} ></Logout>
          </NavItem>
        </Nav>
        );
      }
      return (
        <Nav>
        </Nav>
      );
    };

    return (
      <div >
        <Navbar color="light" light expand="md">
          <img src={logo} alt='Wax Seal' height={40}/>
          <NavbarBrand>Initiative Tracker</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            {buildNavBar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
