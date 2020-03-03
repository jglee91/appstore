import React, { Suspense, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../modules/user';
import PropTypes from 'prop-types';

// import withAuth from '../hoc/withAuth';
import AuthenticatedRoute from '../components/Route/AuthenticatedRoute';
import UnauthenticatedRoute from '../components/Route/UnauthenticatedRoute';

import Topbar from '../components/Topbar';
import Login from './Login';
import List from './List';
import Company from './Company';
import Application from './Application';
import Project from './Project';
import NotFound from './NotFound';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
}));

function App(props) {
  const { user, UserActions } = props;
  const { isAuth, isAdmin } = user;
  const classes = useStyles();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  
  useEffect(() => {
    (async function auth() {
      try {
        await UserActions.fetchAuth();
      } finally {
        setIsAuthenticating(false);
      }
    })();
  }, [UserActions]);

  return (
    !isAuthenticating && (
      <Suspense fallback={<div>잠시만 기다려주세요...</div>}>
        <CssBaseline />
        {isAuth && <Topbar isAdmin={isAdmin} />}
        <Container className={classes.root}>
          <Switch>
            <UnauthenticatedRoute exact path="/" component={Login} props={{ isAuth }} />
            <AuthenticatedRoute exact path="/list" component={List} props={{ isAuth }} />
            <AuthenticatedRoute exact path="/company" component={Company} props={{ isAuth }} />
            <AuthenticatedRoute exact path="/project" component={Project} props={{ isAuth }} />
            <AuthenticatedRoute exact path="/application" component={Application} props={{ isAuth }} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Suspense>
    )
  );
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(App);

App.propTypes = {
  isAuth: PropTypes.bool,
};

App.defaultProps = {
  isAuth: false,
};
