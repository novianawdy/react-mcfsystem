import React from "react";
import "./style.css";
import UserLayout from "../../../layouts/user/UserLayout";
import { compose } from "redux";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Icon, Checkbox, Button } from "antd";
import getLang from "../../../lib/getLang";

class SignInForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
                  <Input
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
                  <Col span={12}>
                    {getFieldDecorator("remember", {
                      valuePropName: "checked",
                      initialValue: true
                    })(<Checkbox>{getLang({ id: "rememberMe" })}</Checkbox>)}
                  </Col>
                  <Col span={12}>
                    <a href="/" className="login-form-forgot">
                      {getLang({ id: "forgotPassword" })}
                    </a>
                  </Col>
                  <Col span={24}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block={true}
                    >
                      {getLang({ id: "login" })}
                    </Button>
                  </Col>
                  <Col span={24}>
                    {getLang({ id: "or" })}{" "}
                    <a href="/">{getLang({ id: "registerNow" })}</a>
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
    dashApp: state.dashApp
  };
};

const SignIn = Form.create({ name: "sign_in_form" })(SignInForm);

export default compose(connect(mapStateToProps))(SignIn);
