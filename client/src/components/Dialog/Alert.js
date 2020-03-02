import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Alert(props) {
  const {
    open: initOpen,
    title,
    content,
    buttonText,
    onClose,
  } = props;

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(initOpen);
  }, [initOpen]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <Button onClick={onClose} color="primary">
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
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  title: 'Alert',
  content: '',
  buttonText: 'OK',
  onClose: () => {},
};
