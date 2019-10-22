import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './userProfile.styles';
import ProfileDetails from './ProfileDetails';
import NoProfileDetails from './NoProfileDetails';
import { getUserData, uploadImage } from '../../redux/user/user.actions';
import { decodeToken } from '../../utils/decodeToken';
import { logoutUser } from '../../redux/auth/auth.actions';

const UserProfile = ({
  classes,
  user: {
    loading,
    data: { credentials },
  },
  auth: { isAuthenticated, token },
  getUser,
  changeUserImage,
  loggedOutUser,
}) => {
  const { tokenExpired } = decodeToken(token);

  useEffect(() => {
    if (isAuthenticated && !tokenExpired) getUser();
  }, [getUser, isAuthenticated, tokenExpired]);

  const handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
      changeUserImage(formData);
    }
  };

  console.log('UserProfile->credentials', credentials);
  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated || tokenExpired)
    return <NoProfileDetails classes={classes} />;
  return (
    <ProfileDetails
      classes={classes}
      {...credentials}
      onImageChange={handleImageChange}
      onLogout={loggedOutUser}
    />
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  changeUserImage: PropTypes.func.isRequired,
  loggedOutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUserData()),
  changeUserImage: formData => dispatch(uploadImage(formData)),
  loggedOutUser: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserProfile));
