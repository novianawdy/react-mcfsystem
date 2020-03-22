import React, { Component } from "react";
import getLang from "../../lib/getLang";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  Card,
  Row,
  Col,
  Menu,
  Skeleton,
  Typography,
  List,
  Switch,
  Button,
  Form,
  InputNumber,
  message
} from "antd";

import action from "../../redux/setting/action";

const { Title } = Typography;
const {
  getSettingRequest,
  updateSettingRequest,
  clearSuccess,
  clearError
} = action;

class SettingForm extends Component {
  state = {
    activeMenuKey: null,
    contents: []
  };

  componentDidMount = () => {
    const { getSettingRequest } = this.props;
    getSettingRequest();
  };

  componentDidUpdate = prevProps => {
    const { setting, success, error } = this.props.setting;
    const { clearSuccess, clearError } = this.props;
    const { activeMenuKey } = this.state;
    if (prevProps.setting.setting !== setting && setting && !activeMenuKey) {
      this.setState({
        activeMenuKey: "global_setting",
        contents: setting.global_setting
      });
    }

    if (prevProps.setting.setting !== setting && setting && activeMenuKey) {
      this.setState({
        contents: setting[activeMenuKey]
      });
    }

    if (success) {
      message.success(success);
      clearSuccess();
    }

    if (error) {
      message.error(error);
      clearError();
    }
  };

  setMenuContent = (key, contents) => {
    this.setState({ activeMenuKey: key, contents });
  };

  handleSubmit = () => {
    const { validateFields } = this.props.form;
    const { updateSettingRequest } = this.props;

    validateFields((error, values) => {
      if (!error) {
        let data = {
          settings: []
        };

        Object.keys(values).map(key => {
          const value = values[key];
          if (typeof value === "boolean") {
            return data.settings.push({
              key,
              value: null,
              value_text: null,
              value_decimal: value ? 1 : 0
            });
          } else if (typeof value === "number") {
            return data.settings.push({
              key,
              value: null,
              value_text: null,
              value_decimal: value
            });
          }

          return false;
        });

        updateSettingRequest(data);
      }
    });
  };

  render() {
    const { activeMenuKey, contents } = this.state;
    const { setting, loading, loadingSubmit } = this.props.setting;
    const { getFieldDecorator, getFieldValue, resetFields } = this.props.form;

    return (
      <Card
        style={{ margin: 16 }}
        bodyStyle={{
          padding: 16
        }}
      >
        <Row
          type="flex"
          gutter={{ xs: 0, sm: 0, md: 32, lg: 32, xl: 32, xxl: 32 }}
        >
          <Col
            xs={0}
            sm={0}
            md={6}
            lg={6}
            xl={4}
            xxl={4}
            style={{ height: "auto" }}
          >
            <Skeleton loading={loading} active title={false}>
              <Menu
                theme="light"
                selectedKeys={[activeMenuKey]}
                style={{ height: "100%" }}
              >
                {Object.keys(setting).map(key => {
                  return (
                    <Menu.Item
                      key={key}
                      onClick={() => {
                        return this.setMenuContent(key, setting[key]);
                      }}
                    >
                      {getLang({ id: key })}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Skeleton>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={20} xxl={20}>
            <Row>
              <Col
                xs={24}
                sm={24}
                md={0}
                lg={0}
                xl={0}
                xxl={0}
                style={{ marginBottom: 16 }}
              >
                <Menu
                  theme="light"
                  selectedKeys={[activeMenuKey]}
                  mode="horizontal"
                >
                  {Object.keys(setting).map(key => {
                    return (
                      <Menu.Item
                        key={key}
                        onClick={() => {
                          return this.setMenuContent(key, setting[key]);
                        }}
                        style={{ width: "50%" }}
                      >
                        {getLang({ id: key })}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              </Col>
            </Row>

            <Row type="flex" justify="space-between">
              <Col>
                <Title level={4} style={{ marginBottom: 24 }}>
                  {activeMenuKey && getLang({ id: activeMenuKey })}
                </Title>
              </Col>
              <Col>
                <Button
                  style={{
                    color: "#1890ff",
                    backgroundColor: "transparent",
                    border: 0,
                    boxShadow: "none"
                  }}
                  onClick={this.handleSubmit}
                  loading={loadingSubmit}
                >
                  {getLang({ id: "save" })}
                </Button>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form>
                  <List
                    itemLayout="horizontal"
                    loading={loading}
                    dataSource={contents}
                    renderItem={item => {
                      const { key, value_decimal } = item;
                      if (key === "solenoid") {
                        return (
                          <List.Item
                            actions={[
                              <Form.Item style={{ margin: 0 }}>
                                {getFieldDecorator(key, {
                                  valuePropName: "checked",
                                  initialValue: parseInt(value_decimal)
                                    ? true
                                    : false
                                })(
                                  <Switch
                                    checkedChildren="On"
                                    unCheckedChildren="Off"
                                    loading={loadingSubmit}
                                  />
                                )}
                              </Form.Item>
                            ]}
                          >
                            <List.Item.Meta
                              title={getLang({ id: key })}
                              description={getLang({ id: `setting.${key}` })}
                            />
                          </List.Item>
                        );
                      }
                      if (key === "notificate") {
                        return (
                          <List.Item
                            actions={[
                              <Form.Item style={{ margin: 0 }}>
                                {getFieldDecorator(key, {
                                  valuePropName: "checked",
                                  initialValue: parseInt(value_decimal)
                                    ? true
                                    : false
                                })(
                                  <Switch
                                    checkedChildren="On"
                                    unCheckedChildren="Off"
                                    onChange={value => {
                                      if (!value) {
                                        return resetFields([
                                          "notificate_on_temperature"
                                        ]);
                                      }
                                      return;
                                    }}
                                    loading={loadingSubmit}
                                  />
                                )}
                              </Form.Item>
                            ]}
                          >
                            <List.Item.Meta
                              title={getLang({ id: key })}
                              description={getLang({ id: `setting.${key}` })}
                            />
                          </List.Item>
                        );
                      }
                      if (key === "mock_temperature") {
                        return (
                          <List.Item
                            actions={[
                              <Form.Item style={{ margin: 0 }}>
                                {getFieldDecorator(key, {
                                  valuePropName: "checked",
                                  initialValue: parseFloat(value_decimal)
                                    ? true
                                    : false
                                })(
                                  <Switch
                                    checkedChildren="On"
                                    unCheckedChildren="Off"
                                    onChange={value => {
                                      if (!value) {
                                        return resetFields([
                                          "fake_temperature"
                                        ]);
                                      }
                                      return;
                                    }}
                                    loading={loadingSubmit}
                                  />
                                )}
                              </Form.Item>
                            ]}
                          >
                            <List.Item.Meta
                              title={getLang({ id: key })}
                              description={getLang({ id: `setting.${key}` })}
                            />
                          </List.Item>
                        );
                      } else if (key === "notificate_on_temperature") {
                        return (
                          <List.Item
                            actions={[
                              <Form.Item style={{ margin: 0 }}>
                                {getFieldDecorator(key, {
                                  initialValue: parseFloat(value_decimal)
                                })(
                                  <InputNumber
                                    formatter={value =>
                                      `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )
                                    }
                                    parser={value =>
                                      value.replace(/\$\s?|(,*)/g, "")
                                    }
                                    disabled={
                                      !getFieldValue("notificate") ||
                                      loadingSubmit
                                    }
                                  />
                                )}
                              </Form.Item>
                            ]}
                          >
                            <List.Item.Meta
                              title={getLang({ id: key })}
                              description={getLang({ id: `setting.${key}` })}
                            />
                          </List.Item>
                        );
                      } else if (key === "fake_temperature") {
                        return (
                          <List.Item
                            actions={[
                              <Form.Item style={{ margin: 0 }}>
                                {getFieldDecorator(key, {
                                  initialValue: parseFloat(value_decimal)
                                })(
                                  <InputNumber
                                    formatter={value =>
                                      `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )
                                    }
                                    parser={value =>
                                      value.replace(/\$\s?|(,*)/g, "")
                                    }
                                    disabled={
                                      !getFieldValue("mock_temperature") ||
                                      loadingSubmit
                                    }
                                  />
                                )}
                              </Form.Item>
                            ]}
                          >
                            <List.Item.Meta
                              title={getLang({ id: key })}
                              description={getLang({ id: `setting.${key}` })}
                            />
                          </List.Item>
                        );
                      } else {
                        return (
                          <List.Item>
                            <List.Item.Meta
                              title={getLang({ id: key })}
                              description={getLang({ id: `setting.${key}` })}
                            />
                          </List.Item>
                        );
                      }
                    }}
                  />
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

const Setting = Form.create({ name: "setting_form" })(SettingForm);

const mapStateToProps = state => ({
  auth: state.auth,
  setting: state.setting
});

const mapDispatchToProps = {
  getSettingRequest,
  updateSettingRequest,
  clearSuccess,
  clearError
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Setting);
