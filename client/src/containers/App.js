import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';

import Login from './Login';
import NotFound from './NotFound';

export default function App() {
  return (
    <Suspense fallback={<div>잠시만 기다려주세요...</div>}>
      <CssBaseline />
      <Container>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Suspense>
  );
}
