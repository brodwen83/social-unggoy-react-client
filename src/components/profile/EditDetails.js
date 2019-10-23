import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { edituserDetails } from '../../redux/user/user.actions';
import MyButton from '../mybutton/MyButton';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// MUI Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  ...theme.appStyles,
  button: {
    float: 'right',
  },
});

const EditDetails = ({ classes, user, updateUser }) => {
  const [details, setDetails] = useState({
    bio: '',
    website: '',
    location: '',
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const {
      data: { credentials },
    } = user;
    setDetails({
      bio: credentials.bio || '',
      website: credentials.website || '',
      location: credentials.location || '',
    });
    return () => {};
  }, [user]);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    console.log('details', details);
    updateUser({ ...details });
  };

  return (
    <div>
      <MyButton tip='Edit details' onClick={handleOpenDialog}>
        <EditIcon color='primary' />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='form-dialog-title'
        maxWidth='sm'
      >
        <DialogTitle id='form-dialog-title'>Update User Details</DialogTitle>
        <DialogContent>
          <form>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='bio'
              name='bio'
              label='Bio'
              type='text'
              fullWidth
              value={details.bio}
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              onChange={handleInputChange}
            />
            <TextField
              autoFocus
              margin='dense'
              id='website'
              name='website'
              label='Website'
              type='text'
              fullWidth
              value={details.website}
              placeholder='Link to your site'
              className={classes.textField}
              onChange={handleInputChange}
            />
            <TextField
              autoFocus
              margin='dense'
              id='location'
              name='location'
              label='Location'
              type='text'
              fullWidth
              value={details.location}
              placeholder='your current location'
              className={classes.textField}
              onChange={handleInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateUser: newUserDetails => dispatch(edituserDetails(newUserDetails)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(EditDetails));
