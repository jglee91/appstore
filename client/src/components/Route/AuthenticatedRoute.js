/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: C, props: cProps, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      cProps.isAuth
        ? <C {...props} {...cProps} />
        : <Redirect to={`?redirect=${props.location.pathname}${props.location.search}`} />
    )}
  />
);
