import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MUI stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const NoProfileDetails = ({ classes }) => (
  <Paper className={classes.paper}>
    <Typography variant='body2' align='center'>
      No profile found, plese login again
    </Typography>
    <div className={classes.buttons}>
      <Button variant='contained' color='primary' component={Link} to='/login'>
        Login
      </Button>
      <Button
        variant='contained'
        color='secondary'
        component={Link}
        to='/signup'
      >
        Signup
      </Button>
    </div>
  </Paper>
);

NoProfileDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default NoProfileDetails;
