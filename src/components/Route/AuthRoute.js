import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { decodeToken } from '../../utils/decodeToken';
import { userLoggedOut } from '../../redux/user/user.actions';

const AuthRoute = ({
  component: Component,
  authenticated,
  decodedToken: { tokenExpired },
  logout,
  ...rest
}) => {
  if (tokenExpired) {
    logout();
    return <Redirect to='/login' />;
  }
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => {
  const { authenticated } = state.user.auth;

  return {
    authenticated,
    decodedToken: decodeToken(state.user.auth.token),
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userLoggedOut()),
});

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  decodedToken: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthRoute);
