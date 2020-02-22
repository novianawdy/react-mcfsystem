import * as React from "react";
import { Layout, Menu, PageHeader, Col, Row, Button, Drawer } from "antd";
import Helmet from "react-helmet";
import "./AppLayout.css";
import { appRoutes } from "../../router";
import getLang from "../../lib/getLang";
import { Link } from "react-router-dom";
import setting from "../../settings/setting";
import SelectLang from "../../components/SelectLang";
import { UserProfile, UserTitle, Notification } from "../../components/UI";
// import { LogoText } from "../../components/UI";

import action from "../../redux/auth/action";
import { compose } from "redux";
import { connect } from "react-redux";
import themes from "../../settings/themes/themes";

const { Header, Content, Footer } = Layout;
const { changeLanguage, logoutRequest } = action;

type LocationProps = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: object;
};
export interface AuthInterface {
  user: {
    username: string;
  };
  language: string;
  bearer: string;
}
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
  logoutRequest?: () => void;
  auth: AuthInterface;
};

class AppLayout extends React.Component<AppLayoutProps> {
  state = {
    visibleDrawerMenu: false,
    visibleDrawerUser: false
  };

  handleDrawerMenu = () =>
    this.setState({ visibleDrawerMenu: !this.state.visibleDrawerMenu });

  handleDrawerUser = () =>
    this.setState({ visibleDrawerUser: !this.state.visibleDrawerUser });

  render() {
    const {
      title,
      description,
      children,
      location,
      //   breadcrumbs,
      showPageHeader,
      pageHeader,
      renderPageHeader,
      changeLanguage,
      logoutRequest,
      auth
    } = this.props;
    const { user } = auth;
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
          <meta
            name="description"
            content={description ? description : title}
          />
        </Helmet>

        <Layout className="layout">
          <Header className="header">
            {/* <div className="logo" /> */}
            {/* <LogoText style={{ float: "left" }}>MCFSystem</LogoText> */}
            <Row type="flex" style={{ height: "100%" }}>
              <Col xs={0} sm={0} md={12} lg={12} xl={12}>
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
              <Col xs={8} sm={8} md={0} lg={0} xl={0}>
                <div className="menu-container-left">
                  <Button
                    icon="menu-unfold"
                    style={{
                      margin: "auto 10px auto 0px",
                      color: "#fff",
                      backgroundColor: themes.themedefault.palette.secondary[1],
                      borderColor: themes.themedefault.palette.secondary[1]
                    }}
                    size="large"
                    onClick={this.handleDrawerMenu}
                  />
                  <Drawer
                    title={setting.appName}
                    visible={this.state.visibleDrawerMenu}
                    onClose={this.handleDrawerMenu}
                    placement="left"
                  >
                    <Menu
                      mode="vertical"
                      defaultSelectedKeys={["/dashboard"]}
                      selectedKeys={[location.pathname]}
                      style={{ border: "none" }}
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
                  </Drawer>
                </div>
              </Col>
              <Col
                xs={16}
                sm={16}
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
                <UserProfile
                  username={user.username}
                  avatar={user.username ? user.username.charAt(0) : ""}
                  onClick={this.handleDrawerUser}
                />
                <Drawer
                  title={
                    <UserTitle
                      username={user.username}
                      avatar={user.username ? user.username.charAt(0) : ""}
                      role="Admin"
                    />
                  }
                  visible={this.state.visibleDrawerUser}
                  onClose={this.handleDrawerUser}
                  placement="right"
                >
                  <Menu
                    mode="vertical"
                    defaultSelectedKeys={["/dashboard"]}
                    selectedKeys={[location.pathname]}
                    style={{ border: "none" }}
                  >
                    <Menu.Item style={{ lineHeight: "20px", height: 20 }}>
                      {getLang({ id: "setting" })}
                    </Menu.Item>
                    <Menu.Item style={{ lineHeight: "20px", height: 20 }}>
                      {getLang({ id: "profile" })}
                    </Menu.Item>
                    <Menu.Divider style={{ marginTop: 15 }} />
                    <Menu.Item onClick={logoutRequest}>
                      {getLang({ id: "logout" })}
                    </Menu.Item>
                  </Menu>
                </Drawer>
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
  }
}

const mapDispatchToProps = {
  changeLanguage,
  logoutRequest
};

export default compose(connect(null, mapDispatchToProps))(AppLayout);
