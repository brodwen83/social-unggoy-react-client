import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Scream from '../../components/screams/Scream';
import { logoutUser } from '../../redux/user/user.actions';
import { UserProfile } from '../../components/profile';

const fetchScreams = async setScreams => {
  try {
    const screams = await axios.get('/screams');
    setScreams(screams.data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Home = ({ logout }) => {
  const [screams, setScreams] = useState(null);

  useEffect(() => {
    fetchScreams(setScreams);
  }, []);

  const recentScreamsMarkup = screams ? (
    screams.map(scream => <Scream scream={scream} key={scream.screamId} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <UserProfile />
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = () => dispatch => ({
  logout: () => dispatch(logoutUser()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Home);
