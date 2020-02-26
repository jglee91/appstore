import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../modules/user';

import LoadingButton from '../../components/LoadingButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function Login(props) {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    const response = await props.UserActions.asyncLoginUser(userInfo);
    console.log(response);
    // props.dispatch(login(userInfo));
  };

  return (
    <form className={classes.root} autoComplete="off">
      <TextField
        name="id"
        label="ID"
        value={userInfo.id}
        onChange={handleChange}
        error={false}
        placeholder="아이디를 입력해주세요."
        helperText="아이디를 확인해주세요."
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        value={userInfo.password}
        onChange={handleChange}
        error={false}
        placeholder="비밀번호를 입력해주세요."
        helperText="비밀번호를 확인해주세요."
      />
      <LoadingButton onClick={handleLogin} text="로그인" />
    </form>
  );
}

export default withRouter(connect(
  (state) => ({
    user: state.user
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(Login));
