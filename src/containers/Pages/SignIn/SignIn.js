import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Icon, Button, Modal } from "antd";
import getLang from "../../../lib/getLang";

import UserLayout from "../../../layouts/user/UserLayout";
import "./style.css";

import action from "../../../redux/auth/action";
const { loginRequest, clearSuccess, clearError } = action;

class SignInForm extends React.Component {
  componentDidUpdate = () => {
    const { success, error } = this.props.auth;
    const { clearSuccess, clearError } = this.props;
    if (success === true) {
      this.props.history.replace("/app/dashboard");
      clearSuccess();
    }

    if (error) {
      Modal.error({
        title: getLang({ id: "caution" }),
        content: error,
        okText: "OK"
      });
      clearError();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { loginRequest } = this.props;
        loginRequest(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props.auth;
    return (
      <UserLayout title="Sign In">
        <Row type="flex" justify="center">
          <Col xs={20} sm={12} md={8} lg={6} xl={6}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    {
                      required: true,
                      message: getLang({ id: "username.required" })
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder={getLang({ id: "username" })}
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: getLang({ id: "password.required" })
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder={getLang({ id: "password" })}
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Row type="flex" justify="space-between">
                  {/* <Col span={12}>
                    {getFieldDecorator("remember", {
                      valuePropName: "checked",
                      initialValue: false
                    })(<Checkbox>{getLang({ id: "rememberMe" })}</Checkbox>)}
                  </Col>
                  <Col span={12}>
                    <a href="/" className="login-form-forgot">
                      {getLang({ id: "forgotPassword" })}
                    </a>
                  </Col> */}
                  <Col span={24}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block={true}
                      loading={loading}
                    >
                      {getLang({ id: "login" })}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </UserLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    dashApp: state.dashApp,
    auth: state.auth
  };
};

const mapDispatchToProps = {
  loginRequest,
  clearSuccess,
  clearError
};

const SignIn = Form.create({ name: "sign_in_form" })(SignInForm);

export default compose(connect(mapStateToProps, mapDispatchToProps))(SignIn);
