import { Select, Form, Spin, message } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserSearch from './user-search';
import SelectedUsers from './selected-users';
import AddIcon from '../../../../public/icons/gray-add.svg';
import DropdownIcon from '../../../../public/icons/vector.svg';
import LoadMoreIcon from '../../../../public/icons/reload.svg';
import DefaultAvatar from '../../../../public/icons/default-user.svg';
import AddUser from './add-user';

const { Option } = Select;

export default function UserSelect({ label, name, users, selectedUsers, updateUsers }) {
  // users
  const [loadSpin, setLoadSpin] = useState(true);
  const [usersData, setUsersData] = useState();
  const [usersOptions, setUsersOptions] = useState();
  useEffect(() => {
    if (!users) return;
    setUsersData(users);
    setUsersOptions(users.users);
    setLoadSpin(false);
  }, [users]);

  // selected users
  const [selectedUsersArr, setSelectedUsersArr] = useState([]);
  useEffect(() => {
    if (!selectedUsers) return;
    setSelectedUsersArr(selectedUsers); // setting prev selected users in prefilling mode
  }, [selectedUsers]);

  const findUser = (userId) => usersOptions.filter((user) => user.id === userId)[0]; // finding user object from users array by id

  const userIsSelected = (userId) => {
    const result = selectedUsersArr.filter((user) => user.id === userId)[0];
    if (result) return true;
    return false;
  }; // user is selected or not

  const unSelectUser = (userId) => {
    setSelectedUsersArr(selectedUsersArr.filter((user) => user.id !== userId));
    message.success(`Successfully removed user from ${label}s`);
  }; // remove user from selected list

  const selectUser = (userId) => {
    setSelectedUsersArr((prevSelected) => [...prevSelected, findUser(userId)]);
    message.success(`Successfully added user to ${label}s`);
  }; // add user to selected list

  const switchSelectUser = (userId) => {
    if (!usersData) return;
    const isUserSelected = userIsSelected(userId);
    if (isUserSelected) {
      unSelectUser(userId);
    } else {
      selectUser(userId);
    }
  }; // add user object to selected array if it not already selected and remove it if it is selected

  // add user
  const [openAddUser, setOpenAddUser] = useState(false);
  const switchAddUser = (type) => {
    if (type === 'close') {
      setOpenAddUser(false);
      return;
    }
    setOpenAddUser((current) => !current);
  };

  const pushNewUser = (user) => {
    updateUsers(user);
  }; // pushing new created user to the first of the users array in parent component to pass updated data to all components

  // dropdown render
  const dropdownRender = (menu) => (
    <>
      <UserSearch />
      <button type="button" className="add-user flex-row-btw" onClick={switchAddUser}>
        <span>Add new {label}</span>
        <Image src={AddIcon} alt="add" />
      </button>
      <Spin spinning={loadSpin}>
        {menu}
        {usersData?.is_last_offset === false && ( // did not use ! to initiate falsy value
          <button type="button" className="load-more flex-row-c gap-10">
            <Image src={LoadMoreIcon} alt="more" width={16} />
            <span>Load more</span>
          </button>
        )}
      </Spin>
    </>
  );

  return (
    <div className="session-input-item">
      <Form.Item
        label={label}
        name={name}
        className="mb-0"
        rules={[
          {
            required: true,
            message: `Please input select ${label} !`,
          },
        ]}
      >
        <Select
          placeholder="Select"
          dropdownRender={(menu) => dropdownRender(menu)}
          popupClassName="users-select-dropdown"
          optionLabelProp="label"
          suffixIcon={<Image src={DropdownIcon} alt="dropdown" />}
          onSelect={(value) => {
            switchSelectUser(value);
          }}
        >
          {usersOptions?.map((user) => (
            <Option
              key={user.id}
              value={user.id}
              label={`${user.first_name} ${user.last_name}`}
              className={`user-option ${userIsSelected(user.id) && 'selected-user-option'}`}
            >
              <Image
                src={user.avatar || DefaultAvatar}
                alt={`${user.first_name} ${user.last_name}`}
                width={30}
                height={30}
                className="rounded"
              />
              <span className="capitalize">
                {user.first_name} {user.last_name}
              </span>
            </Option>
          ))}
        </Select>
      </Form.Item>
      {selectedUsersArr?.length > 0 && (
        <SelectedUsers
          selectedUsers={selectedUsersArr}
          label={label}
          unSelectedUser={(userId) => {
            unSelectUser(userId);
          }}
        />
      )}
      <AddUser
        open={openAddUser}
        label={label}
        close={() => {
          switchAddUser('close');
        }}
        pushUser={(user) => {
          pushNewUser(user);
        }}
      />
    </div>
  );
}
