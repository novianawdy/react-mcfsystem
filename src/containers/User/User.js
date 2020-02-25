import React, { Component } from "react";
import AppLayout from "../../layouts/app/AppLayout";
import getLang from "../../lib/getLang";
import { compose } from "redux";
import { connect } from "react-redux";

class User extends Component {
  state = {};
  render() {
    const { location, auth } = this.props;
    return (
      <AppLayout title="User" location={location} auth={auth}>
        <div style={{ background: "#fff", padding: 24, margin: "16px 0" }}>
          <h1>{getLang({ id: "user" })}</h1>
        </div>
      </AppLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(connect(mapStateToProps))(User);
