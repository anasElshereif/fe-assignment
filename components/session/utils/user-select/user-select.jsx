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
import UsersService from '../../../../services/users/users';

const { Option } = Select;

export default function UserSelect({
  label,
  name,
  users,
  selectedUsers,
  updateUsers,
  updateUsersData,
  updateSelectedUsers,
  resetSelectedUsers,
}) {
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

  useEffect(() => {
    if (!selectedUsersArr || selectedUsersArr.length === 0) return;
    updateSelectedUsers(selectedUsersArr);
  }, [selectedUsersArr]);

  // reset selected users on form submit
  useEffect(() => {
    if (!resetSelectedUsers) return;
    setSelectedUsersArr([]);
  }, [resetSelectedUsers]);

  const findUser = (userId) => usersOptions.filter((user) => user.id === userId)[0]; // finding user object from users array by id

  const userInArray = (userId, list) => {
    const result = list.filter((user) => user.id === userId)[0];
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
    const isUserSelected = userInArray(userId, selectedUsersArr);
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

  // load more
  const loadMore = () => {
    setLoadSpin(true);
    UsersService.GetUsers(usersData.number)
      .then((res) => {
        const { data } = res;
        const filteredUsers = data.users.filter((user) => !userInArray(user.id, users.users));
        const filteredData = { ...data, users: [...filteredUsers] };
        updateUsersData(filteredData);
      })
      .catch(() => {
        message.error('Error occurred while fetching data');
      })
      .finally(() => {
        setLoadSpin(false);
      });
  }; // load more function fetches data with offset margin and pass it to parent to update new data in all other user selects. It filters date from duplicates in case user was added at first then loaded again later in load more function

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
          <button type="button" className="load-more flex-row-c gap-10" onClick={loadMore}>
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
              className={`user-option ${userInArray(user.id, selectedUsersArr) && 'selected-user-option'}`}
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
