import React, { Component } from "react";
import { Form, Modal, Button, Icon, Input, Alert } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";

import action from "../../redux/user/action";
import getLang from "../../lib/getLang";

const { changeUserPasswordRequest } = action;

class ModalChangePasswordForm extends Component {
  handleSubmit = () => {
    const { validateFields } = this.props.form;
    const { current_page, filter } = this.props.user;
    const { changeUserPasswordRequest, selectedData } = this.props;

    validateFields((error, values) => {
      if (!error) {
        values.id = selectedData.id;
        changeUserPasswordRequest(values, current_page, filter);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("new_password")) {
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
    const { visible, handleModal, selectedData } = this.props;
    const { role } = selectedData;
    const { loadingSubmit } = this.props.user;
    const { getFieldDecorator } = this.props.form;

    let role_text = "";
    switch (role) {
      case 1:
        role_text = "Super Admin";
        break;
      case 3:
        role_text = "IOT";
        break;
      default:
        role_text = "Admin";
        break;
    }

    return (
      <Modal
        visible={visible}
        title={getLang({ id: "changePassword" })}
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
        {role === 1 || role === 3 ? (
          <Alert
            message={
              <span
                dangerouslySetInnerHTML={{
                  __html: getLang({
                    id: "cannotUpdatePassword",
                    values: {
                      role: role_text
                    }
                  })
                }}
              />
            }
            type="error"
            style={{ marginBottom: 12 }}
          />
        ) : (
          undefined
        )}

        <Form layout="vertical">
          <Form.Item label={getLang({ id: "yourPassword" })}>
            {getFieldDecorator("user_password", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: getLang({ id: "required" })
                }
              ]
            })(
              <Input.Password
                placeholder={getLang({ id: "yourPassword" })}
                disabled={role === 1 || role === 3}
              />
            )}
          </Form.Item>

          <Form.Item label={getLang({ id: "newPassword" })}>
            {getFieldDecorator("new_password", {
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
            })(
              <Input.Password
                placeholder={getLang({ id: "newPassword" })}
                disabled={role === 1 || role === 3}
              />
            )}
          </Form.Item>

          <Form.Item label={getLang({ id: "confirmNewPassword" })}>
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
                placeholder={getLang({ id: "confirmNewPassword" })}
                disabled={role === 1 || role === 3}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const ModalChangePassword = Form.create({ name: "modal_update_form" })(
  ModalChangePasswordForm
);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  changeUserPasswordRequest
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ModalChangePassword
);
