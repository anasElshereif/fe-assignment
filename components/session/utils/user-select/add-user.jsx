import { Modal, Form, Spin, Input, message } from 'antd';
import { useState } from 'react';
import AvatarUploader from '../avatar/avatar';
import UsersService from '../../../../services/users/users';

export default function AddUser({ close, open, label, pushUser }) {
  // close modal
  const closeModal = () => {
    close();
  };

  // add user form
  const [addUser] = Form.useForm();
  const [formSpin, setFormSpin] = useState(false);

  // form state
  const [avatarImg, setAvatarImg] = useState();

  // create user be wiring
  const createUser = (values) => {
    // const valuesArr = values;
    // delete valuesArr.image;
    // const payload = new FormData();
    // payload.append('event_id', 8);
    // payload.append('image', avatarImg);
    // const valuesObjKeys = Object.keys(valuesArr);
    // valuesObjKeys.forEach((value) => {
    //   payload.append(value, valuesArr[value]);
    // });
    // ---------- be endpoint is not accepting file.in normal case we use form data to append files
    if (avatarImg) console.log(avatarImg); // this is the file that should be appended to form data in case be endpoint accept it

    setFormSpin(true);
    const payload = { ...values, event_id: 8 };
    UsersService.CreateUser(payload)
      .then((res) => {
        const user = res.data;
        pushUser(user);
        addUser.resetFields();
        closeModal();
        message.success('User successfully added');
      })
      .catch((error) => {
        // looping on each error message in every field
        const errorObj = error.response?.data;
        if (!errorObj) return;
        const errObjKeys = Object.keys(errorObj);
        for (let index = 0; index < errObjKeys.length; index += 1) {
          errorObj[errObjKeys[index]].map((msg) => message.error(`${errObjKeys[index]} ${msg}`));
        }
        addUser.resetFields(['email']);
      })
      .finally(() => {
        setFormSpin(false);
      });
  };
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
          <Form form={addUser} layout="vertical" onFinish={createUser}>
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
                  required: true, // it not required in figma design but required in be endpoint
                  message: 'Please input email !',
                },
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
              <button type="submit" className="width-50 modal-actions-btn add l-dark wc-bg">
                Add
              </button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}
