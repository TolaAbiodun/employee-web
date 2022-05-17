import React from 'react';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { LOGIN_URL, HOME_URL } from 'config/urls';

import { Login, Home } from 'pages';
import Edit from 'pages/EditEmployee';

export const history = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={LOGIN_URL} component={Login} />
        <Route exact path={HOME_URL} component={Home} />
        <Route exact path="/employee/edit/:id" component={Edit} />
        {/* <Route path="*">
          <Redirect to={HOME_URL} />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default Routes;
