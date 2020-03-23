import * as React from "react";
import {
  Popover,
  Row,
  Col,
  Button,
  Divider,
  List,
  message,
  Empty,
  Spin,
  Icon,
  Menu,
  Dropdown
} from "antd";
import styled from "styled-components";
import moment from "moment";
import { compose } from "redux";
import { connect } from "react-redux";
import InfininiteScroll from "react-infinite-scroller";

import { Notification } from "../UI";
import getLang from "../../lib/getLang";

import action from "../../redux/notification/action";

const {
  setOpenedNotif,
  loadMoreNotif,
  markAllNotifAsRead,
  clearSuccess,
  clearError
} = action;

class NotificationCenter extends React.Component {
  state = {
    visibleNotification: false
  };

  componentDidUpdate = () => {
    const { success, error } = this.props.notification;
    const { clearSuccess, clearError } = this.props;

    if (success) {
      message.success(success);
      clearSuccess();
    }

    if (error) {
      message.error(error);
      clearError();
    }
  };

  handleNotification = () =>
    this.setState({ visibleNotification: !this.state.visibleNotification });

  render() {
    const { loadMoreNotif, markAllNotifAsRead } = this.props;
    const { notification_stack } = this.props.notification;
    const {
      loadingInit,
      loading,
      current_page,
      last_page,
      show_unread_only
    } = this.props.notification;
    const next_page = current_page + 1;

    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={() => markAllNotifAsRead()}>
          {getLang({ id: "markAllAsRead" })}
        </Menu.Item>
      </Menu>
    );

    const NotificationContent = (
      <NotificationWrapper>
        <Row type="flex" justify="space-between">
          <Col>
            <NotificationTitle>
              {getLang({ id: "notification" })}
            </NotificationTitle>
          </Col>
          <Col>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Action icon="more" size="small" />
            </Dropdown>
          </Col>
        </Row>
        <Divider style={{ margin: "12px 0" }} />
        <Row style={{ height: 300, overflowY: "scroll", paddingRight: 4 }}>
          {loadingInit ? (
            <NotificationSpinner position="center" />
          ) : (
            <InfininiteScroll
              initialLoad={false}
              pageStart={1}
              loadMore={() =>
                !loading && loadMoreNotif(next_page, show_unread_only)
              }
              hasMore={next_page <= last_page && !loading}
              useWindow={false}
            >
              <List
                itemLayout="vertical"
                dataSource={notification_stack}
                bordered={false}
                renderItem={(notification, index) => {
                  const { related_user, type } = notification;
                  const { username } = related_user ? related_user : {};
                  const { setOpenedNotif } = this.props;
                  let icon;

                  switch (type) {
                    // Temperature
                    case 1:
                      icon = (
                        <Icon
                          type="fire"
                          style={{ marginRight: 6, color: "#f5222d" }}
                        />
                      );
                      break;
                    // Profile Change
                    case 2:
                      icon = (
                        <Icon
                          type="idcard"
                          style={{ marginRight: 6, color: "#1890ff" }}
                        />
                      );
                      break;
                    // Password Change
                    case 3:
                      icon = (
                        <Icon
                          type="safety-certificate"
                          style={{ marginRight: 6, color: "#faad14" }}
                        />
                      );
                      break;
                    // Setting Change
                    case 4:
                      icon = (
                        <Icon
                          type="control"
                          style={{ marginRight: 6, color: "#52c41a" }}
                        />
                      );
                      break;
                    default:
                      break;
                  }

                  return (
                    <NotificationCard
                      title={
                        <>
                          {icon}
                          {getLang({ id: notification.title })}
                        </>
                      }
                      content={getLang({
                        id: notification.body,
                        values: { username: username }
                      })}
                      time={notification.created_at}
                      onClose={() => {
                        setOpenedNotif(index, notification);
                        if (
                          next_page <= last_page &&
                          notification_stack.length === 0
                        ) {
                          loadMoreNotif(next_page, show_unread_only);
                        }
                        return true;
                      }}
                    />
                  );
                }}
              >
                {loading && <NotificationSpinner position="bottom" />}
                {Array.isArray(notification_stack) &&
                  notification_stack.length === 0 && (
                    <Empty
                      description={
                        show_unread_only ? (
                          <span>{getLang({ id: "noUnreadNotification" })}</span>
                        ) : (
                          getLang({ id: "noNotification" })
                        )
                      }
                    />
                  )}
              </List>
            </InfininiteScroll>
          )}
        </Row>
      </NotificationWrapper>
    );

    return (
      <Popover
        placement="bottom"
        trigger="click"
        content={NotificationContent}
        visible={this.state.visibleNotification}
        onVisibleChange={this.handleNotification}
      >
        <Notification onClick={this.handleNotification} />
      </Popover>
    );
  }
}

const Action = styled(Button)`
  border: none;
  box-shadow: none;
`;

const Close = styled(Button)`
  border: none;
  box-shadow: none;
  height: 14px !important;
  width: 14px !important;
  background-color: transparent;
  font-size: 10px !important;

  :hover {
    background-color: transparent;
  }

  :active {
    background-color: transparent;
  }

  :focus {
    background-color: transparent;
  }
`;

const NotificationWrapper = styled.div`
  width: 350px;
  max-width: ${(85 / 100) * window.innerWidth}px;
`;
const NotificationTitle = styled.div`
  /* height: 64px; */
  font-weight: 600;
  font-size: 16px;
`;

const NotificationCard = (props = { title: "Info", content: "", time: "" }) => {
  const { title, content, time, onClose } = props;

  return (
    <div
      style={{
        marginBottom: 12
      }}
    >
      <div
        style={{
          padding: "12px 12px",
          background: "#f7f7f7",
          borderRadius: 6,
          border: 0
        }}
      >
        <Row type="flex" justify="space-between" style={{ paddingLeft: 4 }}>
          <Col>
            <strong style={{ marginRight: "6px" }}>{title}</strong>
            <strong style={{ marginRight: "6px" }}>•</strong>
            {time && (
              <span style={{ color: "#9e9e9e", fontSize: ".6em" }}>
                <span>{moment(time).fromNow()}</span>
              </span>
            )}
          </Col>

          <Col>
            <Close size="small" icon="close-circle" onClick={onClose} />
          </Col>
        </Row>
        {content && (
          <p
            style={{ marginTop: "5px", marginLeft: "3px", marginBottom: 0 }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
};

/**
 *
 * @param {Object} props
 * @param {"top" | "bottom" | "center"} props.position
 */
const NotificationSpinner = (props = { position: "top" }) => {
  const { position } = props;
  let config = { bottom: "40px" };

  switch (position) {
    case "top":
      config = { top: "40px" };
      break;
    case "bottom":
      config = { bottom: "40px" };
      break;
    case "center":
      config = { top: "50%" };
      break;
    default:
      break;
  }

  return (
    <div
      style={Object.assign(
        {},
        {
          position: "absolute",
          textAlign: "center",
          width: "100%"
        },
        config
      )}
    >
      <Spin />
    </div>
  );
};

const mapStateToProps = state => ({
  notification: state.notification
});

const mapDispatchToProps = {
  setOpenedNotif,
  loadMoreNotif,
  markAllNotifAsRead,
  clearSuccess,
  clearError
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  NotificationCenter
);
