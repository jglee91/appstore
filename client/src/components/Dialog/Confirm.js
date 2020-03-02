import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Confirm(props) {
  const {
    open: initOpen,
    title,
    content,
    positiveButtonText,
    onPositive,
    negativeButtonText,
    onNegative,
  } = props;

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(initOpen);
  }, [initOpen]);

  return (
    <Dialog
      open={open}
      onClose={onNegative}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNegative} color="primary" variant="outlined">
          {negativeButtonText}
        </Button>
        <Button onClick={onPositive} color="primary" variant="contained">
          {positiveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Confirm.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  positiveButtonText: PropTypes.string,
  onPositive: PropTypes.func,
  negativeButtonText: PropTypes.string,
  onNegative: PropTypes.func,
};

Confirm.defaultProps = {
  title: 'Confirm',
  content: '',
  positiveButtonText: 'Confirm',
  onPositive: () => {},
  negativeButtonText: 'Cancel',
  onNegative: () => {},
};
