import React from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

import asyncComponent from "./lib/asyncComponent";
import { getLocal, getSession } from "./lib/helper";
import { Result, Button } from "antd";
import getLang from "./lib/getLang";

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
        !bearer ? <Component {...props} /> : <Redirect to="/app/dashboard" />
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

      {/* {appRoutes.map((data, key) => ( */}
      <RestrictedRoute
        history={history}
        path={"/app"}
        component={asyncComponent(() => import("./containers/App/App"))}
      />
      {/* ))} */}

      <Route
        path="*"
        render={props => (
          <Result
            status="404"
            title="404"
            subTitle={getLang({ id: "pageNotExist" })}
            extra={
              <Link to="/app/dashboard">
                <Button type="primary">{getLang({ id: "backHome" })}</Button>
              </Link>
            }
            style={{ padding: "48px 32px 0px 32px" }}
            {...props}
          />
        )}
      />
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
    path: "/users",
    name: "user",
    component: asyncComponent(() => import("./containers/User/User")),
    role: [1]
  },
  {
    path: "/settings",
    name: "setting",
    component: asyncComponent(() => import("./containers/Setting/Setting"))
  }
];

export default Routes;
