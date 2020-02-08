import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import asyncComponent from "./lib/asyncComponent";

const PublicRoutes = ({ history }) => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        history={history}
        path="/"
        component={asyncComponent(() =>
          import("./containers/Pages/SignIn/SignIn")
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default PublicRoutes;
