/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function queryString(key, url = window.location.href) {
  const name = key.replace(/[[]]/g, '\\$&');
  const regExp = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`, 'i');
  const results = regExp.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = queryString('redirect');
  return (
    <Route
      {...rest}
      render={(props) => (
        !cProps.isAuth
          ? <C {...props} {...cProps} />
          : <Redirect to={redirect === '' || redirect === null ? '/list' : redirect} />
      )}
    />
  );
};
