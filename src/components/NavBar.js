import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/auth/auth.actions';
import { decodeToken } from '../utils/decodeToken';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MyButton from './mybutton/MyButton';

// MUI Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';

const NavBar = ({ isAuthenticated, tokenExpired, logout }) => {
  const userIsAuthenticated =
    isAuthenticated && !tokenExpired ? (
      <React.Fragment>
        <MyButton tip='Post a scream'>
          <AddIcon color='primary' />
        </MyButton>
        <Link to='/'>
          <MyButton tip='Home'>
            <HomeIcon color='primary' />
          </MyButton>
        </Link>
        <MyButton tip='Notifications'>
          <NotificationsIcon color='primary' />
        </MyButton>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Button color='inherit' component={Link} to='/login'>
          Login
        </Button>
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>
        <Button color='inherit' component={Link} to='/signup'>
          Signup
        </Button>
      </React.Fragment>
    );

  return (
    <AppBar>
      <Toolbar className='nav-container'>{userIsAuthenticated}</Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => {
  const { isAuthenticated, token } = state.auth;
  const { tokenExpired } = decodeToken(token);

  return {
    isAuthenticated,
    tokenExpired: typeof tokenExpired === 'undefined' ? false : tokenExpired,
  };
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  tokenExpired: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
