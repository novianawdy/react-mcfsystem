import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import asyncComponent from "./lib/asyncComponent";
import { getLocal, getSession } from "./lib/helper";

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const bearer = getLocal("at") || getSession("at");
  return (
    <Route
      {...rest}
      render={props =>
        bearer ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const OpenRoute = ({ component: Component, ...rest }) => {
  const bearer = getLocal("at") || getSession("at");
  return (
    <Route
      {...rest}
      render={props =>
        !bearer ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

const Routes = ({ history }) => (
  <BrowserRouter>
    <Switch>
      <OpenRoute
        exact
        history={history}
        path="/"
        component={asyncComponent(() =>
          import("./containers/Pages/SignIn/SignIn")
        )}
      />

      {appRoutes.map((data, key) => (
        <RestrictedRoute
          key={key}
          exact
          history={history}
          path={data.path}
          component={data.component}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export const appRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
    breadcrumbs: [
      {
        path: "/dashboard",
        name: "dashboard"
      }
    ],
    component: asyncComponent(() => import("./containers/Dashboard/Dashboard"))
  },
  {
    path: "/logs",
    name: "log",
    component: asyncComponent(() => import("./containers/Log/Log"))
  },
  {
    path: "/settings",
    name: "setting",
    component: asyncComponent(() => import("./containers/Setting/Setting"))
  }
];

export default Routes;
