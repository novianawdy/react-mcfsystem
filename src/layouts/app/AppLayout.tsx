import * as React from "react";
import { Layout, Menu, PageHeader, Col, Row } from "antd";
import Helmet from "react-helmet";
import "./AppLayout.css";
import { appRoutes } from "../../router";
import getLang from "../../lib/getLang";
import { Link } from "react-router-dom";
import setting from "../../settings/setting";
import SelectLang from "../../components/SelectLang";
import { UserProfile, Notification } from "../../components/UI";
// import { LogoText } from "../../components/UI";

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
  changeLanguage?: (languageId: string) => void;
};

const AppLayout: React.SFC<AppLayoutProps> = ({
  title,
  description,
  children,
  location,
  //   breadcrumbs,
  showPageHeader,
  pageHeader,
  renderPageHeader,
  changeLanguage
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
          {/* <div className="logo" /> */}
          {/* <LogoText style={{ float: "left" }}>MCFSystem</LogoText> */}
          <Row type="flex" style={{ height: "100%" }}>
            <Col xs={0} sm={0} md={0} lg={0} xl={12}>
              <div className="menu-container-left">
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
                          <Link to={data.path}>
                            {getLang({ id: data.name })}
                          </Link>
                        </Menu.Item>
                      );
                    }
                  })}
                </Menu>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              className="menu-container-right"
            >
              <Notification />
              <SelectLang
                onClick={param =>
                  changeLanguage ? changeLanguage(param.key) : param
                }
                mode="app"
              />
              <UserProfile />
            </Col>
          </Row>
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
        <Content style={{ padding: "16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>{setting.footer}</Footer>
      </Layout>
    </>
  );
};

export default AppLayout;
