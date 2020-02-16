import React, { Component } from "react";
import AppLayout from "../../layouts/app/AppLayout";
import getLang from "../../lib/getLang";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <AppLayout title="Dashboard" location={this.props.location}>
        <div style={{ background: "#fff", padding: 24, margin: "16px 0" }}>
          <h1>{getLang({ id: "dashboard" })}</h1>
        </div>
      </AppLayout>
    );
  }
}

export default Dashboard;
