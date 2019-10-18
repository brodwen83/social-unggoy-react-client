import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LogInForm';

import AppIcon from '../../images/social-unggoy-icon.jpg';

const styles = theme => ({
  ...theme.appStyles,
});

const Login = ({ classes, history }) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('login', login);

    setErrors({});
    setLoading(true);

    const loginData = {
      email: login.email,
      password: login.password,
    };

    try {
      const { data } = await axios.post('/login', loginData);

      setLoading(false);
      console.log('res.data', data);
      localStorage.setItem('FBToken', data.token);
      history.push('/');
    } catch (error) {
      setErrors(error.response.data);
      setLoading(false);
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='unggoy' width={42} className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Login
        </Typography>
        <LoginForm
          data={login}
          classes={classes}
          onSubmit={handleSubmit}
          onChange={handleChange}
          errors={errors}
          loading={loading}
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
};

export default withStyles(styles)(Login);
