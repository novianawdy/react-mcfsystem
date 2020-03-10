import React, { Component } from "react";
import getLang from "../../lib/getLang";
import { compose } from "redux";
import { connect } from "react-redux";
import { Card, Row, Col, Menu, Skeleton, Typography, List, Switch } from "antd";

import action from "../../redux/setting/action";

const { Title } = Typography;
const { getSettingRequest, updateSettingRequest } = action;

class Setting extends Component {
  state = {
    activeMenuKey: null,
    contents: []
  };

  componentDidMount = () => {
    const { getSettingRequest } = this.props;
    getSettingRequest();
  };

  componentDidUpdate = prevProps => {
    const { setting } = this.props.setting;
    const { activeMenuKey } = this.state;
    if (prevProps.setting.setting !== setting && setting && !activeMenuKey) {
      this.setState({
        activeMenuKey: "global_setting",
        contents: setting.global_setting
      });
    }
  };

  setMenuContent = (key, contents) => {
    this.setState({ activeMenuKey: key, contents });
  };

  render() {
    const { activeMenuKey, contents } = this.state;
    const { setting, loading } = this.props.setting;

    return (
      <Card
        style={{ margin: 16 }}
        bodyStyle={{
          padding: 12
        }}
      >
        <Row
          type="flex"
          gutter={{ xs: 0, sm: 0, md: 16, lg: 16, xl: 16, xxl: 16 }}
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
                style={{ marginBottom: 12 }}
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

            <Row>
              <Col span={24}>
                <Title level={4}>
                  {activeMenuKey && getLang({ id: activeMenuKey })}
                </Title>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <List
                  itemLayout="horizontal"
                  loading={loading}
                  dataSource={contents}
                  renderItem={item => {
                    const { key } = item;
                    if (key === "solenoid") {
                      return (
                        <List.Item
                          actions={[
                            <Switch
                              checkedChildren="On"
                              unCheckedChildren="Off"
                              // checked={parseFloat(valueDecimal) ? true : false}
                            />
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
                            <Switch
                              checkedChildren="On"
                              unCheckedChildren="Off"
                              // checked={parseFloat(valueDecimal) ? true : false}
                            />
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
                            <Switch
                              checkedChildren="On"
                              unCheckedChildren="Off"
                              // checked={parseFloat(valueDecimal) ? true : false}
                            />
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  setting: state.setting
});

const mapDispatchToProps = {
  getSettingRequest,
  updateSettingRequest
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Setting);
