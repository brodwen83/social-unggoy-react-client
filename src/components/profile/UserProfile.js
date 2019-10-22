import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './userProfile.styles';
import ProfileDetails from './ProfileDetails';
import NoProfileDetails from './NoProfileDetails';
import { getUserData } from '../../redux/user/user.actions';

const UserProfile = ({
  classes,
  user: {
    loading,
    data: { credentials },
  },
  isAuthenticated,
  getUser,
}) => {
  useEffect(() => {
    if (isAuthenticated) getUser();
  }, [getUser, isAuthenticated]);

  console.log('UserProfile->credentials', credentials);
  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <NoProfileDetails classes={classes} />;
  return <ProfileDetails classes={classes} {...credentials} />;
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUserData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserProfile));
