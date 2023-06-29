import { Modal, Form, Spin, Input } from 'antd';
import { useState } from 'react';
import AvatarUploader from '../avatar/avatar';

export default function AddUser({ close, open, label }) {
  // close modal
  const closeModal = () => {
    close();
  };

  // add user form
  const [addUser] = Form.useForm();
  const [formSpin] = useState(false);

  // form state
  const [, setAvatarImg] = useState();

  return (
    <Modal
      open={open}
      footer={false}
      onCancel={closeModal}
      closable={false}
      wrapClassName="add-user"
      className="add-user-body"
      width={447}
    >
      <Spin spinning={formSpin}>
        <div className="add-user-container">
          <h2 className="wc f-20 fw-7 mb-30">Add {label}</h2>
          <Form form={addUser} layout="vertical">
            <Form.Item label="Photo" name="image" className="session-input-item">
              <AvatarUploader
                file={(file) => {
                  setAvatarImg(file);
                }}
              />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: 'Please input first name !',
                },
              ]}
              className="session-input-item"
            >
              <Input placeholder="John" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: 'Please input last name !',
                },
              ]}
              className="session-input-item"
            >
              <Input placeholder="Doe" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Please input a valid email !',
                },
              ]}
              className="session-input-item"
            >
              <Input placeholder="john@gmail.com" />
            </Form.Item>
            <div className="flex gap-20 mt-40 modal-actions-btns">
              <button type="button" className="width-50 modal-actions-btn cancel wc" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="width-50 modal-actions-btn add l-dark wc-bg">
                Add
              </button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}
