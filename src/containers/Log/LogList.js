import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { List, Row, Col, Tag, Spin, Card, Typography, Divider } from "antd";
import Number from "antd/lib/statistic/Number";
import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

import action from "../../redux/log/action";
import { Anomali } from "../../components/UI";
import getLang from "../../lib/getLang";

import "./LogList.css";

const { Text } = Typography;
const { getLogRequest, clearError } = action;

class LogList extends Component {
  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    const { current_page, last_page, filter } = this.props.log;
    const { getLogRequest, setLoadedRows } = this.props;
    const next_page = current_page + 1;

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      setLoadedRows(i);
    }

    if (current_page === last_page) {
      return;
    }
    getLogRequest(next_page, filter);
  };

  isRowLoaded = ({ index }) => !!this.props.loadedRowsMap[index];

  rowHeight = 50;

  renderItem = ({ index, key, style }) => {
    const { logs } = this.props.log;
    const item = logs[index];
    const prevItem = index === logs.length - 1 ? {} : logs[index + 1];
    return (
      <List.Item key={key} style={style}>
        <Row
          type="flex"
          justify="space-between"
          style={{ width: "100%", padding: "0 12px" }}
        >
          <Col xs={0} sm={8} md={8} lg={8} xl={8}>
            {item && <Text>{item.created_at}</Text>}
          </Col>

          <Col
            xs={10}
            sm={6}
            md={6}
            lg={7}
            xl={7}
            style={{
              display: "block",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            <Text>
              <Number
                value={item ? item.flow : 0}
                precision={2}
                decimalSeparator=","
                groupSeparator="."
              />{" "}
              mL/s <Anomali value={item.flow} prevValue={prevItem.flow} />
            </Text>
          </Col>

          <Col
            xs={10}
            sm={6}
            md={6}
            lg={7}
            xl={7}
            style={{
              display: "block",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            <Text>
              <Number
                value={item ? item.temperature : 0}
                precision={2}
                decimalSeparator=","
                groupSeparator="."
              />{" "}
              °C{" "}
              <Anomali
                value={item.temperature}
                prevValue={prevItem.temperature}
              />
            </Text>
          </Col>

          <Col
            xs={4}
            sm={4}
            md={4}
            lg={2}
            xl={2}
            style={{
              display: "block",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            {item && (
              <Tag color={item.solenoid ? "blue" : "red"}>
                {item.solenoid ? "On" : "Off"}
              </Tag>
            )}
          </Col>
        </Row>
      </List.Item>
    );
  };
  render() {
    const { logs, loading } = this.props.log;

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
          rowCount={logs.length}
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
        rowCount={logs.length}
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

    const overload = logs.length * this.rowHeight > this.props.totalHeight;
    console.log(overload, logs.length * this.rowHeight, this.props.totalHeight);
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
                xs={0}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                title={getLang({ id: "date" })}
              >
                <strong>{getLang({ id: "date" })}</strong>
              </Col>

              <Col
                xs={10}
                sm={6}
                md={6}
                lg={7}
                xl={7}
                style={{
                  display: "block",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}
                title={getLang({ id: "flow" })}
              >
                <strong>{getLang({ id: "flow" })}</strong>
              </Col>

              <Col
                xs={10}
                sm={6}
                md={6}
                lg={7}
                xl={7}
                style={{
                  display: "block",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}
                title={getLang({ id: "temperature" })}
              >
                <strong>{getLang({ id: "temperature" })}</strong>
              </Col>

              <Col
                xs={4}
                sm={4}
                md={4}
                lg={2}
                xl={2}
                style={{
                  display: "block",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}
                title={getLang({ id: "solenoid" })}
              >
                <strong>{getLang({ id: "solenoid" })}</strong>
              </Col>
            </Row>
          </List.Item>
        </List>
        <Divider style={{ margin: 0 }} />
        <List>
          {logs.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
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
  log: state.log
});

const mapDispatchToProps = {
  getLogRequest,
  clearError
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(LogList);
