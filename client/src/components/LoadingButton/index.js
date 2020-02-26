import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

export default function LoadingButton(props) {
  const { onClick, text} = props;

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<CircularProgress color="inherit" size={20} />}
      disabled={false}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
