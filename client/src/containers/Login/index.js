import React, { useState, useRef, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../modules/user';

import LoadingButton from '../../components/LoadingButton';
import Alert from '../../components/Dialog/Alert';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function Login(props) {
  const classes = useStyles();

  const loginForm = useRef(null);
  const [isIDError, setIsIDError] = useState(false);
  const [isPWDError, setIsPWDError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [open, setOpen] = useState({
    alert: false,
  });

  const handleLogin = async () => {
    const id = loginForm.current.id.value.trim();
    const password = loginForm.current.password.value;

    if (id.length === 0) {
      setIsIDError(true);
      return;
    }
    if (password.length === 0) {
      setIsPWDError(true);
      return;
    }

    setIsIDError(false);
    setIsPWDError(false);
    setIsAuthenticating(true);

    try {
      await props.UserActions.fetchLogin({ id, password });
    } catch (err) {
      setIsAuthenticating(false);
      setOpen({ alert: true });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  const handleOpen = (value) => {
    setOpen({ alert: value });
  };

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off" ref={loginForm}>
        <TextField
          name="id"
          label="ID"
          onKeyDown={handleKeyDown}
          error={isIDError}
          helperText={isIDError ? 'Check your ID' : ' '}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          onKeyDown={handleKeyDown}
          error={isPWDError}
          helperText={isPWDError ? 'Check your password' : ' '}
        />
        <LoadingButton
          onClick={handleLogin}
          text="Login"
          loading={isAuthenticating}
        />
      </form>
      <Alert
        open={open.alert}
        content="Fail to login. Check your account information."
        onClose={() => handleOpen(false)}
      />
    </Fragment>
  );
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Login);
