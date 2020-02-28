import React, { Component } from "react";
import getLang from "../../lib/getLang";
import { compose } from "redux";
import { connect } from "react-redux";

class Log extends Component {
  state = {};
  render() {
    return (
      <div style={{ background: "#fff", padding: 24, margin: "16px 0" }}>
        <h1>{getLang({ id: "log" })}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(connect(mapStateToProps))(Log);
