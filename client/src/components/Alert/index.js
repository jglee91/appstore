import React, { useState, useEffect } from 'react';
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
    open: initOpen,
    title,
    content,
    buttonText,
    onClick,
  } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(initOpen);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(false);
    onClick();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-decription"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-decription">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Alert.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

Alert.defaultProps = {
  open: false,
  title: '알림',
  content: '',
  buttonText: '확인',
  onClick: () => {},
};
