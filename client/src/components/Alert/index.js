import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Alert(props) {
  const {
    title,
    content,
    buttonText,
    handleClose,
  } = props;

  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Alert.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  handleClose: PropTypes.func,
};

Alert.defaultProps = {
  title: '알림',
  content: '',
  buttonText: '확인',
  handleClose: () => {},
};
