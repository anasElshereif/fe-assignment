import { Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import AltTooltip from '../tooltip/tooltip';
import ThumbnailUploader from './utils/thumbnail/thumbnail';
import Time from './utils/time/time';
import UserSelect from './utils/user-select/user-select';
import UsersService from '../../services/users/users';
import VenueSelect from './utils/venue/venue';

const { TextArea } = Input;

export default function SessionForm({ type, thumbnailImg, selectedSpeakers, selectedModerators, resetSelectedUsers }) {
  // fetching users
  const [users, setUsers] = useState();
  useEffect(() => {
    UsersService.GetUsers()
      .then((res) => {
        const { data } = res;
        setUsers(data);
      })
      .catch(() => {
        message.error('Error occurred while fetching data');
      });
  }, []);

  // update users options
  const updateUsers = (user) => {
    setUsers((prevData) => ({ ...prevData, users: [user, ...prevData.users] }));
  };

  // update users data
  const updateUsersData = (usersData) => {
    setUsers((prevData) => ({ ...usersData, users: [...prevData.users, ...usersData.users] }));
  };
  return (
    <>
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
            thumbnailImg(file);
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
      <UserSelect
        label="Speaker"
        name="speaker_ids"
        users={users}
        updateUsers={(newUser) => {
          updateUsers(newUser);
        }}
        updateUsersData={(updatedData) => {
          updateUsersData(updatedData);
        }}
        updateSelectedUsers={(selectedUsers) => {
          selectedSpeakers(selectedUsers);
        }}
        resetSelectedUsers={resetSelectedUsers}
      />
      <UserSelect
        label="Moderator"
        name="moderator_ids"
        users={users}
        updateUsers={(newUser) => {
          updateUsers(newUser);
        }}
        updateUsersData={(updatedData) => {
          updateUsersData(updatedData);
        }}
        updateSelectedUsers={(selectedUsers) => {
          selectedModerators(selectedUsers);
        }}
        resetSelectedUsers={resetSelectedUsers}
      />
      <div className="split" />
      <VenueSelect />
    </>
  );
}
