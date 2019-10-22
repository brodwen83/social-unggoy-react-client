import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LogInForm';

import AppIcon from '../../images/social-unggoy-icon.jpg';

import { loginUser } from '../../redux/auth/auth.actions';

const styles = theme => ({
  ...theme.appStyles,
});

const Login = ({ classes, history, login, user, auth }) => {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors !== auth.errors && errors !== {}) setErrors(auth.errors);
    return () => {};
  }, [errors, auth.errors]);

  const handleChange = e => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('login', loginValues);

    login(loginValues, history);
  };

  const { isLoggingIn } = auth;

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='unggoy' width={42} className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Login
        </Typography>
        <LoginForm
          data={loginValues}
          classes={classes}
          onSubmit={handleSubmit}
          onChange={handleChange}
          errors={errors}
          loading={isLoggingIn}
        />
        <Typography variant='caption'>
          Don't have an account? sign up <Link to='/signup'>here</Link>.
        </Typography>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = {
  login: loginUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Login));
