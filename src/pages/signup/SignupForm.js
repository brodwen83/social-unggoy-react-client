import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const SignupForm = ({ onChange, onSubmit, classes, data, errors, loading }) => {
  const loginText = loading ? 'Signing in...' : 'Signup';

  return (
    <form noValidate onSubmit={onSubmit}>
      <TextField
        id='email'
        name='email'
        type='email'
        label='Email'
        value={data.email}
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
        value={data.password}
        fullWidth
        className={classes.textField}
        onChange={onChange}
        helperText={errors.password}
        error={errors.password ? true : false}
      />
      <TextField
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        label='Confirm Password'
        value={data.confirmPassword}
        fullWidth
        className={classes.textField}
        onChange={onChange}
        helperText={errors.confirmPassword}
        error={errors.confirmPassword ? true : false}
      />
      <TextField
        id='handle'
        name='handle'
        type='handle'
        label='Handle'
        value={data.handle}
        fullWidth
        className={classes.textField}
        onChange={onChange}
        helperText={errors.handle}
        error={errors.handle ? true : false}
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

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SignupForm;
