import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppIcon from '../../images/social-unggoy-icon.jpg';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoginForm from './LogInForm';

const styles = {
  form: {
    textAlign: 'center',
  },
  image: {
    margin: '20px auto 20px auto',
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
};

const Login = ({ classes }) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('login', login);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='unggoy' width={42} className={classes.image} />
        <Typography variant='h3' className={classes.pageTitle}>
          Login
        </Typography>
        <LoginForm
          login={login}
          classes={classes}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Login);
