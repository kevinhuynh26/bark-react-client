//REACT
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//MATERIAL UI
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";

//COMPONENTS
import MyButton from "./MyButton";
import PostBark from "./PostBark";
import Notification from "./Notification";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostBark />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon color="primary" />
                </MyButton>
              </Link>

              <Notification />
            </Fragment>
          ) : (
            <Fragment>
              <Fragment>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navbar);
