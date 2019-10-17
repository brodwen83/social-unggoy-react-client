import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Scream } from '../components/screams';

const fetchScreams = async setScreams => {
  try {
    const screams = await axios.get('/screams');
    setScreams(screams.data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Home = () => {
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
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;
