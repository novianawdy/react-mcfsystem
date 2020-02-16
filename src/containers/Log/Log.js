import React, { Component } from "react";
import AppLayout from "../../layouts/app/AppLayout";
import getLang from "../../lib/getLang";

class Log extends Component {
  state = {};
  render() {
    return (
      <AppLayout title="Log" location={this.props.location}>
        <div style={{ background: "#fff", padding: 24, margin: "16px 0" }}>
          <h1>{getLang({ id: "log" })}</h1>
        </div>
      </AppLayout>
    );
  }
}

export default Log;
