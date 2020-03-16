import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  List,
  Row,
  Col,
  Spin,
  Card,
  Typography,
  Divider,
  Button,
  Menu,
  Icon,
  Dropdown
} from "antd";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

import action from "../../redux/user/action";
import getLang from "../../lib/getLang";
import "./UserList.css";

const { Text } = Typography;
const { getUserRequest, clearError } = action;

class UserList extends Component {
  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    const { current_page, last_page, filter } = this.props.user;
    const { getUserRequest, setLoadedRows } = this.props;
    const next_page = current_page + 1;

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      setLoadedRows(i);
    }

    if (current_page === last_page) {
      return;
    }
    getUserRequest(next_page, filter);
  };

  isRowLoaded = ({ index }) => !!this.props.loadedRowsMap[index];

  rowHeight = 60;

  renderItem = ({ index, key, style }) => {
    const { users } = this.props.user;
    const {
      setSelectedData,
      handleUpdateModal,
      handleChangePasswordModal
    } = this.props;
    const item = users[index];

    const menu = (
      <Menu>
        <Menu.Item
          onClick={() => {
            setSelectedData(item);
            return handleUpdateModal();
          }}
        >
          <Icon type="edit" />
          {getLang({ id: "edit" })}
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setSelectedData(item);
            return handleChangePasswordModal();
          }}
        >
          <Icon type="lock" />
          {getLang({ id: "changePassword" })}
        </Menu.Item>
      </Menu>
    );

    return (
      <List.Item key={key} style={style}>
        <Row
          type="flex"
          justify="space-between"
          style={{ width: "100%", padding: "0 12px", alignItems: "center" }}
        >
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={7}
            xl={7}
            style={{
              display: "block",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
            title={item.username}
          >
            <Text>{item.username}</Text>
          </Col>

          <Col
            xs={9}
            sm={9}
            md={9}
            lg={7}
            xl={7}
            style={{
              display: "block",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
            title={item.name}
          >
            <Text>{item.name}</Text>
          </Col>

          <Col
            xs={6}
            sm={6}
            md={6}
            lg={2}
            xl={2}
            style={{
              display: "block",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            {item && (
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button shape="circle" icon="more" />
              </Dropdown>
            )}
          </Col>
        </Row>
      </List.Item>
    );
  };

  render() {
    const { users, loading } = this.props.user;

    const vlist = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered,
      width
    }) => {
      let totalHeight = height - 285 < 200 ? height : height - 285;
      if (totalHeight !== this.props.totalHeight && totalHeight) {
        this.props.updateTotalHeight(totalHeight);
      }

      return (
        <VList
          height={height - 285 < 200 ? height : height - 285}
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          overscanRowCount={2}
          rowCount={users.length}
          rowHeight={this.rowHeight}
          rowRenderer={this.renderItem}
          onRowsRendered={onRowsRendered}
          width={width}
        />
      );
    };

    const autoSize = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop,
      onRowsRendered
    }) => (
      <AutoSizer disableHeight>
        {({ width }) =>
          vlist({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered,
            width
          })
        }
      </AutoSizer>
    );

    const infiniteLoader = ({
      height,
      isScrolling,
      onChildScroll,
      scrollTop
    }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={users.length}
      >
        {({ onRowsRendered }) =>
          autoSize({
            height,
            isScrolling,
            onChildScroll,
            scrollTop,
            onRowsRendered
          })
        }
      </InfiniteLoader>
    );

    const overload = users.length * this.rowHeight > this.props.totalHeight;

    return (
      <Card bodyStyle={{ padding: 0 }}>
        <List style={{ height: 50, paddingRight: overload ? 8 : 0 }}>
          <List.Item style={{ padding: 0, height: 50 }}>
            <Row
              type="flex"
              justify="space-between"
              style={{ width: "100%", padding: "0 12px" }}
            >
              <Col
                xs={9}
                sm={9}
                md={9}
                lg={7}
                xl={7}
                style={{
                  display: "block",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}
                title={getLang({ id: "username" })}
              >
                <strong>{getLang({ id: "username" })}</strong>
              </Col>

              <Col
                xs={9}
                sm={9}
                md={9}
                lg={7}
                xl={7}
                style={{
                  display: "block",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}
                title={getLang({ id: "name" })}
              >
                <strong>{getLang({ id: "name" })}</strong>
              </Col>

              <Col
                xs={6}
                sm={6}
                md={6}
                lg={2}
                xl={2}
                style={{
                  display: "block",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}
                title={getLang({ id: "action" })}
              >
                <strong>{getLang({ id: "action" })}</strong>
              </Col>
            </Row>
          </List.Item>
        </List>
        <Divider style={{ margin: 0 }} />
        <List>
          {users.length > 0 && (
            <WindowScroller>{infiniteLoader}</WindowScroller>
          )}
        </List>
        {loading && (
          <Spin
            style={{
              width: "100%",
              zIndex: 10,
              position: "absolute",
              bottom: "80px"
            }}
          />
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

const mapDispatchToProps = {
  getUserRequest,
  clearError
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(UserList);
