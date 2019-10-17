import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Scream = ({ classes, scream }) => (
  <Card className={classes.card}>
    <CardMedia
      className={classes.image}
      image={scream.userImage}
      title='Profile image'
    />
    <CardContent className={classes.content}>
      <Typography
        variant='h5'
        component={Link}
        to={`/users/${scream.userHandle}`}
        color='primary'
      >
        {scream.userHandle}
      </Typography>
      <Typography variant='body2' color='textSecondary'>
        {scream.createdAt}
      </Typography>
      <Typography variant='body1' color='textSecondary'>
        {scream.body}
      </Typography>
    </CardContent>
  </Card>
);

Scream.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  scream: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Scream);
