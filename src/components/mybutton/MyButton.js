import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} className={tipClassName} placement='top'>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

MyButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
  tip: PropTypes.string,
  btnClassName: PropTypes.string,
  tipClassName: PropTypes.object,
};

export default MyButton;
