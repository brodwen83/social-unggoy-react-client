import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { decodeToken } from '../../utils/decodeToken';
import { userLoggedOut } from '../../redux/auth/auth.actions';

const AuthRoute = ({
  component: Component,
  isAuthenticated,
  decodedToken: { tokenExpired },
  logout,
  ...rest
}) => {
  if (tokenExpired) {
    console.log('Token expired.', tokenExpired);
    logout();
    return <Redirect to='/login' />;
  }
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => {
  const { isAuthenticated, token } = state.auth;

  return {
    isAuthenticated,
    decodedToken: decodeToken(token),
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userLoggedOut()),
});

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  decodedToken: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthRoute);
