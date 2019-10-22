import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../redux/auth/auth.actions';

const NavBar = ({ isAuthenticated, logout }) => {
  const UserLoggedIn = isAuthenticated ? (
    <Button color='inherit' component={Link} to='/login' onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button color='inherit' component={Link} to='/login'>
      Login
    </Button>
  );

  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {UserLoggedIn}
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>
        <Button color='inherit' component={Link} to='/signup'>
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
