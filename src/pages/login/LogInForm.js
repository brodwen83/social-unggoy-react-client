import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = ({ onChange, onSubmit, classes, login }) => (
  <form noValidate onSubmit={onSubmit}>
    <TextField
      id='email'
      name='email'
      type='email'
      label='Email'
      value={login.email}
      fullWidth
      className={classes.textField}
      onChange={onChange}
    />
    <TextField
      id='password'
      name='password'
      type='password'
      label='Password'
      value={login.password}
      fullWidth
      className={classes.textField}
      onChange={onChange}
    />
    <Button
      type='submit'
      variant='contained'
      color='primary'
      className={classes.button}
    >
      Submit
    </Button>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  login: PropTypes.shape({}).isRequired,
};

export default LoginForm;
