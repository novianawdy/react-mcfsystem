import React, { Component } from "react";
import AppLayout from "../../layouts/app/AppLayout";
import getLang from "../../lib/getLang";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <AppLayout title="Dashboard" location={this.props.location}>
        <h1>{getLang({ id: "dashboard" })}</h1>
      </AppLayout>
    );
  }
}

export default Dashboard;
