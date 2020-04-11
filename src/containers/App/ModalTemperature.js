import React, { Component } from "react";
import {
  Form,
  Modal,
  Row,
  Col,
  Divider,
  Switch,
  Icon,
  Typography,
  Button,
  Popconfirm,
} from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import { Howl } from "howler";

import getLang from "../../lib/getLang";
import action from "../../redux/setting/action";
import setting from "../../settings/setting";

const { updateSettingMixRequest } = action;

class ModalTemperatureForm extends Component {
  state = {
    alertSound: true,
  };

  sound = new Howl({
    src: `${setting.baseUrl}/assets/audio/red_alert.mp3`,
    loop: true,
    preload: true,
  });

  componentDidUpdate = (prevProps) => {
    const { visible } = this.props;
    if (prevProps.visible !== visible && visible) {
      this.sound.play();
    }

    if (prevProps.visible !== visible && !visible) {
      this.sound.stop();
    }
  };

  handleSwitchAlert = (checked) => {
    checked ? this.sound.play() : this.sound.stop();
    this.setState({ alertSound: checked });
  };

  handleSubmit = () => {
    const { validateFields } = this.props.form;
    const { updateSettingMixRequest } = this.props;
    const { global_setting, mock_setting } = this.props.setting.setting;

    validateFields((error, values) => {
      if (!error) {
        let data = {
          settings: [],
        };

        const fakeTemperature = mock_setting.find(
          (setting) => setting.key === "fake_temperature"
        );
        const notifTemperature = parseFloat(
          global_setting.find(
            (setting) => setting.key === "notificate_on_temperature"
          ).value_decimal || 0
        );

        data.settings.push(
          Object.assign({}, fakeTemperature, {
            value_decimal: notifTemperature - 1,
          })
        );

        Object.keys(values).map((key) => {
          const value = values[key];
          if (typeof value === "boolean") {
            return data.settings.push({
              key,
              value: null,
              value_text: null,
              value_decimal: value ? 1 : 0,
            });
          } else if (typeof value === "number") {
            return data.settings.push({
              key,
              value: null,
              value_text: null,
              value_decimal: value,
            });
          }

          return false;
        });

        updateSettingMixRequest(data);
      }
    });
  };

  render() {
    const { visible, handleModal } = this.props;
    const { loadingSubmit } = this.props.setting;
    const { global_setting } = this.props.setting.setting;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const solenoid = parseFloat(
      global_setting.find((setting) => setting.key === "solenoid")
        ?.value_decimal || 0
    );

    const okButton =
      solenoid && getFieldValue("solenoid") ? (
        <Popconfirm
          title={
            <span
              dangerouslySetInnerHTML={{
                __html: getLang({ id: "sureSolenoidStillOpen" }),
              }}
            />
          }
          onConfirm={this.handleSubmit}
        >
          <Button type="primary" loading={loadingSubmit}>
            OK
          </Button>
        </Popconfirm>
      ) : (
        <Button
          type="primary"
          loading={loadingSubmit}
          onClick={this.handleSubmit}
        >
          OK
        </Button>
      );

    return (
      <Modal
        visible={visible}
        closable={false}
        maskClosable={false}
        footer={
          <>
            <Button loading={loadingSubmit} onClick={handleModal}>
              {getLang({ id: "cancel" })}
            </Button>
            {okButton}
          </>
        }
      >
        <Form>
          <Row>
            <Col>
              <h3>
                <Typography.Text type="warning">
                  <Icon type="exclamation-circle" />{" "}
                  {getLang({ id: "caution" })}
                </Typography.Text>
              </h3>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <span
                dangerouslySetInnerHTML={{
                  __html: getLang({
                    id: solenoid
                      ? "temperatureReachedValueModalSolenoid"
                      : "temperatureReachedValueModal",
                  }),
                }}
              />
            </Col>
            <Col span={24}>
              <Divider
                orientation="left"
                dashed
                style={{ marginTop: 24, marginBottom: 12 }}
              />
            </Col>
            <Col span={24}>
              {solenoid ? (
                <Row type="flex" justify="space-between">
                  <Col>
                    <span>{getLang({ id: "solenoid" })}</span>
                  </Col>
                  <Col>
                    {getFieldDecorator("solenoid", {
                      valuePropName: "checked",
                      initialValue: solenoid ? true : false,
                    })(
                      <Switch
                        checkedChildren="On"
                        unCheckedChildren="Off"
                        loading={loadingSubmit}
                      />
                    )}
                  </Col>
                </Row>
              ) : undefined}
              <Row type="flex" justify="space-between" style={{ marginTop: 8 }}>
                <Col>
                  <span>{getLang({ id: "alertSound" })}</span>
                </Col>
                <Col>
                  <Switch
                    checkedChildren="On"
                    unCheckedChildren="Off"
                    checked={this.state.alertSound}
                    onChange={this.handleSwitchAlert}
                  />
                </Col>
              </Row>
              {/* <Row
                type="flex"
                justify="space-between"
                style={{ marginTop: 12 }}
              >
                <Col>
                  <span>{getLang({ id: "temperature" })}</span>
                </Col>
                <Col>
                  {getFieldDecorator("fake_temperature")(
                    <InputNumber
                      min={0}
                      precision={2}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      placeholder="Temperature"
                    />
                  )}{" "}
                  ˚C
                </Col>
              </Row> */}
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const ModalTemperature = Form.create({ name: "modal_temperature_form" })(
  ModalTemperatureForm
);

const mapStateToProps = (state) => {
  return {
    setting: state.setting,
  };
};

const mapDispatchToProps = {
  updateSettingMixRequest,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ModalTemperature
);
