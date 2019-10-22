import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../../redux/auth/auth.actions';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SignupForm from './SignupForm';

import AppIcon from '../../images/social-unggoy-icon.jpg';

const styles = theme => ({
  ...theme.appStyles,
});

const Signup = ({ classes, history, UI, users, signupUser }) => {
  const [newUserData, setNewUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors !== UI.errors && errors !== {}) setErrors(UI.errors);
  }, [errors, UI.errors]);

  const handleChange = e => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('login', newUserData);
    signupUser(newUserData, history);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='unggoy' width={42} className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Signup
        </Typography>
        <SignupForm
          data={newUserData}
          classes={classes}
          onSubmit={handleSubmit}
          onChange={handleChange}
          errors={errors}
          loading={UI.loading}
        />
        <Typography variant='caption'>
          Already have an account? login <Link to='/login'>here</Link>.
        </Typography>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  UI: PropTypes.shape({}).isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  { signupUser },
)(withStyles(styles)(Signup));
