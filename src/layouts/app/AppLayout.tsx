import * as React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import Helmet from "react-helmet";
import "./AppLayout.css";
import { appRoutes } from "../../router";
import getLang from "../../lib/getLang";
import { Link } from "react-router-dom";
import setting from "../../settings/setting";

const { Header, Content, Footer } = Layout;

type LocationProps = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: object;
};
type AppLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  location: LocationProps;
};

const AppLayout: React.SFC<AppLayoutProps> = ({
  title,
  description,
  children,
  location
}) => {
  const currentRoute = appRoutes.find(
    appRoute => appRoute.path === location.pathname
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description ? description : title} />
      </Helmet>

      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/dashboard"]}
            selectedKeys={[location.pathname]}
            style={{ lineHeight: "64px" }}
          >
            {appRoutes.map(data => (
              <Menu.Item key={data.path}>
                {getLang({ id: data.name })}
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content style={{ padding: "0 30px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {currentRoute?.breadcrumbs.map((breadcrumb, key) => {
              if (
                (breadcrumb.path && breadcrumb.path === location.pathname) ||
                !breadcrumb.path
              ) {
                return (
                  <Breadcrumb.Item key={key}>
                    {getLang({ id: breadcrumb.name })}
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Link to={breadcrumb.path} key={key}>
                    <Breadcrumb.Item>
                      {getLang({ id: breadcrumb.name })}
                    </Breadcrumb.Item>
                  </Link>
                );
              }
            })}
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>{setting.footer}</Footer>
      </Layout>
    </>
  );
};

export default AppLayout;
