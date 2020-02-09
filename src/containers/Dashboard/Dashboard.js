import React, { Component } from "react";
import AppLayout from "../../layouts/app/AppLayout";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <AppLayout title="Dashboard" location={this.props.location}>
        <h1>Dashboard</h1>
      </AppLayout>
    );
  }
}

export default Dashboard;
