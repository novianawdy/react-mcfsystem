import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col, Typography, Divider, message } from "antd";

import action from "../../redux/user/action";
import { IconButton } from "../../components/UI";
import getLang from "../../lib/getLang";

import UserList from "./UserList";
import Filter from "./Filter";
import ModalUpdate from "./ModalUpdate";
import ModalChangePassword from "./ModalChangePassword";

const { Title } = Typography;
const { getUserRequest, clearSuccess, clearError } = action;

class User extends Component {
  state = {
    visibleFilter: false,
    visibleUpdate: false,
    visibleChangePassword: false
  };

  componentDidMount = () => {
    const { filter } = this.props.user;
    const { getUserRequest } = this.props;
    if (!filter) {
      getUserRequest(1, null);
    }
  };

  componentDidUpdate = () => {
    const { success, error } = this.props.user;
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
  selectedData = {};

  setLoadedRows = i => {
    this.loadedRowsMap[i] = 1;
  };

  resetLoadedRows = () => {
    this.loadedRowsMap = {};
  };

  updateTotalHeight = totalHeight => {
    this.totalHeight = totalHeight;
  };

  setSelectedData = data => {
    this.selectedData = data;
  };

  handleFilterModal = () => {
    const { visibleFilter } = this.state;
    this.setState({ visibleFilter: !visibleFilter });
  };

  handleUpdateModal = () => {
    const { visibleUpdate } = this.state;
    this.setState({ visibleUpdate: !visibleUpdate });
  };

  handleChangePasswordModal = () => {
    const { visibleChangePassword } = this.state;
    this.setState({ visibleChangePassword: !visibleChangePassword });
  };

  render() {
    const { visibleFilter, visibleUpdate, visibleChangePassword } = this.state;
    const { total } = this.props.user;
    const { getUserRequest } = this.props;

    return (
      <>
        <Filter
          visible={visibleFilter}
          handleModal={this.handleFilterModal}
          resetLoadedRows={this.resetLoadedRows}
        />

        <ModalUpdate
          visible={visibleUpdate}
          handleModal={this.handleUpdateModal}
          selectedData={this.selectedData}
        />

        <ModalChangePassword
          visible={visibleChangePassword}
          handleModal={this.handleChangePasswordModal}
          selectedData={this.selectedData}
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
              {getLang({ id: "user" })}
            </Title>
            <Divider type="vertical" style={{ height: "100%" }} />
            <span>{getLang({ id: "user.subtitle", values: { total } })}</span>
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
                getUserRequest(1, null);
                return this.resetLoadedRows();
              }}
              tooltip={{
                title: getLang({ id: "reload" }),
                placement: "bottomRight"
              }}
            />

            <IconButton
              icon="plus"
              style={{ marginLeft: 18 }}
              onClick={() => this.setState({ visibleRegister: true })}
              tooltip={{
                title: getLang({ id: "registerNewUser" }),
                placement: "bottomRight"
              }}
            />
          </Col>
        </Row>

        <Row style={{ padding: "0 16px 0 16px", margin: "5px 0" }}>
          <Col span={24}>
            <UserList
              loadedRowsMap={this.loadedRowsMap}
              setLoadedRows={this.setLoadedRows}
              totalHeight={this.state.totalHeight}
              updateTotalHeight={this.updateTotalHeight}
              setSelectedData={this.setSelectedData}
              handleUpdateModal={this.handleUpdateModal}
              handleChangePasswordModal={this.handleChangePasswordModal}
            />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

const mapDispatchToProps = {
  getUserRequest,
  clearSuccess,
  clearError
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(User);
