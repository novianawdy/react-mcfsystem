import * as React from "react";
import {
  Layout,
  Menu,
  PageHeader,
  Col,
  Row,
  Button,
  Drawer,
  Popover
} from "antd";
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
import styled from "styled-components";

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
    id: number;
    name: string;
    username: string;
    role: number;
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
  onClickMenu?: (pathname: string) => void;
  auth: AuthInterface;
};

class AppLayout extends React.Component<AppLayoutProps> {
  state = {
    visibleDrawerMenu: false,
    visibleDrawerUser: false,
    visibleNotification: false,
    activeMenu: this.props.location.pathname
  };

  handleDrawerMenu = () =>
    this.setState({ visibleDrawerMenu: !this.state.visibleDrawerMenu });

  handleDrawerUser = () =>
    this.setState({ visibleDrawerUser: !this.state.visibleDrawerUser });

  handleNotification = () =>
    this.setState({ visibleNotification: !this.state.visibleNotification });

  render() {
    const {
      title,
      description,
      children,
      onClickMenu,
      // location,
      // breadcrumbs,
      showPageHeader,
      pageHeader,
      renderPageHeader,
      changeLanguage,
      logoutRequest,
      auth
    } = this.props;
    const { activeMenu } = this.state;
    const { user } = auth;
    let role = "Admin";

    switch (user.role) {
      case 1:
        role = "Super Admin";
        break;
      case 2:
        role = "Admin";
        break;
      case 3:
        role = "IOT";
        break;
      default:
        role = "Admin";
        break;
    }

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
                    defaultSelectedKeys={["/app/dashboard"]}
                    selectedKeys={[activeMenu]}
                  >
                    {appRoutes.map(data => {
                      if (activeMenu === `/app${data.path}`) {
                        return (
                          <Menu.Item key={`/app${data.path}`}>
                            {getLang({ id: data.name })}
                          </Menu.Item>
                        );
                      } else {
                        return (
                          <Menu.Item
                            key={`/app${data.path}`}
                            onClick={() => {
                              if (onClickMenu) {
                                onClickMenu(`/app${data.path}`);
                              }
                              this.setState({ activeMenu: `/app${data.path}` });
                            }}
                          >
                            <Link to={`/app${data.path}`}>
                              {getLang({ id: data.name })}
                            </Link>
                          </Menu.Item>
                        );
                      }
                    })}
                  </Menu>
                </div>
              </Col>
              <Col xs={4} sm={4} md={0} lg={0} xl={0}>
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
                      selectedKeys={[activeMenu]}
                      style={{ border: "none" }}
                    >
                      {appRoutes.map(data => {
                        if (activeMenu === `/app${data.path}`) {
                          return (
                            <Menu.Item key={`/app${data.path}`}>
                              {getLang({ id: data.name })}
                            </Menu.Item>
                          );
                        } else {
                          return (
                            <Menu.Item
                              key={`/app${data.path}`}
                              onClick={() => {
                                if (onClickMenu) {
                                  onClickMenu(`/app${data.path}`);
                                }
                                this.setState({
                                  activeMenu: `/app${data.path}`
                                });
                              }}
                            >
                              <Link to={`/app${data.path}`}>
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
                xs={20}
                sm={20}
                md={12}
                lg={12}
                xl={12}
                className="menu-container-right"
              >
                <Popover
                  placement="bottom"
                  trigger="click"
                  content={NotificationContent}
                  visible={this.state.visibleNotification}
                  onVisibleChange={this.handleNotification}
                >
                  <Notification onClick={this.handleNotification} />
                </Popover>
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
                      role={role}
                    />
                  }
                  visible={this.state.visibleDrawerUser}
                  onClose={this.handleDrawerUser}
                  placement="right"
                >
                  <SelectLang
                    onClick={param =>
                      changeLanguage ? changeLanguage(param.key) : param
                    }
                    mode="button"
                  />
                  <Menu
                    mode="vertical"
                    defaultSelectedKeys={["/dashboard"]}
                    selectedKeys={[activeMenu]}
                    style={{ border: "none" }}
                  >
                    <Menu.Divider style={{ marginTop: 20 }} />
                    <Menu.Item onClick={logoutRequest} style={{ padding: 0 }}>
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

const NotificationWrapper = styled.div`
  width: 350px;
  max-width: ${(70 / 100) * window.innerWidth}px;
`;
const NotificationTitle = styled.div`
  height: 64px;
`;

const NotificationContent = (
  <NotificationWrapper>
    <NotificationTitle>Notification</NotificationTitle>
  </NotificationWrapper>
);

export default compose(connect(null, mapDispatchToProps))(AppLayout);
