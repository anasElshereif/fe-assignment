import { Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import AltTooltip from '../tooltip/tooltip';
import ThumbnailUploader from './utils/thumbnail/thumbnail';
import Time from './utils/time/time';
import UserSelect from './utils/user-select/user-select';
import UsersService from '../../services/users/users';
import VenueSelect from './utils/venue/venue';

const { TextArea } = Input;

export default function SessionForm({
  type,
  thumbnailImg,
  selectedSpeakers,
  selectedModerators,
  resetSelectedUsers,
  resetFieldOnEmpty,
  resetSelectedVenue,
  prefilledData,
}) {
  // fetching users
  const [users, setUsers] = useState();
  useEffect(() => {
    UsersService.GetUsers()
      .then((res) => {
        const { data } = res;
        setUsers(data);
      })
      .catch(() => {
        message.error('Error occurred while fetching users');
      });
  }, []);

  // update users options pushing new user
  const addUsers = (user) => {
    setUsers((prevData) => ({ ...prevData, users: [user, ...prevData.users] }));
  };

  // update users data
  const updateUsersData = (usersData) => {
    if (usersData.preserve) {
      setUsers((prevData) => ({ ...usersData, users: [...prevData.users] }));
      return;
    }
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
          prefilledImage={prefilledData?.cover_image}
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
        addUsers={(newUser) => {
          addUsers(newUser);
        }}
        updateUsersData={(updatedData) => {
          updateUsersData(updatedData);
        }}
        updateSelectedUsers={(selectedUsers) => {
          selectedSpeakers(selectedUsers);
          if (selectedUsers.length === 0) resetFieldOnEmpty('speaker_ids');
        }}
        resetSelectedUsers={resetSelectedUsers}
        selectedUsers={prefilledData?.speakers}
      />

      <UserSelect
        label="Moderator"
        name="moderator_ids"
        users={users}
        addUsers={(newUser) => {
          addUsers(newUser);
        }}
        updateUsersData={(updatedData) => {
          updateUsersData(updatedData);
        }}
        updateSelectedUsers={(selectedUsers) => {
          selectedModerators(selectedUsers);
          if (selectedUsers.length === 0) resetFieldOnEmpty('moderator_ids');
        }}
        resetSelectedUsers={resetSelectedUsers}
        selectedUsers={prefilledData?.moderators}
      />

      <div className="split" />
      <VenueSelect prefilledVenue={prefilledData?.venue} resetSelectedVenue={resetSelectedVenue} />
    </>
  );
}
