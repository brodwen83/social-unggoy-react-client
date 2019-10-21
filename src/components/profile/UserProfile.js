import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './userProfile.styles';
import ProfileDetails from './ProfileDetails';
import NoProfileDetails from './NoProfileDetails';

const UserProfile = ({
  classes,
  user,
  user: {
    loading,
    auth: { authenticated },
    data: { credentials },
  },
}) => {
  console.log(user.data.credentials);
  let userProfileMarkup = !loading ? (
    authenticated ? (
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
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(UserProfile));
