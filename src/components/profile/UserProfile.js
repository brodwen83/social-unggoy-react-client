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
  user,
  user: {
    loading,
    data: { credentials },
  },
  isAuthenticated,
  getUser,
}) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  console.log('UserProfile->credentials', user.data.credentials);
  let userProfileMarkup = !loading ? (
    isAuthenticated ? (
      <ProfileDetails classes={classes} {...credentials} />
    ) : (
      <NoProfileDetails classes={classes} />
    )
  ) : (
    <p>Loading...</p>
  );

  return userProfileMarkup;
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
