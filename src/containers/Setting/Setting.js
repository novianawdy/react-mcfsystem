import React, { Component } from "react";
import getLang from "../../lib/getLang";
import { compose } from "redux";
import { connect } from "react-redux";

class Setting extends Component {
  state = {};
  render() {
    return (
      <div style={{ background: "#fff", padding: 24, margin: "16px 0" }}>
        <h1>{getLang({ id: "setting" })}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(connect(mapStateToProps))(Setting);
