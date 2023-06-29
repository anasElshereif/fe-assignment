import { Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import AltTooltip from '../tooltip/tooltip';
import ThumbnailUploader from './utils/thumbnail/thumbnail';
import Time from './utils/time/time';
import UserSelect from './utils/user-select/user-select';
import UsersService from '../../services/users/users';

const { TextArea } = Input;

export default function SessionForm({ type }) {
  const [addSession] = Form.useForm();
  const [formSpin, setFormSpin] = useState(false);

  // form state
  const [, setThumbnailImg] = useState();

  // users
  const [users, setUsers] = useState();
  useEffect(() => {
    UsersService.GetUsers().then((res) => {
      const { data } = res;
      setUsers(data);
      setFormSpin(false);
    });
  }, []);
  return (
    <Spin spinning={formSpin}>
      <div className="session-form">
        <Form form={addSession} layout="vertical">
          <Form.Item
            label="Session Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input session title !',
              },
            ]}
            className="session-input-item"
          >
            <Input placeholder="Start Typing..." />
          </Form.Item>
          <div className="flex-col">
            {type === 'add' && (
              <div className="alt-tooltip">
                <AltTooltip
                  title="Unique info about the session, that will be displayed under the title"
                  placement="right"
                />
              </div>
            )}
            <Form.Item
              label="Session Subtitle"
              name="subtitle"
              rules={[
                {
                  required: true,
                  message: 'Please input session subtitle !',
                },
              ]}
              className="session-input-item"
            >
              <Input placeholder="Start Typing..." />
            </Form.Item>
          </div>
          <Form.Item label="Thumbnail" name="cover_image" className="session-input-item">
            <ThumbnailUploader
              file={(file) => {
                setThumbnailImg(file);
              }}
            />
          </Form.Item>
          {/* time row */}
          <Time />
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input session description !',
              },
            ]}
            className="session-input-item"
          >
            <TextArea placeholder="Type details" className="text-area" />
          </Form.Item>
          <div className="split" />
          <UserSelect label="Speaker" name="speaker" users={users} />
          <UserSelect label="Moderator" name="moderator" users={users} />
        </Form>
      </div>
    </Spin>
  );
}
