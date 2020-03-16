import React, { Component } from "react";
import { Form, Modal, Button, Icon, Select, Input, Row, Col } from "antd";

import action from "../../redux/user/action";
import { compose } from "redux";
import { connect } from "react-redux";
import getLang from "../../lib/getLang";

const { getUserRequest } = action;
const { Option } = Select;

class FilterForm extends Component {
  state = {};

  componentDidMount = () => {
    const { filter } = this.props.user;
    const { setFieldsValue } = this.props.form;

    if (filter) {
      setFieldsValue(filter);
    }
  };

  componentDidUpdate = prevProps => {
    const { filter } = this.props.user;
    if (prevProps.user.filter !== filter && !filter) {
      this.props.form.resetFields();
    }
  };

  handleSubmit = () => {
    const { validateFields } = this.props.form;
    validateFields((error, values) => {
      if (!error) {
        this.handleFilter(values);
      }
    });
  };

  handleFilter = val => {
    const { getUserRequest, handleModal, resetLoadedRows } = this.props;

    getUserRequest(1, val);
    resetLoadedRows();
    handleModal();
  };

  render() {
    const { visible, handleModal } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={visible}
        title={getLang({ id: "filter" })}
        onCancel={handleModal}
        footer={
          <>
            <Button
              onClick={() => {
                const { getUserRequest, handleModal } = this.props;
                this.props.form.resetFields();
                handleModal();
                return getUserRequest(1, null);
              }}
            >
              {getLang({ id: "deleteFilter" })}
            </Button>
            <Button type="primary" onClick={this.handleSubmit}>
              <Icon type="filter" /> {getLang({ id: "filter" })}
            </Button>
          </>
        }
        centered
      >
        <Form layout="vertical">
          <Row type="flex">
            <Input.Group>
              <Col xs={8} sm={8} md={8} lg={7} xl={7}>
                <Form.Item label={getLang({ id: "searchBy" })}>
                  {getFieldDecorator("search_by", {
                    initialValue: null
                  })(
                    <Select style={{ width: "100%" }}>
                      <Option value={null}>{getLang({ id: "all" })}</Option>
                      <Option value="username">
                        {getLang({ id: "username" })}
                      </Option>
                      <Option value="name">{getLang({ id: "name" })}</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xs={16} sm={16} md={16} lg={17} xl={17}>
                <Form.Item label={getLang({ id: "search" })}>
                  {getFieldDecorator("search", {
                    initialValue: undefined
                  })(
                    <Input
                      suffix={<Icon type="search" />}
                      style={{ width: "100%" }}
                      placeholder={`${getLang({ id: "username" })}, ${getLang({
                        id: "name"
                      })}`}
                      allowClear
                    />
                  )}
                </Form.Item>
              </Col>
            </Input.Group>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const Filter = Form.create({ name: "user_filter_form" })(FilterForm);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  getUserRequest
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(Filter);
