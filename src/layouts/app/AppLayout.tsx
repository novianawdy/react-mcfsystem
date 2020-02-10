import * as React from "react";
import { Layout, Menu, PageHeader } from "antd";
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
  //   breadcrumbs: boolean;
  showPageHeader: boolean;
  pageHeader: React.ReactNode;
  renderPageHeader: React.ReactNode;
};

const AppLayout: React.SFC<AppLayoutProps> = ({
  title,
  description,
  children,
  location,
  //   breadcrumbs,
  showPageHeader,
  pageHeader,
  renderPageHeader
}) => {
  //   const currentRoute = appRoutes.find(
  //     appRoute => appRoute.path === location.pathname
  //   );

  //   const breadcrumb = breadcrumbs ? (
  //     <Breadcrumb style={{ margin: "16px 0px 0px 0px" }}>
  //       {currentRoute?.breadcrumbs.map((breadcrumb, key) => {
  //         if (
  //           (breadcrumb.path && breadcrumb.path === location.pathname) ||
  //           !breadcrumb.path
  //         ) {
  //           return (
  //             <Breadcrumb.Item key={key}>
  //               {getLang({ id: breadcrumb.name })}
  //             </Breadcrumb.Item>
  //           );
  //         } else {
  //           return (
  //             <Link to={breadcrumb.path} key={key}>
  //               <Breadcrumb.Item>
  //                 {getLang({ id: breadcrumb.name })}
  //               </Breadcrumb.Item>
  //             </Link>
  //           );
  //         }
  //       })}
  //     </Breadcrumb>
  //   ) : undefined

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description ? description : title} />
      </Helmet>

      <Layout className="layout">
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/dashboard"]}
            selectedKeys={[location.pathname]}
          >
            {appRoutes.map(data => {
              if (location.pathname === data.path) {
                return (
                  <Menu.Item key={data.path}>
                    {getLang({ id: data.name })}
                  </Menu.Item>
                );
              } else {
                return (
                  <Menu.Item key={data.path}>
                    <Link to={data.path}>{getLang({ id: data.name })}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Header>
        {showPageHeader ? (
          renderPageHeader ? (
            renderPageHeader
          ) : (
            <PageHeader title={pageHeader} ghost={false} />
          )
        ) : (
          undefined
        )}
        <Content style={{ padding: "0 30px" }}>
          <div style={{ background: "#fff", padding: 24, margin: "16px 0" }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>{setting.footer}</Footer>
      </Layout>
    </>
  );
};

export default AppLayout;
