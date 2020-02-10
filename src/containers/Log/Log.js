import React, { Component } from "react";
import AppLayout from "../../layouts/app/AppLayout";
import getLang from "../../lib/getLang";

class Log extends Component {
  state = {};
  render() {
    return (
      <AppLayout title="Log" location={this.props.location}>
        <h1>{getLang({ id: "log" })}</h1>
      </AppLayout>
    );
  }
}

export default Log;
