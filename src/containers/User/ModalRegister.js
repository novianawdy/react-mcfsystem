import React, { Component } from "react";
import { Form, Modal, Button, Icon, Input } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";

import action from "../../redux/user/action";
import getLang from "../../lib/getLang";

const { registerUserRequest } = action;

class ModalRegisterForm extends Component {
  handleSubmit = () => {
    const { validateFields } = this.props.form;
    const { current_page, filter } = this.props.user;
    const { registerUserRequest } = this.props;

    validateFields((error, values) => {
      if (!error) {
        registerUserRequest(values, current_page, filter);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback(getLang({ id: "passwordNotMatch" }));
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value) {
      form.validateFields(["confirm_password"], { force: true });
    }
    callback();
  };

  render() {
    const { visible, handleModal } = this.props;
    const { loadingSubmit } = this.props.user;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        title={getLang({ id: "registerUser" })}
        onCancel={() => {
          this.props.form.resetFields();
          return handleModal();
        }}
        footer={
          <>
            <Button
              onClick={() => {
                this.props.form.resetFields();
                return handleModal();
              }}
              loading={loadingSubmit}
            >
              {getLang({ id: "cancel" })}
            </Button>
            <Button
              type="primary"
              onClick={this.handleSubmit}
              loading={loadingSubmit}
            >
              <Icon type="save" /> {getLang({ id: "save" })}
            </Button>
          </>
        }
        centered
      >
        <Form layout="vertical">
          <Form.Item label={getLang({ id: "username" })}>
            {getFieldDecorator("username", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: getLang({ id: "required" })
                }
              ]
            })(<Input placeholder={getLang({ id: "username" })} />)}
          </Form.Item>

          <Form.Item label={getLang({ id: "name" })}>
            {getFieldDecorator("name", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: getLang({ id: "required" })
                }
              ]
            })(<Input placeholder={getLang({ id: "name" })} />)}
          </Form.Item>

          <Form.Item label={getLang({ id: "password" })}>
            {getFieldDecorator("password", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: getLang({ id: "required" })
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password placeholder={getLang({ id: "password" })} />)}
          </Form.Item>

          <Form.Item label={getLang({ id: "confirmPassword" })}>
            {getFieldDecorator("confirm_password", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: getLang({ id: "required" })
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                placeholder={getLang({ id: "confirmPassword" })}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const ModalRegister = Form.create({ name: "modal_update_form" })(
  ModalRegisterForm
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  registerUserRequest
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ModalRegister
);
