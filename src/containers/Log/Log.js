import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography, Divider, message } from "antd";

import action from "../../redux/log/action";
import { IconButton } from "../../components/UI";
import getLang from "../../lib/getLang";

import LogList from "./LogList";
import Filter from "./Filter";

const { Title } = Typography;
const { getLogRequest, clearSuccess, clearError } = action;

class Log extends Component {
  state = {
    visibleFilter: false
  };

  componentDidMount = () => {
    const { filter } = this.props.log;
    const { getLogRequest } = this.props;
    if (!filter) {
      getLogRequest(1, null);
    }
  };

  componentDidUpdate = () => {
    const { success, error } = this.props.log;
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

  loadedRowsMap = {};
  totalHeight = 0;

  setLoadedRows = i => {
    this.loadedRowsMap[i] = 1;
  };

  resetLoadedRows = () => {
    this.loadedRowsMap = {};
  };

  updateTotalHeight = totalHeight => {
    this.totalHeight = totalHeight;
  };

  handleFilterModal = () => {
    const { visibleFilter } = this.state;
    this.setState({ visibleFilter: !visibleFilter });
  };

  render() {
    const { visibleFilter } = this.state;
    const { total } = this.props.log;
    const { getLogRequest } = this.props;

    return (
      <>
        <Filter
          visible={visibleFilter}
          handleModal={this.handleFilterModal}
          resetLoadedRows={this.resetLoadedRows}
        />

        <Row
          type="flex"
          justify="space-between"
          style={{ padding: "16px 16px 0 16px", margin: "5px 0" }}
        >
          <Col
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Title level={4} style={{ marginBottom: 0 }}>
              {getLang({ id: "log" })}
            </Title>
            <Divider type="vertical" style={{ height: "100%" }} />
            <span>{getLang({ id: "log.subtitle", values: { total } })}</span>
          </Col>

          <Col>
            <IconButton
              icon="filter"
              style={{ marginLeft: 18 }}
              onClick={() => this.setState({ visibleFilter: true })}
              tooltip={{
                title: getLang({ id: "filter" }),
                placement: "bottom"
              }}
            />

            <IconButton
              icon="reload"
              style={{ marginLeft: 18 }}
              onClick={() => {
                getLogRequest(1, null);
                return this.resetLoadedRows();
              }}
              tooltip={{
                title: getLang({ id: "reload" }),
                placement: "bottomRight"
              }}
            />
          </Col>
        </Row>

        <Row style={{ padding: "0 16px 0 16px", margin: "5px 0" }}>
          <Col span={24}>
            <LogList
              loadedRowsMap={this.loadedRowsMap}
              setLoadedRows={this.setLoadedRows}
              totalHeight={this.state.totalHeight}
              updateTotalHeight={this.updateTotalHeight}
            />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  log: state.log
});

const mapDispatchToProps = {
  getLogRequest,
  clearSuccess,
  clearError
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Log);
