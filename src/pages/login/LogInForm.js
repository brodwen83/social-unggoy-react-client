import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const LoginForm = ({ onChange, onSubmit, classes, login, errors, loading }) => {
  const loginText = loading ? 'Loging in...' : 'Login';

  return (
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
        helperText={errors.email}
        error={errors.email ? true : false}
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
        helperText={errors.password}
        error={errors.password ? true : false}
      />
      {errors.general && (
        <Typography className={classes.customError}>
          {errors.general}
        </Typography>
      )}
      <div className={classes.btnWrapper}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
          disabled={loading}
          fullWidth
        >
          {loginText}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  login: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;
