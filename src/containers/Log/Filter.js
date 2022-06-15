import React, { Component } from "react";
import {
  Form,
  Modal,
  Button,
  Icon,
  Select,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col
} from "antd";

import action from "../../redux/log/action";
import { compose } from "redux";
import { connect } from "react-redux";
import getLang from "../../lib/getLang";

const { getLogRequest } = action;
const { Option } = Select;
const { RangePicker } = DatePicker;

class FilterForm extends Component {
  state = {};

  componentDidMount = () => {
    const { filter } = this.props.log;
    const { setFieldsValue } = this.props.form;

    if (filter) {
      setFieldsValue(filter);
    }
  };

  componentDidUpdate = prevProps => {
    const { filter } = this.props.log;
    if (prevProps.log.filter !== filter && !filter) {
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
    const { getLogRequest, handleModal, resetLoadedRows } = this.props;

    getLogRequest(1, val);
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
                const { getLogRequest, handleModal } = this.props;
                this.props.form.resetFields();
                handleModal();
                return getLogRequest(1, null);
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
                      <Option value="flow">{getLang({ id: "flow" })}</Option>
                      <Option value="temperature">
                        {getLang({ id: "temperature" })}
                      </Option>
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
                      placeholder={`${getLang({
                        id: "flow"
                      })} (mL/s), ${getLang({
                        id: "temperature"
                      })} (°C)`}
                      // placeholder="30"
                      allowClear
                    />
                  )}
                </Form.Item>
              </Col>
            </Input.Group>
          </Row>

          <Row type="flex">
            <Input.Group>
              <Col xs={8} sm={8} md={8} lg={7} xl={7}>
                <Form.Item label={getLang({ id: "operator" })}>
                  {getFieldDecorator("flow_is", {
                    initialValue: null
                  })(
                    <Select style={{ width: "100%" }}>
                      <Option value={null}>{getLang({ id: "all" })}</Option>
                      <Option value="=">=</Option>
                      <Option value="<">{"<"}</Option>
                      <Option value="<=">{"<="}</Option>
                      <Option value=">">{">"}</Option>
                      <Option value=">=">{">="}</Option>
                      <Option value="<>">{"<>"}</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xs={16} sm={16} md={16} lg={17} xl={17}>
                <Form.Item label={`${getLang({ id: "flow" })} (mL/s)`}>
                  {getFieldDecorator("flow", {
                    initialValue: undefined
                  })(
                    <InputNumber
                      suffix="mL/s"
                      style={{ width: "100%" }}
                      placeholder={getLang({ id: "flow" })}
                      // placeholder="100"
                      allowClear
                      formatter={value =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={value => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  )}
                </Form.Item>
              </Col>
            </Input.Group>
          </Row>

          <Row type="flex">
            <Input.Group>
              <Col xs={8} sm={8} md={8} lg={7} xl={7}>
                <Form.Item label={getLang({ id: "operator" })}>
                  {getFieldDecorator("temperature_is", {
                    initialValue: null
                  })(
                    <Select style={{ width: "100%" }}>
                      <Option value={null}>{getLang({ id: "all" })}</Option>
                      <Option value="=">=</Option>
                      <Option value="<">{"<"}</Option>
                      <Option value="<=">{"<="}</Option>
                      <Option value=">">{">"}</Option>
                      <Option value=">=">{">="}</Option>
                      <Option value="<>">{"<>"}</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xs={16} sm={16} md={16} lg={17} xl={17}>
                <Form.Item label={`${getLang({ id: "temperature" })} (°C)`}>
                  {getFieldDecorator("temperature", {
                    initialValue: undefined
                  })(
                    <InputNumber
                      suffix="mL/s"
                      style={{ width: "100%" }}
                      placeholder={getLang({ id: "temperature" })}
                      // placeholder="500"
                      allowClear
                      formatter={value =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={value => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  )}
                </Form.Item>
              </Col>
            </Input.Group>
          </Row>

          <Form.Item label={getLang({ id: "date" })}>
            {getFieldDecorator("date", {
              initialValue: undefined
            })(
              <RangePicker
                showTime={{ format: "HH:mm:ss" }}
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: "100%" }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const Filter = Form.create({ name: "log_filter_form" })(FilterForm);

const mapStateToProps = state => ({
  log: state.log
});

const mapDispatchToProps = {
  getLogRequest
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(Filter);
