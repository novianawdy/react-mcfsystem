import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card, Statistic, Icon, Spin } from "antd";
import { randomInt } from "../../lib/helper";
import moment from "moment";

import Chart from "./Chart";
import getLang from "../../lib/getLang";

import settingAction from "../../redux/setting/action";

const { getSettingRequest } = settingAction;

class Dashboard extends Component {
  state = {
    data: []
  };

  componentDidMount = () => {
    const { getSettingRequest } = this.props;
    getSettingRequest();
  };

  componentDidUpdate = () => {
    const { loading } = this.props.setting;
    // set interval after finish load setting
    if (!loading && !this.interval) {
      this.interval = setInterval(() => {
        const { setting } = this.props.setting;
        const { global_setting, mock_setting } = setting;
        const { data } = this.state;

        let solenoid = global_setting.find(x => x.key === "solenoid");
        solenoid = parseInt(solenoid.value_decimal);

        let mock_temperature = mock_setting.find(
          x => x.key === "mock_temperature"
        );
        mock_temperature = parseInt(mock_temperature.value_decimal)
          ? true
          : false;

        let fake_temperature = mock_setting.find(
          x => x.key === "fake_temperature"
        );
        fake_temperature = parseFloat(fake_temperature.value_decimal);

        const modifier = randomInt(0, 3);
        let flow;
        let temperature = mock_temperature ? fake_temperature : 0;

        switch (modifier) {
          case 0:
            flow = data.length ? data[data.length - 1].flow : 0;
            // temperature = data.length ? data[data.length - 1].temperature : 0;
            break;
          case 1:
            flow = data.length
              ? data[data.length - 1].flow + randomInt(0, 30)
              : 1;
            // temperature = data.length ? data[data.length - 1].temperature + 10 : 1;
            break;
          case 2:
            flow = data.length
              ? data[data.length - 1].flow - randomInt(0, 30)
              : 1;
            // temperature = data.length ? data[data.length - 1].temperature - 10 : 1;
            break;
          default:
            break;
        }
        const newData = {
          id: randomInt(0, 1000000),
          flow,
          temperature,
          solenoid,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        let modifiedData = this.state.data;
        if (modifiedData.length > 20) {
          modifiedData.shift();
          modifiedData.push(newData);
        } else {
          modifiedData.push(newData);
        }
        this.setState({ data: modifiedData });
      }, 1000);
    }
  };

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  render() {
    const { data } = this.state;
    const { loading } = this.props.setting;

    let flowColor = "#2d2d2d";
    let flowIcon = null;
    let temperatureColor = "#2d2d2d";
    let temperatureIcon = null;
    let solenoid = "Off";
    let solenoidColor = "#2d2d2d";
    const length = data.length;

    if (length > 1 && data[length - 1].flow < data[length - 2].flow) {
      flowColor = "#cf1322";
      flowIcon = "arrow-down";
    }

    if (length > 1 && data[length - 1].flow > data[length - 2].flow) {
      flowColor = "#3f8600";
      flowIcon = "arrow-up";
    }

    if (
      length > 1 &&
      data[length - 1].temperature < data[length - 2].temperature
    ) {
      temperatureColor = "#cf1322";
      temperatureIcon = "arrow-down";
    }

    if (
      length > 1 &&
      data[length - 1].temperature > data[length - 2].temperature
    ) {
      temperatureColor = "#3f8600";
      temperatureIcon = "arrow-up";
    }

    if (length && data[length - 1].solenoid) {
      solenoid = "On";
      solenoidColor = "#3f8600";
    }

    return (
      <div style={{ padding: 16 }}>
        <Row
          type="flex"
          justify="space-between"
          gutter={[16, 16]}
          style={{ marginBottom: 16 }}
        >
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Card>
              <Statistic
                title={getLang({ id: "flow" })}
                value={length ? data[length - 1].flow : 0}
                precision={2}
                valueStyle={{ color: flowColor }}
                prefix={flowIcon && <Icon type={flowIcon} />}
                suffix="mL/s"
              />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Card>
              <Statistic
                title={getLang({ id: "temperature" })}
                value={length ? data[length - 1].temperature : 0}
                precision={2}
                valueStyle={{ color: temperatureColor }}
                prefix={temperatureIcon && <Icon type={temperatureIcon} />}
                suffix="°C"
              />
            </Card>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Card>
              <Statistic
                title={getLang({ id: "solenoid" })}
                value={solenoid}
                valueStyle={{ color: solenoidColor }}
              />
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card>
              <Spin spinning={loading}>
                <Chart data={data} />
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  setting: state.setting
});

const mapDispatchToProps = {
  getSettingRequest
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Dashboard);
