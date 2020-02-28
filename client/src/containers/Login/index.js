import React, { useState, useRef, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../modules/user';

import LoadingButton from '../../components/LoadingButton';
import Alert from '../../components/Alert';

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
  const [openAlert, setOpenAlert] = useState(false);

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
      setOpenAlert(true);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off" ref={loginForm}>
        <TextField
          name="id"
          label="ID"
          onKeyDown={handleKeyDown}
          error={isIDError}
          placeholder="아이디를 입력해주세요."
          helperText={isIDError ? '아이디를 확인해주세요.' : ' '}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          onKeyDown={handleKeyDown}
          error={isPWDError}
          placeholder="비밀번호를 입력해주세요."
          helperText={isPWDError ? '비밀번호를 확인해주세요.' : ' '}
        />
        <LoadingButton
          onClick={handleLogin}
          text="로그인"
          loading={isAuthenticating}
        />
      </form>
      {openAlert && <Alert content="로그인에 실패했습니다. 계정정보를 확인해주세요." handleClose={handleAlertClose} />}
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
