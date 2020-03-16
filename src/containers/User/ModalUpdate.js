import React, { Component } from "react";
import { Form, Modal, Button, Icon, Input } from "antd";
import { compose } from "redux";
import { connect } from "react-redux";

import action from "../../redux/user/action";
import getLang from "../../lib/getLang";

const { updateUserRequest } = action;

class ModalUpdateForm extends Component {
  handleSubmit = () => {
    const { validateFields } = this.props.form;
    const { current_page, filter } = this.props.user;
    const { updateUserRequest, selectedData } = this.props;

    validateFields((error, values) => {
      if (!error) {
        values.id = selectedData.id;
        updateUserRequest(values, current_page, filter);
      }
    });
  };
  render() {
    const { visible, handleModal, selectedData } = this.props;
    const { loadingSubmit } = this.props.user;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        title={getLang({ id: "editUser" })}
        onCancel={handleModal}
        footer={
          <>
            <Button
              onClick={() => {
                const { handleModal } = this.props;
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
              initialValue: selectedData.username
            })(<Input placeholder={getLang({ id: "username" })} />)}
          </Form.Item>

          <Form.Item label={getLang({ id: "name" })}>
            {getFieldDecorator("name", {
              initialValue: selectedData.name
            })(<Input placeholder={getLang({ id: "name" })} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const ModalUpdate = Form.create({ name: "modal_update_form" })(ModalUpdateForm);

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  updateUserRequest
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ModalUpdate
);
