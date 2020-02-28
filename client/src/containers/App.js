import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import withAuth from '../hoc/withAuth';
import AuthenticatedRoute from '../components/Route/AuthenticatedRoute';
import UnauthenticatedRoute from '../components/Route/UnauthenticatedRoute';

import Login from './Login';
import List from './List';
import NotFound from './NotFound';

function App(props) {
  const { user } = props;

  return (
    <Suspense fallback={<div>잠시만 기다려주세요...</div>}>
      <CssBaseline />
      <Container>
        <Switch>
          <UnauthenticatedRoute exact path="/" component={Login} props={{ isAuth: user.isAuth }} />
          <AuthenticatedRoute exact path="/list" component={List} props={{ isAuth: user.isAuth }} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Suspense>
  );
}

export default connect(
  (state) => ({
    user: state.user,
  }),
)(App);

App.propTypes = {
  isAuth: PropTypes.bool,
};

App.defaultProps = {
  isAuth: false,
};
