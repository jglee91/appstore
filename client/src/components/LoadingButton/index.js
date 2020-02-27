import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

export default function LoadingButton(props) {
  const { onClick, text, loading } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={loading && <CircularProgress color="inherit" size={20} />}
      disabled={loading}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
