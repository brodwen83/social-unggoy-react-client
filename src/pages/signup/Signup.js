import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SignupForm from './SignupForm';

import AppIcon from '../../images/social-unggoy-icon.jpg';

const styles = theme => ({
  ...theme.appStyles,
});

const Signup = ({ classes, history }) => {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('login', signupData);

    setErrors({});
    setLoading(true);

    try {
      const { data } = await axios.post('/signup', { ...signupData });

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
          Signup
        </Typography>
        <SignupForm
          data={signupData}
          classes={classes}
          onSubmit={handleSubmit}
          onChange={handleChange}
          errors={errors}
          loading={loading}
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
};

export default withStyles(styles)(Signup);
