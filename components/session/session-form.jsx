import { Form, Input } from 'antd';
import { useState } from 'react';
import AltTooltip from '../tooltip/tooltip';
import ThumbnailUploader from './utils/thumbnail/thumbnail';

export default function SessionForm({ type }) {
  const [addSession] = Form.useForm();
  // form state
  const [, setThumbnailImg] = useState();
  return (
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
      </Form>
    </div>
  );
}
