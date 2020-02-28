import React, { Component } from "react";
// import getLang from "../../lib/getLang";
import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col, Card, Statistic, Icon } from "antd";
import { randomInt } from "../../lib/helper";
import moment from "moment";

import Chart from "./Chart";
import getLang from "../../lib/getLang";

class Dashboard extends Component {
  state = {
    data: []
  };

  componentDidMount = () => {
    this.interval = setInterval(() => {
      const { data } = this.state;
      const modifier = randomInt(0, 3);
      let flow, temperature;
      switch (modifier) {
        case 0:
          flow = data.length ? data[data.length - 1].flow : 0;
          temperature = data.length ? data[data.length - 1].temperature : 0;
          break;
        case 1:
          flow = data.length ? data[data.length - 1].flow + 25 : 1;
          temperature = data.length
            ? data[data.length - 1].temperature + 10
            : 1;
          break;
        case 2:
          flow = data.length ? data[data.length - 1].flow - 25 : 1;
          temperature = data.length
            ? data[data.length - 1].temperature - 10
            : 1;
          break;
        default:
          break;
      }
      const newData = {
        id: randomInt(0, 1000000),
        flow,
        temperature,
        solenoid: randomInt(0, 2),
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
  };

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  render() {
    const { data } = this.state;

    let flowColor = "#3f8600";
    let flowIcon = "arrow-up";
    let temperatureColor = "#3f8600";
    let temperatureIcon = "arrow-up";
    let solenoid = "Off";
    let solenoidColor = "#2d2d2d";
    const length = data.length;

    if (length > 1 && data[length - 1].flow < data[length - 2].flow) {
      flowColor = "#cf1322";
      flowIcon = "arrow-down";
    }

    if (
      length > 1 &&
      data[length - 1].temperature < data[length - 2].temperature
    ) {
      temperatureColor = "#cf1322";
      temperatureIcon = "arrow-down";
    }

    if (length && data[length - 1].solenoid) {
      solenoid = "On";
      solenoidColor = "#3f8600";
    }

    return (
      <>
        <Row type="flex" justify="space-between" style={{ marginBottom: 16 }}>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Card>
              <Statistic
                title={getLang({ id: "flow" })}
                value={length ? data[length - 1].flow : 0}
                precision={2}
                valueStyle={{ color: flowColor }}
                prefix={<Icon type={flowIcon} />}
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
                prefix={<Icon type={temperatureIcon} />}
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
              <Chart data={data} />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(connect(mapStateToProps))(Dashboard);
