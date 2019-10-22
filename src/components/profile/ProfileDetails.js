import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI stuff
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const ProfileDetails = ({
  classes,
  imageUrl,
  handle,
  bio,
  location,
  website,
  createdAt,
}) => (
  <Paper className={classes.paper}>
    <div className={classes.profile}>
      <div className='image-wrapper'>
        <img className='profile-image' src={imageUrl} alt='profile' />
      </div>
      <hr />
      <div className='profile-details'>
        <MuiLink
          component={Link}
          to={`/users/${handle}`}
          color='primary'
          variant='h5'
        >
          @{handle}
        </MuiLink>
        <hr />
        {bio && <Typography variant='body2'>{bio}</Typography>}
        <hr />
        {location && (
          <React.Fragment>
            <LocationOn color='primary' /> <span>{location}</span>
            <hr />
          </React.Fragment>
        )}
        {website && (
          <React.Fragment>
            <LinkIcon color='primary' />
            <a href={website} target='_blank' rel='noopener noreferrer'>
              {' '}
              {website}
            </a>
            <hr />
          </React.Fragment>
        )}
        {createdAt && (
          <React.Fragment>
            <CalendarToday color='primary' />
            <small>Joined {dayjs(createdAt).format('MMM YYYY')}</small>
          </React.Fragment>
        )}
      </div>
    </div>
  </Paper>
);

ProfileDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  imageUrl: PropTypes.string,
  handle: PropTypes.string,
  bio: PropTypes.string,
  location: PropTypes.string,
  website: PropTypes.string,
  createdAt: PropTypes.string,
};

export default ProfileDetails;
