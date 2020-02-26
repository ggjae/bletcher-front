import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as AuthAction from "../../Redux/Actions/AuthAction";

import cx from "classnames";
import logo from "../../logo.svg";

import { Nav, Navbar, NavItem, NavLink, NavbarBrand } from "reactstrap";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isActive } = this.props;
    return (
      <Navbar
        className={cx("navBar", { "navBar__primary": isActive !== "main" })}
        light
        fixed
        expand="md"
      >
        <NavbarBrand className="navBar__logo col-2 ml-5" href="/">
          <img src={logo} width="33px" alt="logo" />
          {isActive === "main" ? null : <span>Bletcher</span>}
        </NavbarBrand>
        {isActive === "main" ? (
          <Nav className="ml-auto mr-5" navbar>
            <NavItem>
              <NavLink href="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">About</NavLink>
            </NavItem>
          </Nav>
        ) : (
            <Nav className="ml-auto mr-3" navbar>
              <NavItem>
                <NavLink href="#">Feed</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">MyPage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.handleSignOut}>SignOut</NavLink>
              </NavItem>
            </Nav>
          )}
      </Navbar>
    );
  }

  handleSignOut = () => {
    this.props.dispatch(AuthAction.signOut()).then(async result => {
      this.props.history.push({ pathname: "/" });
    });
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(NavBar));